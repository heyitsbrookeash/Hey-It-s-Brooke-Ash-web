export function initTabs(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-tabs]").forEach((container) => {
    if (container.dataset.tabsBound) return;
    container.dataset.tabsBound = "true";

    const tabs = Array.from(container.querySelectorAll<HTMLElement>('[role="tab"]')).filter(
      (tab) => tab.closest("[data-tabs]") === container
    );
    const panels = Array.from(container.querySelectorAll<HTMLElement>('[role="tabpanel"]')).filter(
      (panel) => panel.closest("[data-tabs]") === container
    );
    const paramName = container.dataset.tabsParam;

    const getPanel = (id: string) => panels.find((p) => p.dataset.tabPanel === id);

    const activate = (id: string, { focus = false, updateUrl = false } = {}) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.tab === id;
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (isActive && focus) tab.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== id;
      });
      if (updateUrl && paramName) {
        const url = new URL(window.location.href);
        url.searchParams.set(paramName, id);
        window.history.replaceState({}, "", url);
      }
      container.dispatchEvent(new CustomEvent("brooke:tab-change", { detail: { id } }));
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => activate(tab.dataset.tab!, { updateUrl: true }));
      tab.addEventListener("keydown", (e) => {
        let nextIndex: number | null = null;
        if (e.key === "ArrowRight") nextIndex = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") nextIndex = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") nextIndex = 0;
        else if (e.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex !== null) {
          e.preventDefault();
          activate(tabs[nextIndex].dataset.tab!, { focus: true, updateUrl: true });
        }
      });
    });

    let initial = tabs[0]?.dataset.tab;
    if (paramName) {
      const url = new URL(window.location.href);
      const fromParam = url.searchParams.get(paramName);
      if (fromParam && getPanel(fromParam)) initial = fromParam;
    }
    if (initial) activate(initial);
  });
}

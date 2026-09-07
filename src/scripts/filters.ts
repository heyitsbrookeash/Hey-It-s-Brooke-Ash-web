function toCamel(key: string) {
  return key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export function initFilters(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-filter-scope]").forEach((scope) => {
    if (scope.dataset.filtersBound) return;
    scope.dataset.filtersBound = "true";

    const items = Array.from(scope.querySelectorAll<HTMLElement>("[data-filterable]"));
    const groupState: Record<string, string> = {};
    const toggleState: Record<string, boolean> = {};

    const apply = () => {
      let visibleCount = 0;
      items.forEach((item) => {
        let visible = true;
        for (const [key, value] of Object.entries(groupState)) {
          if (value !== "all" && item.dataset[toCamel(key)] !== value) visible = false;
        }
        for (const [key, on] of Object.entries(toggleState)) {
          if (on && item.dataset[toCamel(key)] !== "true") visible = false;
        }
        item.hidden = !visible;
        if (visible) visibleCount++;
      });
      const emptyState = scope.querySelector<HTMLElement>("[data-filter-empty]");
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    };

    scope.querySelectorAll<HTMLElement>("[data-filter-group]").forEach((group) => {
      const key = group.dataset.filterGroup!;
      const chips = Array.from(group.querySelectorAll<HTMLElement>("[data-filter-value]"));
      groupState[key] = chips.find((c) => c.getAttribute("aria-pressed") === "true")?.dataset.filterValue ?? "all";
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          groupState[key] = chip.dataset.filterValue!;
          chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
          apply();
        });
      });
    });

    scope.querySelectorAll<HTMLElement>("[data-filter-toggle]").forEach((toggle) => {
      const key = toggle.dataset.filterToggle!;
      toggleState[key] = toggle.getAttribute("aria-pressed") === "true";
      toggle.addEventListener("click", () => {
        toggleState[key] = toggle.getAttribute("aria-pressed") !== "true";
        toggle.setAttribute("aria-pressed", String(toggleState[key]));
        apply();
      });
    });

    apply();
  });
}

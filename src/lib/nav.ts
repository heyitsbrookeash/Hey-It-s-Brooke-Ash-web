export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Travel", href: "/travel" },
  { label: "Seattle", href: "/seattle" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Work with me", href: "/work-with-me" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Links", href: "/links" },
];

export const menuGroups: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Travel",
    links: [
      { label: "Where I've been", href: "/travel" },
      { label: "Hotels & reviews", href: "/travel#hotels" },
      { label: "Itineraries", href: "/travel#itineraries" },
    ],
  },
  {
    heading: "Seattle",
    links: [
      { label: "Food", href: "/seattle?tab=food" },
      { label: "Events", href: "/seattle?tab=events" },
      { label: "Things to do", href: "/seattle?tab=things-to-do" },
      { label: "'Cations", href: "/seattle?tab=cations" },
    ],
  },
  {
    heading: "Journal",
    links: [
      { label: "All posts", href: "/journal" },
      { label: "About Brooke", href: "/about" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Work with me", href: "/work-with-me" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Links", href: "/links" },
      { label: "Home", href: "/" },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: "Instagram", href: "https://instagram.com/heyitsbrookeash" },
  { label: "Pinterest", href: "https://pinterest.com/heyitsbrookeash" },
  { label: "TikTok", href: "https://tiktok.com/@heyitsbrookeash" },
];

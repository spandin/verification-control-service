export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "VCS",
  description: "Система контроля поверок",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  links: {
    example: "url",
  },
};

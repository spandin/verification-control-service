export type SiteConfig = typeof SITE_CONFIG

export const SITE_CONFIG = {
  name: "VCS",
  description: "Система контроля поверок",
  BASE_URL: "http://localhost:3000/",
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
}

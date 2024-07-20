export type SiteConfig = typeof SITE_CONFIG

export const SITE_CONFIG = {
  name: "VCS",
  description: "Система контроля поверок",
  BASE_URL: "https://experttelescope-9sh5.onrender.com",
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

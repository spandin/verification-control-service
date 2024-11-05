export type SiteConfig = typeof SITE_CONFIG

export const SITE_CONFIG = {
  name: `Дейтахаб`,
  description: `Дейтахаб ГУ "ЦОДБО"`,
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

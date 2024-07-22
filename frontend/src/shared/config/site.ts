export type SiteConfig = typeof SITE_CONFIG

export const SITE_CONFIG = {
  name: "VCS",
  description: "Verification Control Service",
  BASE_URL: "http://localhost:3000/" || "https://vcs-backend-ex7x.onrender.com/",
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

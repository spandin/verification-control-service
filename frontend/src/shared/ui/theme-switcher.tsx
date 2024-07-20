import { Switch } from "@nextui-org/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Switch
      className="absolute right-4 top-6"
      isSelected={theme === "dark" ? true : false}
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
      size="md"
      color="primary"
      startContent={<Sun />}
      endContent={<Moon />}
    />
  )
}

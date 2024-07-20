import { Input } from "@nextui-org/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface Props {
  className?: string
  name?: string
  variant?: "bordered" | "flat" | "faded" | "underlined"
  size?: "sm" | "lg" | "md"
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement> &
    ((e: React.FocusEvent<Element, Element>) => void)
  value?: string | (readonly string[] & string) | undefined
}

const PasswordInput = ({ className, name, variant, size, onChange, onBlur, value }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <Input
      className={className}
      variant={variant}
      size={size}
      type={isVisible ? "text" : "password"}
      name={name || "password"}
      label="Пороль"
      placeholder="Пороль"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <EyeOff className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <Eye className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
    />
  )
}

export default PasswordInput

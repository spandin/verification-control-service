import { Role } from "@/shared/types"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"

interface Props {
  values: {
    phone: null
    name: string
    email: string
    password: string
    role: Role
  }
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void
  }
  handleBlur: {
    (e: React.FocusEvent<any>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
}

const PhoneInput = ({ values, handleChange, handleBlur }: Props) => {
  const [isAddingPhone, setIsAddingPhone] = useState<boolean | null>(null)

  if (isAddingPhone === null && values.name.length >= 2) {
    return (
      <div>
        <div className="flex flex-row items-center justify-between px-1">
          <span className="text-md font-medium">Добавить телефон сотрудника?</span>

          <div className="flex flex-row gap-1">
            <Button
              className="text-md"
              color="primary"
              variant="bordered"
              radius="full"
              size="sm"
              onClick={() => setIsAddingPhone(true)}
            >
              Да
            </Button>
            <Button
              className="text-md"
              color="primary"
              variant="solid"
              radius="full"
              size="sm"
              onClick={() => setIsAddingPhone(false)}
            >
              Нет
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isAddingPhone === true && values.name.length >= 2) {
    return (
      <Input
        variant="bordered"
        type="phone"
        name="phone"
        label="Номер телефона"
        placeholder="+375000000000"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  }
}

export default PhoneInput

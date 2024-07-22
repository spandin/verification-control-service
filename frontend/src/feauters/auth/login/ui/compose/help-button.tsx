import { Button } from "@nextui-org/button"
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react"

const HelpButton = () => {
  return (
    <Popover
      showArrow
      backdrop="blur"
      placement="bottom"
      classNames={{
        base: ["before:bg-default-200"],
        content: ["py-3 px-4 max-w-sm"],
      }}
    >
      <PopoverTrigger>
        <Button className="font-semibold" variant="light" size="lg">
          Помощь
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-base font-semibold" {...titleProps}>
              Как войти?
            </h3>
            <div className="text-md">
              Обратитесь к управляющим, возможно ваши данные для входа уже высланы на ваш Email
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default HelpButton

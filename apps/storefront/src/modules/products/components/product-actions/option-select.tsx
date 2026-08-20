import { HttpTypes } from "@medusajs/types"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="font-semibold text-base text-gray-900">
        {title}
      </h3>

      <div
        className="flex flex-wrap gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const selected = current === v

          return (
            <button
              key={v}
              type="button"
              disabled={disabled}
              onClick={() => updateOption(option.id, v)}
              data-testid="option-button"
              className={`
                min-w-[55px]
                h-11
                px-5
                rounded-lg
                border-2
                font-medium
                transition-all
                duration-200
                ${
                  selected
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-800 border-gray-300 hover:border-black hover:bg-gray-100"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
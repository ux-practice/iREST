import React from "react"

export const Dropdown = ({
    field: {name, ...rest},
    id,
    options,
    label,
    className,
    defaultChecked,
  }) => {
    return (
      <select data-testid="dropdown" name={name} className="form-control options-bold-text" {...rest}>
        {options.map(option => {
          return <option key={option.key}>{option.value}</option>
        })}
      </select>
    )
  }

export const GroupedDropdown = ({
    field: {name, ...rest},
    id,
    options,
    label,
    className,
    selected,
  }) => {
    return (
      <select data-testid="grouped-dropdown" name={name} className="form-control options-bold-text" {...rest}>
        {Object.keys(options).map(fakerKey => (
          <optgroup label={fakerKey}>
            {options[fakerKey].map(obj => (
              <option
                value={obj.displayValue}
              >
                {obj.key}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    )
  }
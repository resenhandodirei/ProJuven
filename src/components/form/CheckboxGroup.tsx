import React from "react";

interface Option {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: Option[];
  values?: string[]; // deixa opcional para evitar undefined
  onChange: (values: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  values = [], // valor padrão protege contra undefined
  onChange,
}) => {
  const handleToggle = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((item) => item !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <p className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer rounded-lg border px-4 py-2 transition-colors duration-150
              ${
                values.includes(option.value)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-blue-400"
              }`}
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={values.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;

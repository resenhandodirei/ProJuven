import React, {useState} from "react";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <p className="block text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center cursor-pointer rounded-lg border px-4 py-2 
              ${
                value === option.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-blue-400"
              }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              required={required}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

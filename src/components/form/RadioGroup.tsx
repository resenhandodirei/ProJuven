import React from "react";

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
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <div>
      <p className="block text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-[var(--greenLight)] text-white border-[var(--golden)] shadow-md"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[var(--greenLight)] hover:text-[var(--greenDark)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;

import React from "react";

interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, description, children }) => {
  return (
    <section className="bg-white rounded-xl shadow-md p-6 mb-6">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </header>
      <div>{children}</div>
    </section>
  );
};

export default FormWrapper;

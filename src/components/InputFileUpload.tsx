"use client";

import { useState } from "react";
import { Upload, File } from "lucide-react";

interface InputFileUploadProps {
  label?: string;
  accept?: string; // exemplo: "image/*,.pdf"
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
}

export default function InputFileUpload({
  label = "Selecionar arquivo",
  accept,
  multiple = false,
  onChange,
}: InputFileUploadProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const names = Array.from(files).map((file) => file.name);
      setFileNames(names);
      onChange?.(files);
    } else {
      setFileNames([]);
      onChange?.(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition">
        <Upload className="w-5 h-5 text-gray-600" />
        <span className="text-sm text-gray-700">
          {multiple ? "Escolher arquivos" : "Escolher arquivo"}
        </span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </label>

      {fileNames.length > 0 && (
        <ul className="mt-1 text-sm text-gray-600">
          {fileNames.map((name, index) => (
            <li key={index} className="flex items-center gap-2">
              <File className="w-4 h-4 text-blue-500" />
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

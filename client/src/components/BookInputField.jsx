import React from "react";

const BookInputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-300 placeholder-gray-500 placeholder-opacity-75"
      required={required}
    />
  );
};

export default BookInputField;

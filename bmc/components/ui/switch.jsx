"use client";

export const Switch = ({ id, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`w-11 h-6 bg-gray-200 rounded-full ${
          checked ? "bg-blue-600" : ""
        } transition-colors`}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </span>
    </label>
  );
};

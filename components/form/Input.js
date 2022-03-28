import React from 'react';

const getPattern = (type) => {
  switch (type) {
    case 'email':
      return '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
    case 'username':
      return '^[A-Za-z0-9_.]+$';
    default:
      return undefined;
  }
};

const Input = ({ label, type, name, required, placeholder }) => {
  const pattern = getPattern(type);
  return (
    <label>
      {label}:
      <br />
      <input
        className={`rounded-sm text-black outline-none px-4 py-2 w-full
                border-[3px] focus-within:border-purple-500 ${
                  (name === 'username' || name === 'email') && 'lowercase'
                }`}
        type={type === 'email' ? 'text' : type}
        pattern={pattern}
        placeholder={placeholder}
        name={name}
        required={required}
      />
    </label>
  );
};

export default Input;

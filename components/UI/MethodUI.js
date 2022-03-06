import React from 'react';

const MethodUI = ({ msg, method, setType }) => {
  return (
    <button
      type="button"
      className="rounded-md text-white/90 w-max m-auto"
      to={`/account/${method}`}
      onClick={() => setType(method)}>
      {msg}
    </button>
  );
};

export default MethodUI;

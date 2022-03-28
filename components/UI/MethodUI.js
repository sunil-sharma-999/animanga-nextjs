import Link from 'next/link';
import React from 'react';

const MethodUI = ({ msg, method = 'signin' }) => {
  return (
    <Link href={`/${method}`}>
      <a className="rounded-md text-white/90 w-max m-auto">{msg}</a>
    </Link>
  );
};

export default MethodUI;

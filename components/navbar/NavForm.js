import React, { useRef } from 'react';
import { MdClear } from 'react-icons/md';

const NavForm = ({ handler, clearSearch, classnames, formclass }) => {
  const inputRef = useRef('');
  const formRef = useRef();

  return (
    <form
      onSubmit={(e) => handler(e, inputRef.current, formRef.current)}
      className={`${formclass}`}
      ref={formRef}>
      <div
        className={`bg-white justify-between items-center rounded-md border-none max-w-sm mx-auto h-10 overflow-hidden w-full ml-auto ${classnames}`}>
        <select
          name="selection"
          id="selection"
          className="bg-white h-full cursor-pointer text-gray-800 pl-2">
          <option value="manga" className="text-black">
            Manga
          </option>
          <option value="anime" className="text-black">
            Anime
          </option>
        </select>
        <input
          className="outline-none h-full px-4 w-full py-2 text-purple-900"
          type="text"
          defaultValue={inputRef.current.value}
          name="search"
          ref={inputRef}
          placeholder="Search and Enter"
          minLength={3}
        />
        <MdClear
          onClick={(e) => clearSearch(e, inputRef.current)}
          className="z-30 text-black cursor-pointer h-full mr-2 text-xl"
        />
      </div>
    </form>
  );
};

export default NavForm;

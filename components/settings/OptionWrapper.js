import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const OptionWrapper = (props) => {
  const {
    option,
    label,
    children,
    settingState,
    initialSettingState,
    setsettingState,
  } = props;

  const styles = `font-bold ${
    option === 'delete' ? 'text-red-500' : ''
  } text-lg`;

  return (
    <div className="bg-white px-4 rounded-sm">
      <div
        className="flex py-2 justify-between cursor-pointer items-center"
        onClick={() => {
          setsettingState((prev) => {
            return { ...initialSettingState, [option]: !prev[option] };
          });
        }}>
        <p className={styles}>{label}</p>
        {settingState[option] ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </div>
      <div className="w-full mx-auto max-w-xs flex text-black justify-center">
        {children}
      </div>
    </div>
  );
};

export default OptionWrapper;

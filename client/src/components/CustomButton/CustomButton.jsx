import React from "react";

const CustomButton = ({ text, isRoundedFull, onClick, isChecked }) => {
  return (
    <button
      className={`${
        isRoundedFull
          ? `bg-white mt-8 hover:bg-[#fe578c] text-[#fe578c] hover:text-white border border-[#fe578c] font-medium py-4 text-sm px-4 rounded-full w-full`
          : "bg-[#fe578c] hover:bg-[#fe578c] text-white font-medium py-2 text-sm px-4 shadow-lg rounded w-full"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;

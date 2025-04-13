import React, { useState } from "react";

export function Databind(props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='w-auto'>
      <input
        className='m-4 p-4 text-2xl text-black focus:border-green-500 focus:outline focus:outline-green-500'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter ABCs'
        maxLength='26'
      />
      <p className='uppercase text-7xl wrap-break-word pb-4'>{inputValue}</p>
      <p className='lowercase text-7xl wrap-break-word pb-4'>{inputValue}</p>
    </div>
  );
}

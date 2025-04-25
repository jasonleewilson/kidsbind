import React, { useState } from "react";

export function Databind(props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='grow content-center'>
      <div className='h-1/2 upper py-16'>
        <p className='uppercase text-7xl text-red-500 wrap-break-word text-wrap pb-4 text-center overflow-auto'>
          {inputValue}
        </p>
      </div>

      <div className='h-1/2 w-fit mx-auto lower'>
        <form onReset={() => setInputValue("")}>
          <label htmlFor='enter-text' className='sr-only'></label>
          <input
            className='mx-auto text-center m-4 p-4 text-lg md:text-2xl text-black border-1 outline-black focus:border-black focus:outline focus:outline-black overflow-hidden'
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Enter ABCs or 123s here'
            // maxLength='26'
            // autofocus
          />
          <br />
          <input
            type='reset'
            value='Reset'
            className='p-2 px-4 w-full mx-auto bg-gray-300 text-black border border-black rounded hover:bg-gray-400 cursor-pointer'
          />
        </form>
      </div>
    </div>
  );
}

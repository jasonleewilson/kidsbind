import React, { useState } from "react";

export function Databind(props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='content-center'>
      <div class="grid md:grid-cols-2 gap-4">
        {/* <!-- The first child div will occupy the first row --> */}
        <p className='text-output'>
          {inputValue}
        </p>

        {/* <!-- The second child div will occupy the second row --> */}

        <div class="container mx-auto text-white p-4 rounded">
          <div class="flex items-center justify-center">
            <form onReset={() => setInputValue("")}>
              <label htmlFor='enter-text' className='sr-only'></label>
              <input
                className='mb-4 p-4 text-center text-lg md:text-2xl text-black border-1 outline-black focus:border-black focus:outline focus:outline-black overflow-hidden'
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

      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

const Dropdown = ({handleEdit, handleDelete, handleCopy}) => {
    const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);



  return (
    <>
    <div className="relative" data-te-dropdown-ref>

      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        data-dropdown-delay="500" 
        className="text-gray-400 border border-gray-400 hover:bg-gray-300 hover:text-white focus:ring-0 focus:outline-none  font-medium rounded-lg text-xs  p-1 text-center inline-flex items-center mr-2  "
        type="button"
        onClick={toggleDropdown}
      >
         <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>

      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-[1000] float-left  mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 "
        >
          <ul className="[&[data-te-dropdown-show]]:block py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
            <li>
              <button onClick={() => {
                handleCopy()
                handleButtonClick()
                }} className="font-readex  w-full font-light text-right text-xs  block px-4 py-2 hover:bg-gray-100 ">
                نسخ
              </button>
            </li>
            <li>
              <button onClick={handleEdit} className="font-readex  w-full font-light text-right text-xs    block px-4 py-2 hover:bg-gray-100 ">
                تعديل
              </button>
            </li>
            <li>
              <button onClick={handleDelete} className="font-readex w-full font-light text-right text-xs block px-4 py-2 hover:bg-gray-100">
                إزالة
              </button>
            </li>
          
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default Dropdown;

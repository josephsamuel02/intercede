import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-3 px-4 py-5">
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-[#e68200]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-xl font-bold ml-2 text-[#e68200]">Intercede</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

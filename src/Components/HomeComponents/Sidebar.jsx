import React from 'react';
import { IoMdClose } from 'react-icons/io';
import logo from '../assets/home/logo.png';
import logo2 from '../assets/app/hello.png';
import { NavLink } from 'react-router-dom';
import { sidebarData } from '../utils/constant';

const Sidebar = ({ open, setOpen }) => {
    return (
        <div
            className={`fixed top-0 right-0 z-50 h-screen !w-[40rem] bg-color transition-transform duration-300 border-l shadow ${open ? 'translate-x-0' : 'translate-x-full'
                } w-72`} // w-64 = 256px standard sidebar width
        >
            {/* Close Button */}
            <div className="!w-[5rem] !h-[5rem] px-3 sm:px-4 py-2 bg-[#182335] text-white flex items-center justify-center">
                <IoMdClose onClick={() => setOpen(!open)} className="!text-[3rem] cursor-pointer" />
            </div>

            {/* Sidebar Content */}
            <div className="!mt-[5rem] flex flex-col items-center gap-5 px-4">
                {/* Logo */}
                <img src={logo2} alt="logo" className="!h-[8rem] !w-[22rem]" />

                {/* Search */}
                <input
                    type="search"
                    placeholder="Search Keywords"
                    className="w-full bg-[#182335] text-white border-none outline-none placeholder:text-gray-300 px-4 py-2 border !text-[2rem] border-gray-600 rounded"
                />

                {/* Nav Links */}
                <div className="!w-full !mt-5 !space-y-9">
                    {sidebarData.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.link}  // ✅ fixed: use item.link
                            className={({ isActive }) =>
                                `flex items-center !gap-3 !px-4 !py-2 !text-[3rem] rounded hover:bg-[#0B0B29] transition-all duration-300 cursor-pointer ${isActive ? 'text-[#5acbf1]' : 'text-white'
                                }`
                            }
                            onClick={() => setOpen(false)} // auto close sidebar on click
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </NavLink>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Sidebar;

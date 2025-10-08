import React from 'react';
import { Plus, Search, Menu } from 'lucide-react';
import { useState, useEffect, use } from "react";
import { useRef } from 'react'

const TopBar = ({ onOpen, addMethod }) => {


    const popupRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [boardName, setBoardName] = useState(null);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!popupRef.current?.contains(e.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);




    return (
        <div className="w-full h-16">
            <div className="topbar flex items-center justify-between bg-blue-950 w-full h-full px-4">

                <div className="logo flex items-center gap-2 ">
                    <img src="/logo.png" alt="Logo" width={30} height={30} className="rounded-lg" />
                    <div className="title flex gap-1 md:font-semibold text-white text-xl">
                        <p>Kanban</p>
                        <p className='text-[#4CAF50]' >Flow</p>
                    </div>
                </div>


                <div ref={popupRef} className="search-bar text-gray-400 gap-2 md:flex hidden sm:flex lg:flex">
                    <input type="text" className='bg-white rounded h-9 md:w-70 p-2' placeholder='Search' />
                    <button className='flex items-center gap-2 h-9 px-4 bg-[#4CAF50] text-white rounded'
                        onClick={() => setShowPopup(true)}>
                        <Plus size={20} color="white" />
                        Add Board
                    </button>
                    {showPopup && (
                        <div

                            className="absolute top-11 left-235 mt-2 bg-white shadow-lg rounded-lg p-4 z-50 min-w-[220px] transition-transform duration-300"
                            
                        >
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Enter board name
                            </label>
                            <input
                                type="text"
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                                className="w-full border rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Board name"
                            />
                            <button
                                className="bg-[#aabeed] text-black px-3 py-1 rounded font-semibold hover:bg-[#8fa9ff] transition w-full"
                                onClick={() => {
                                    if (addMethod && boardName?.trim()) {
                                        addMethod(boardName.trim());
                                        
                                        setShowPopup(false);
                                    }
                                }}
                            >
                                Create
                            </button>
                        </div>
                    )}
                </div>

                <div className="search-bar text-gray-400 gap-2 flex sm:hidden items-center">
                    <button className=" p-1">
                        <Search className="w-9 h-9 icon text-white rounded p-1 bg-[#4CAF50]" />
                    </button>
                    <button className='flex items-center   h-9 md:px-4 bg-[#4CAF50] text-white rounded'>
                        <Plus size={20} color="white" />

                    </button>
                </div>

                <div className="people text-white h-[32px] w-[32px]  ">
                    <button
                        className="p-2 rounded not-first:"
                        onClick={() => onOpen()}
                        aria-label="Open sidebar"
                    >
                        <Menu size={24} color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;

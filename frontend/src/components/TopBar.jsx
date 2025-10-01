import React from 'react';
import { Plus } from 'lucide-react';
const TopBar = () => {
    return (
        <div className="w-full h-16"> 
            <div className="topbar flex items-center justify-between bg-blue-950 w-full h-full px-4">
                
                <div className="logo flex items-center gap-2 ">
                    <img src="/logo.png" alt="Logo" width={30} height={30} className="rounded-lg" />
                    <div className="title flex gap-1 font-semibold text-white text-xl">
                        <p>Kanban</p>
                        <p className='text-[#4CAF50]' >Flow</p>
                    </div>
                </div>

                
                <div className="search-bar text-gray-400 gap-2 flex">
                    <input type="text" className='bg-white rounded h-9 w-70 p-2' placeholder='Search' />
                    <button className='flex items-center gap-2 h-9 px-4 bg-[#4CAF50] text-white rounded'>
                        <Plus size={20} color="white" />
                        Add Board
                    </button>
                </div>
                <div className="people text-white h-[32px] w-[32px] bg-sky-300 rounded-2xl"><img src="" alt="" /></div>
            </div>
        </div>
    );
};

export default TopBar;

import React, { useState, useEffect } from 'react'
import { ChevronRight, X } from 'lucide-react'
import api from '@/lib/axios';
const SideBar = ({ open, onClose ,setBoard}) => {
    // Mock data arrays
    const [boards, setBoards] = useState([]);
   

    // Dropdown state
    const [boardsOpen, setBoardsOpen] = useState(false);
    const [contribOpen, setContribOpen] = useState(false);
    const [contributions,setContributions] =useState([]);


    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await api.get("/get-boards");
                if (res) {
                   
                    setBoards(res.data);

                }
                   
            } catch (err) {
                console.error("no record found", err);
                
            }
        };

         const fetchContributions = async () => {
            try {
                const res = await api.get("/get-contributions");
                if (res) {
                   
                    setContributions(res.data);

                }
                   
            } catch (err) {
                console.error("no record found", err);
                
            }
        };
        fetchContributions();
        fetchBoards(); // Call the async function

      








    }, []);













    return (
        <div
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl rounded-l-2xl flex flex-col justify-between z-40 transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ willChange: 'transform', borderLeft: '1px solid #e5e7eb' }}
        >
            {/* Close button */}
            <div className="flex justify-end p-4">
                <button onClick={onClose} aria-label="Close sidebar" className="p-2 rounded hover:bg-gray-100">
                    <X size={24} color="#334155" />
                </button>
            </div>
            <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">Dashboard</h2>
                <ul className="space-y-4">
                    {/* My Boards Dropdown */}
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded transition"
                            onClick={() => setBoardsOpen(!boardsOpen)}
                        >
                            <span>My Boards</span>
                            <ChevronRight
                                size={20}
                                className={`transition-transform ${boardsOpen ? 'rotate-90' : ''}`}
                                color="#334155"
                            />
                        </button>
                        {boardsOpen && (
                            <div className="ml-4 mt-2">
                                {boards.length === 0 ? (
                                    <p className="text-sm text-gray-400">No record found</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {/* ...map boards here... */}
                                        {
                                            boards.map(board => (
                                                <li key={board.id} className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer" onClick={()=>setBoard(board.id)}>
                                                    {board.name}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </li>
                    {/* Contributions Dropdown */}
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded transition"
                            onClick={() => setContribOpen(!contribOpen)}
                        >
                            <span>Contributions</span>
                            <ChevronRight
                                size={20}
                                className={`transition-transform ${contribOpen ? 'rotate-90' : ''}`}
                                color="#334155"
                            />
                        </button>
                        {contribOpen && (
                            <div className="ml-4 mt-2">
                                {contributions.length === 0 ? (
                                    <p className="text-sm text-gray-400">No record found</p>
                                ) : (
                                    <ul className="space-y-2">
                                          {
                                            contributions.map(contribution => (
                                                <li key={contribution.id} className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
                                                    {contribution.name}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </li>
                </ul>
            </div>
            <div className="p-6 border-t">
                <button className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full font-semibold py-2 px-3 rounded transition">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default SideBar

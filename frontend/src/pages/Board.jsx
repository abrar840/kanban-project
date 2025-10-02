import { useState } from "react";
import React from "react";
import TopBar from "@/components/TopBar";
import { X, Search, Plus } from 'lucide-react';
const Board = () => {
    const [todo, setTodo] = useState("ToDo");
    const [inprogress, setInprogress] = useState("In-Progress");
    const [done, setDone] = useState("Done");
    const [activeCard, setActiveCard] = useState(null); // track which card is active


    return (
        <div className="w-full h-full">
            <div className="main w-full  p-5 box-border">
                <div className="bg-[#aabeed] h-[90vh] rounded-4xl p-5">
                    <div className="container flex md:flex-row flex-col items-start gap-5 p-2">
                        <div className="col1 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full">
                            <div className="title w-full p-2  ">
                                <input
                                    type="text"
                                    value={todo}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                    onChange={(e) => setTodo(e.target.value)}
                                />
                            </div>




                            <div className="mt-auto">
                                {activeCard !== 1 &&
                                    <div className="btn px-4 py-2">
                                        <button className="flex items-center gap-1 h-9 px-2  text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full" onClick={() => setActiveCard(1)}>
                                            <Plus />  Add a Card
                                        </button>
                                    </div>}

                                {activeCard == 1 && <div className="wrapper px-4 flex flex-col">
                                    <div className="input">
                                        <input type="text"
                                            className="border-2 border-[#4CAF50] 
                                    focus:border-none hover:border-none 
                                    w-full h-10 rounded-lg p-2 focus:outline-none 
                                    bg-white shadow-sm"
                                        /></div>
                                    <div className="btn flex flex-row gap-2 py-2">
                                        <button className="flex items-center gap-1 h-9 px-2 bg-[#4CAF50] text-white rounded">
                                            Add Card
                                        </button>
                                        <button onClick={() => setActiveCard(null)}><X /></button>
                                    </div>
                                </div>}

                            </div>




                        </div>
                        <div className="col2  bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full">

                            <div className="title w-full p-2  ">
                                <input
                                    type="text"
                                    value={inprogress}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                    onChange={(e) => setInprogress(e.target.value)}
                                />
                            </div>

                            <div className="mt-auto">
                                {activeCard !== 2 &&
                                    <div className="btn px-4 py-2">
                                        <button className="flex items-center gap-1 h-9 px-2  text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full" onClick={() => setActiveCard(2)}>
                                            <Plus />  Add a Card
                                        </button>
                                    </div>}

                                {activeCard == 2 && <div className="wrapper px-4 flex flex-col">
                                    <div className="input">
                                        <input type="text"
                                            className="border-2 border-[#4CAF50] 
                                    focus:border-none hover:border-none 
                                    w-full h-10 rounded-lg p-2 focus:outline-none 
                                    bg-white shadow-sm"
                                        /></div>
                                    <div className="btn flex flex-row gap-2 py-2">
                                        <button className="flex items-center gap-1 h-9 px-2 bg-[#4CAF50] text-white rounded">
                                            Add Card
                                        </button>
                                        <button onClick={() => setActiveCard(null)}><X /></button>
                                    </div>
                                </div>}

                            </div>


                        </div>













                        <div className="col3 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full">

                            <div className="title w-full p-2  ">
                                <input
                                    type="text"
                                    value={done}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                    onChange={(e) => setDone(e.target.value)}
                                />

                            </div>
                            <div className="mt-auto">
                                {activeCard !== 3 &&
                                    <div className="btn px-4 py-2">
                                        <button className="flex items-center gap-1 h-9 px-2  text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full" onClick={() => setActiveCard(3)}>
                                            <Plus />  Add a Card
                                        </button>
                                    </div>}

                                {activeCard == 3 && <div className="wrapper px-4 flex flex-col">
                                    <div className="input">
                                        <input type="text"
                                            className="border-2 border-[#4CAF50] 
                                    focus:border-none hover:border-none 
                                    w-full h-10 rounded-lg p-2 focus:outline-none 
                                    bg-white shadow-sm"
                                        /></div>
                                    <div className="btn flex flex-row gap-2 py-2">
                                        <button className="flex items-center gap-1 h-9 px-2 bg-[#4CAF50] text-white rounded">
                                            Add Card
                                        </button>
                                        <button onClick={() => setActiveCard(null)}><X /></button>
                                    </div>
                                </div>}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;

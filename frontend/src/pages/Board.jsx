import { useState } from "react";
import React from "react";
import TopBar from "@/components/TopBar";
import { X, Plus } from 'lucide-react';

const Board = () => {
    const [todo, setTodo] = useState("ToDo");
    const [inprogress, setInprogress] = useState("In-Progress");
    const [done, setDone] = useState("Done");
    const [activeCard, setActiveCard] = useState(null); // which column is active

    const [inputValues, setInputValues] = useState({
        1: '',
        2: '',
        3: ''
    });

    const [savedData, setSavedData] = useState({
        1: ["first"],
        2: ["second"],
        3: ["third"]
    });



    const [draggedCard, setDraggedCard] = useState(null);

    const handleInputChange = (e, inputId) => {
        setInputValues(prev => ({
            ...prev,
            [inputId]: e.target.value
        }));
    };

    const handleAdd = async (columnId) => {
        const value = inputValues[columnId].trim();
        if (!value) return;

        await saveToDatabase(columnId, value);

        setSavedData(prev => ({
            ...prev,
            [columnId]: [...prev[columnId], value]
        }));

        // Clear only the current column's input
        setInputValues(prev => ({
            ...prev,
            [columnId]: '',
        }));
    };

    const saveToDatabase = async (inputId, value) => {
        console.log(`Saving to DB from input ${inputId}:`, value);
        return new Promise(resolve => setTimeout(() => resolve(true), 500));
    };


    const onDragStart = (e, cardIndex, fromColumn) => {
        setDraggedCard({ cardIndex, fromColumn });

    }

    const onDragOver = (e, toColumn) => {
        e.preventDefault();
    }


    //on drop move card to next column

    const onDrop = (e, toColumn) => {
        e.preventDefault();
        if (!draggedCard) return;
        const { cardIndex, fromColumn } = draggedCard;
        if (fromColumn === toColumn) return;

        setSavedData(prev => {
            const fromList = [...prev[fromColumn]];
            const [movedCard] = fromList.splice(cardIndex, 1); // remove card from old list

            const toList = [...prev[toColumn], movedCard]; // add card to new list

            return {
                ...prev,
                [fromColumn]: fromList,
                [toColumn]: toList
            };
        });

        setDraggedCard(null);


    }


    return (
        <div className="w-full h-full">
            <div className="main w-full p-5 box-border">
                <div className="bg-[#aabeed] h-[90vh] rounded-4xl p-5">
                    <div className="container flex md:flex-row flex-col items-start gap-5 p-2">

                        {/* Column 1: ToDo */}
                        <div className="col1 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, 1)}>
                            <div className="title w-full p-2">
                                <input
                                    type="text"
                                    value={todo}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                    onChange={(e) => setTodo(e.target.value)}
                                />
                            </div>

                            {/* Render saved cards */}
                            {savedData[1].map((title, index) => (
                                <div className="px-4 flex flex-col py-2"
                                    key={index}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, index, 1)}
                                >
                                    <div className="  shadow rounded-lg bg-white text-black p-2">{title}</div></div>
                            ))}

                            <div className="mt-auto">
                                {activeCard !== 1 &&
                                    <div className="btn px-4 py-2">
                                        <button
                                            className="flex items-center gap-1 h-9 px-2 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full"
                                            onClick={() => setActiveCard(1)}
                                        >
                                            <Plus /> Add a Card
                                        </button>
                                    </div>}

                                {activeCard === 1 && <div className="wrapper px-4 flex flex-col">
                                    <div className="input">
                                        <input
                                            type="text"
                                            value={inputValues[1]}
                                            onChange={(e) => handleInputChange(e, 1)}
                                            className="border-2 border-[#4CAF50] focus:border-none hover:border-none w-full h-10 rounded-lg p-2 focus:outline-none bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="btn flex flex-row gap-2 py-2">
                                        <button
                                            className="flex items-center gap-1 h-9 px-2 bg-[#4CAF50] text-white rounded"
                                            onClick={() => handleAdd(1)}
                                        >
                                            Add Card
                                        </button>
                                        <button onClick={() => setActiveCard(null)}><X /></button>
                                    </div>
                                </div>}
                            </div>
                        </div>

                        {/* Column 2: In-Progress */}
                        <div className="col2 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, 2)}>
                            <div className="title w-full p-2">
                                <input
                                    type="text"
                                    value={inprogress}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                    onChange={(e) => setInprogress(e.target.value)}
                                />
                            </div>

                            {/* Render saved cards */}
                            {savedData[2].map((title, index) => (
                                <div className="px-4 flex flex-col py-2"
                                    key={index}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, index, 2)}>   <div className="  shadow rounded-lg bg-white text-black p-2">{title}</div></div>
                            ))}

                            <div className="mt-auto">
                                {activeCard !== 2 &&
                                    <div className="btn px-4 py-2">
                                        <button
                                            className="flex items-center gap-1 h-9 px-2 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full"
                                            onClick={() => setActiveCard(2)}
                                        >
                                            <Plus /> Add a Card
                                        </button>
                                    </div>}

                                {activeCard === 2 && <div className="wrapper px-4 flex flex-col">
                                    <div className="input">
                                        <input
                                            type="text"
                                            value={inputValues[2]}
                                            onChange={(e) => handleInputChange(e, 2)}
                                            className="border-2 border-[#4CAF50] 
                        focus:border-none hover:border-none 
                        w-full h-10 rounded-lg p-2 focus:outline-none 
                        bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="btn flex flex-row gap-2 py-2">
                                        <button
                                            className="flex items-center gap-1 h-9 px-2 bg-[#4CAF50] text-white rounded"
                                            onClick={() => handleAdd(2)}
                                        >
                                            Add Card
                                        </button>
                                        <button onClick={() => setActiveCard(null)}><X /></button>
                                    </div>
                                </div>}
                            </div>
                        </div>

                        {/* Column 3: Done */}
                        <div className="col3 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, 3)}>
                            <div className="title w-full p-2">
                                <input
                                    type="text"
                                    value={done}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                    onChange={(e) => setDone(e.target.value)}
                                />
                            </div>

                            {/* Render saved cards */}
                            {savedData[3].map((title, index) => (
                                <div className="px-4 flex flex-col py-2"
                                    key={index}
                                    draggable
                                    onDragStart={(e) => onDragStart(e, index, 3)}>
                                    <div className="  shadow rounded-lg bg-white text-black p-2">{title}</div></div>
                            ))}

                            <div className="mt-auto">
                                {activeCard !== 3 &&
                                    <div className="btn px-4 py-2">
                                        <button
                                            className="flex items-center gap-1 h-9 px-2 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full"
                                            onClick={() => setActiveCard(3)}
                                        >
                                            <Plus /> Add a Card
                                        </button>
                                    </div>}

                                {activeCard === 3 && <div className="wrapper px-4 flex flex-col">
                                    <div className="input">
                                        <input
                                            type="text"
                                            value={inputValues[3]}
                                            onChange={(e) => handleInputChange(e, 3)}
                                            className="border-2 border-[#4CAF50] 
                        focus:border-none hover:border-none 
                        w-full h-10 rounded-lg p-2 focus:outline-none 
                        bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="btn flex flex-row gap-2 py-2">
                                        <button
                                            className="flex items-center gap-1 h-9 px-2 bg-[#4CAF50] text-white rounded"
                                            onClick={() => handleAdd(3)}
                                        >
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

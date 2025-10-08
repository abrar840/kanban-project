import { useState, useEffect, use } from "react";
import React from "react";
import TopBar from "@/components/TopBar";
import { X, Plus } from "lucide-react";
import api from "@/lib/axios";
import { buttonVariants } from "@/components/ui/button";
const Board = ({ board,setAddMethod}) => {







    const [todo, setTodo] = useState("ToDo");
    const [inprogress, setInprogress] = useState("In-Progress");
    const [done, setDone] = useState("Done");
    const [activeCard, setActiveCard] = useState(null); // which column is active
    const [title, setTitle] = useState("Title");
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentBoardData, setCurrentBoardData] = useState(null);
    const [board_id, setBoard_id] = useState(board);
    const [allColumns, setAllColumns] = useState([]);
    const [dataChangeTrigger, setDataChangeTrigger] = useState(0);

    const [inputValues, setInputValues] = useState({
        1: "",
        2: "",
        3: "",
    });

    const [savedData, setSavedData] = useState({
        1: ["first"],
        2: ["second"],
        3: ["third"],
    });

    //    useEffect(() => {
    //         localStorage.setItem("tokens", res.data.access_token);

    //    }, [])

    const [draggedCard, setDraggedCard] = useState(null);

    const handleInputChange = (e, inputId) => {
        setInputValues((prev) => ({
            ...prev,
            [inputId]: e.target.value,
        }));
    };

    const handleAdd = async (position) => {

        const value = inputValues[position].trim();

        if (!value) return;

        savetaskToDatabase(value, position, currentBoard)

        setSavedData((prev) => ({
            ...prev,
            [position]: [...prev[position], value],
        }));

        // Clear only the current column's input
        setInputValues((prev) => ({
            ...prev,
            [position]: "",
        }));
    };



    const onDragStart = (e, cardIndex, fromColumn) => {
        setDraggedCard({ cardIndex, fromColumn });
    };

    const onDragOver = (e, toColumn) => {
        e.preventDefault();
    };

    //on drop move card to next column

    const onDrop = (e, toColumn) => {
        e.preventDefault();
        if (!draggedCard) return;
        const { cardIndex, fromColumn } = draggedCard;
        if (fromColumn === toColumn) return;

        setSavedData((prev) => {
           
            const fromList = [...prev[fromColumn]];
            const [movedCard] = fromList.splice(cardIndex, 1); // remove card from old list
               
            const toList = [...prev[toColumn], movedCard]; // add card to new list

            return {
                ...prev,
                [fromColumn]: fromList,
                [toColumn]: toList,
            };
        });

        setDraggedCard(null);
    };

    //NOW here on every cnae we will be saving record to dbn
    const saveTitleToDatabase = async (newTitle) => {

        console.log(newTitle)
        console.log("ddddd", currentBoard)



        if (currentBoard) {
            const res = await api.put(`/update-board/${currentBoard}`, {
                name: newTitle,
                total_cols: 3,
                id: currentBoard
            });
            if (res) {
                alert("saved");
                setTitle(res.data.name);
            }
        } else {
            try {
                const res = await api.post("/add-board", {
                    name: newTitle,
                    total_cols: 3,
                });
                if (res) {
                    alert("saved");
                    setTitle(res.data.name);
                    setCurrentBoard(res.data.id)

                    setDataChangeTrigger(prev => prev + 1)
                    // Save board id to localStorage after creation



                }
            } catch (err) {
                console.error("Failed to save title:", err);
                alert("failed to save board title.please try again");
            }
        }
    };



    const savecolumnToDatabase = async (newTitle, position, board_id) => {
        if (!currentBoard) {

            saveTitleToDatabase(title);
            setDataChangeTrigger(prev => prev + 1);
        }

        try {
            const res = await api.post("/create-column", {
                title: newTitle,
                position: position,
                board_id: board_id
            });
            if (res) {
                alert("saved");
                setTitle(res.data.name);
                setDataChangeTrigger(prev => prev + 1);

            }
        } catch (err) {
            console.error("Failed to save title:", err);
            alert("failed to save board title.please try again");
        }

    };



    const savetaskToDatabase = async (Title, position, board_id,) => {

        try {
            const column = allColumns.find(col => col.position === position);

            if (!column) {
                savecolumnToDatabase(todo, 1, board_id)
                savecolumnToDatabase(inprogress, 2, board_id)
                savecolumnToDatabase(done, 3, board_id)
                setDataChangeTrigger(prev => prev + 1);
                console.error("Column not found for position:", position);

                console.error("Column not found for position:", allColumns);
                return;
            }

            const res = await api.post("/create-task", {
                title: Title,
                position: position,
                board_id: board_id,
                column_id: column.id


            });
            if (res) {
                alert("saved");
                setDataChangeTrigger(prev => prev + 1);
            }
        } catch (err) {
            console.error("Failed to save title:", err);
            alert("failed to save board title.please try again");
        }

    };



    const initiateBoard = (title) => {

        saveTitleToDatabase(title);

    }

useEffect(() => {
  setAddMethod(() => initiateBoard); // pass function
}, []);

    


    useEffect(() => {
        if (currentBoard) {
            localStorage.setItem("selectedBoardId", currentBoard);
        }
    }, [dataChangeTrigger, currentBoard]);





    useEffect(() => {
        // If board prop is not provided, try to get board id from localStorage
        let boardToUse = board;
        if (!boardToUse) {
            const storedBoardId = localStorage.getItem("selectedBoardId");
            if (storedBoardId) {
                boardToUse = storedBoardId;
            }
        }
        setCurrentBoard(boardToUse);
        setBoard_id(boardToUse);

        const fetchBoardData = async () => {
            try {
                const res = await api.get(`/get-board/${boardToUse}`);
                const data = res.data;
                setCurrentBoardData(data);
                setTitle(data.name);
                const columns = data.columns;

                const todoColumn = columns.find(col => col.position === 1) || null;
                const inprogressColumn = columns.find(col => col.position === 2) || null;
                const doneColumn = columns.find(col => col.position === 3) || null;

                setTodo(todoColumn?.title || "ToDo");
                setInprogress(inprogressColumn?.title || "In-Progress");
                setDone(doneColumn?.title || "Done");


                setAllColumns(columns);

                console.log(allColumns);


                const newSavedData = {
                    1: [],
                    2: [],
                    3: [],
                };
                columns.forEach(col => {
                    col.tasks?.forEach(task => {
                        if (newSavedData[task.position]) {
                            newSavedData[task.position].push(task.title);
                        }
                    });
                });
                setSavedData(newSavedData);
            } catch (err) {
                console.error("Failed to fetch board data:", err);
            }
        };

        if (boardToUse) {
            fetchBoardData();
        }
    }, [board, dataChangeTrigger]);


    useEffect(() => {
        if (board) {
            localStorage.setItem("selectedBoardId", board);
        }
    }, [board, dataChangeTrigger]);











    return (
        <div className="w-full h-full bg-[rgb(143,169,255)]">


            <div className="main w-full p-5 box-border">


                <div className="bg-[#aabeed] h-[100%] min-h-screen rounded-4xl p-5">
                    {currentBoard && <>     <div className="title px-3">
                        <input
                            type="text"
                            value={title}
                            className="focus:outline-none focus:ring-2 focus:ring-blue-500   text-black  font-semibold text-lg rounded px-2"
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => saveTitleToDatabase(title)}
                        />
                    </div>
                        <div className="container flex md:flex-row flex-col items-start gap-5 p-2">
                            {/* Column 1: ToDo */}
                            <div
                                className="col1 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full"
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, 1)}
                            >
                                <div className="title w-full p-2">
                                    <input
                                        type="text"
                                        value={todo}
                                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                        onChange={(e) => setTodo(e.target.value)}
                                        onBlur={() => savecolumnToDatabase(todo, 1, board_id)}
                                    />
                                </div>

                                {/* Render saved cards */}
                                {savedData[1].map((title, index) => (
                                    <div
                                        className="px-4 flex flex-col py-2"
                                        key={index}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, index, 1)}
                                    >
                                        <div className="  shadow rounded-lg bg-white text-black p-2">
                                            {title}
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-auto">
                                    {activeCard !== 1 && (
                                        <div className="btn px-4 py-2">
                                            <button
                                                className="flex items-center gap-1 h-9 px-2 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full"
                                                onClick={() => setActiveCard(1)}
                                            >
                                                <Plus /> Add a Card
                                            </button>
                                        </div>
                                    )}

                                    {activeCard === 1 && (
                                        <div className="wrapper px-4 flex flex-col">
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
                                                <button onClick={() => setActiveCard(null)}>
                                                    <X />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Column 2: In-Progress */}
                            <div
                                className="col2 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full"
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, 2)}
                            >
                                <div className="title w-full p-2">
                                    <input
                                        type="text"
                                        value={inprogress}
                                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                        onChange={(e) => setInprogress(e.target.value)}
                                        onBlur={() => savecolumnToDatabase(inprogress, 2, board_id)}
                                    />
                                </div>

                                {/* Render saved cards */}
                                {savedData[2].map((title, index) => (
                                    <div
                                        className="px-4 flex flex-col py-2"
                                        key={index}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, index, 2)}
                                    >
                                        {" "}
                                        <div className="  shadow rounded-lg bg-white text-black p-2">
                                            {title}
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-auto">
                                    {activeCard !== 2 && (
                                        <div className="btn px-4 py-2">
                                            <button
                                                className="flex items-center gap-1 h-9 px-2 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full"
                                                onClick={() => setActiveCard(2)}
                                            >
                                                <Plus /> Add a Card
                                            </button>
                                        </div>
                                    )}

                                    {activeCard === 2 && (
                                        <div className="wrapper px-4 flex flex-col">
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
                                                <button onClick={() => setActiveCard(null)}>
                                                    <X />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Column 3: Done */}
                            <div
                                className="col3 bg-[#f1f2f4] w-full md:w-1/3 rounded-lg min-h-[150px] flex flex-col h-full"
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, 3)}
                            >
                                <div className="title w-full p-2">
                                    <input
                                        type="text"
                                        value={done}
                                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                        onChange={(e) => setDone(e.target.value)}
                                        onBlur={() => savecolumnToDatabase(done, 3, board_id)}
                                    />
                                </div>

                                {/* Render saved cards */}
                                {savedData[3].map((title, index) => (
                                    <div
                                        className="px-4 flex flex-col py-2"
                                        key={index}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, index, 3)}
                                    >
                                        <div className="  shadow rounded-lg bg-white text-black p-2">
                                            {title}
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-auto">
                                    {activeCard !== 3 && (
                                        <div className="btn px-4 py-2">
                                            <button
                                                className="flex items-center gap-1 h-9 px-2 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 w-full"
                                                onClick={() => setActiveCard(3)}
                                            >
                                                <Plus /> Add a Card
                                            </button>
                                        </div>
                                    )}

                                    {activeCard === 3 && (
                                        <div className="wrapper px-4 flex flex-col">
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
                                                <button onClick={() => setActiveCard(null)}>
                                                    <X />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div> </>}
                    {!currentBoard && (
                        <div className="flex justify-center items-center min-h-[60vh]">
                            <button
                                className="bg-[#aabeed] text-black px-6 py-3 rounded-lg font-semibold shadow shadow-black hover:bg-[#8fa9ff] transition"
                                onClick={() => initiateBoard(title)}
                            >
                                Add Board
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;

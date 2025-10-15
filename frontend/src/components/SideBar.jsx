import React, { useState, useEffect, use } from "react";
import { ChevronRight, X } from "lucide-react";
import api from "@/lib/axios";
import { useLocation } from "react-router-dom";
const SideBar = ({ open, onClose, setBoard, currentboard }) => {
    const location = useLocation();
    const [boards, setBoards] = useState([]);
    const [boardsOpen, setBoardsOpen] = useState(false);

    const [contribOpen, setContribOpen] = useState(false);
    const [contributions, setContributions] = useState([]);

    const [contributorsOpen, setContributorsOpen] = useState(false);
    const [contributors, setContributors] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [contributorEmail, setContributorEmail] = useState("");
    const [currentBoardId, setCurrentBoardId] = useState(currentboard);
    const [refresh, setRefresh] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("tokens");
        localStorage.removeItem("selectedBoardId");
        window.location.href = "/login";
    };

    const setCurrentBoard = (id) => {
        setBoard(id);
        setCurrentBoardId(id);
    };

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await api.get("/get-boards");
                setBoards(res.data);
            } catch (err) {
                console.error("Failed to fetch boards", err);
            }
        };

        const fetchContributions = async () => {
            try {
                const res = await api.get("/get-contributions");
                setContributions(res.data);
            } catch (err) {
                console.error("Failed to fetch contributions", err);
            }
        };



        fetchBoards();
        fetchContributions();


        if (currentBoardId == null) {
            const savedId = localStorage.getItem("selectedBoardId");
            if (savedId) setCurrentBoardId(savedId);
        }
    }, [refresh]);



    useEffect(() => {

        const fetchContributors = async () => {
            try {
                const res = await api.get(`/get-contributors/${currentBoardId}`); // Replace with currentBoardId if dynamic
                setContributors(res.data);
            } catch (err) {
                console.error("Failed to fetch contributors", err);
            }
        };

        fetchContributors();

    }, [currentBoardId, refresh]);








    const addContributor = async (email) => {
        try {
            const res = await api.post("/add-contributor", {
                contributor_email: email,
                board_id: currentBoardId,
                role: "admin",
            });
            alert("Contributor added successfully");
            setRefresh((prev) => !prev);
            setShowInput(false);

        } catch (err) {
            const errorMessage = err.response?.data?.detail || "Something went wrong";
            alert(errorMessage);
        }



    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl rounded-l-2xl flex flex-col justify-between z-40 transition-transform duration-300
            ${open ? "translate-x-0" : "translate-x-full"}`}
            style={{ willChange: "transform", borderLeft: "1px solid #e5e7eb" }}
        >
            {/* Close button */}
            <div className="flex justify-end p-4">
                <button
                    onClick={onClose}
                    aria-label="Close sidebar"
                    className="p-2 rounded hover:bg-gray-100"
                >
                    <X size={24} color="#334155" />
                </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-blue-900"><a href="/dashboard">Dashboard</a>
                </h2>
                <ul className="space-y-4 items-start flex flex-col">
                    {/* My Boards Dropdown */}

                    {location.pathname === '/' &&
                  <> 
                        <li>
                            <button
                                className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded transition"
                                onClick={() => setBoardsOpen(!boardsOpen)}
                            >
                                <span>  My Boards</span>
                                <ChevronRight
                                    size={20}
                                    className={`transition-transform ${boardsOpen ? "rotate-90" : ""}`}
                                    color="#334155"
                                />
                            </button>
                            {boardsOpen && (
                                <div className="ml-4 mt-2">
                                    {boards.length === 0 ? (
                                        <p className="text-sm text-gray-400">No record found</p>
                                    ) : (
                                        <ul className="space-y-1">
                                            {boards.map((board) => (
                                                <li
                                                    key={board.id}
                                                    className="py-1 px-3 rounded cursor-pointer hover:bg-blue-50 text-sm font-medium text-gray-700"
                                                    onClick={() => setCurrentBoard(board.id)}
                                                >
                                                    {board.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </li>

                    {/* My Contributions Dropdown */}
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded transition"
                            onClick={() => setContribOpen(!contribOpen)}
                        >
                            <span>My Contributions</span>
                            <ChevronRight
                                size={20}
                                className={`transition-transform ${contribOpen ? "rotate-90" : ""}`}
                                color="#334155"
                            />
                        </button>
                        {contribOpen && (
                            <div className="ml-4 mt-2">
                                {contributions.length === 0 ? (
                                    <p className="text-sm text-gray-400">No record found</p>
                                ) : (
                                    <ul className="space-y-1">
                                        {contributions.map((contribution) => (
                                            <li
                                                key={contribution.id}
                                                className="py-1 px-3 rounded cursor-pointer hover:bg-blue-50 text-sm font-medium text-gray-700"
                                                onClick={() => setCurrentBoard(contribution.id)}
                                            >
                                                {contribution.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </li>

                    {/* Contributors Dropdown */}
                    <li>
                        <button
                            className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 font-semibold py-2 px-3 rounded transition"
                            onClick={() => setContributorsOpen(!contributorsOpen)}
                        >
                            <span>Contributors</span>
                            <ChevronRight
                                size={20}
                                className={`transition-transform ${contributorsOpen ? "rotate-90" : ""}`}
                                color="#334155"
                            />
                        </button>

                        {contributorsOpen && (
                            <div className="ml-4 mt-2">
                                {contributors.length === 0 ? (
                                    <p className="text-sm text-gray-400">No record found</p>
                                ) : (
                                    <ul className="space-y-1 mb-3">
                                        {contributors.map((contributor) => (
                                            <li
                                                key={contributor.id}
                                                className="py-1 px-3 rounded text-sm font-medium text-gray-700 hover:bg-gray-100"
                                            >
                                                {contributor.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {!showInput && (
                                    <button
                                        className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition"
                                        onClick={() => setShowInput(true)}
                                    >
                                        + Add More
                                    </button>
                                )}

                                {showInput && (
                                    <div className="flex flex-col gap-2 mt-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="email"
                                                placeholder="Contributor email"
                                                className="flex-1 text-sm px-2 py-1 border border-gray-300 rounded"
                                                value={contributorEmail}
                                                onChange={(e) => setContributorEmail(e.target.value)}
                                            />
                                            <button onClick={() => setShowInput(false)}>
                                                <X size={20} color="#334155" />
                                            </button>
                                        </div>
                                        <button
                                            className="text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition self-start"
                                            onClick={() => addContributor(contributorEmail)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li> </> }

                    <li className="px-3 text-black"><a href="/dashboard" className="text-black">DashBoard</a></li>
                    <li className="px-3 text-black"><a href="/" className="text-black">Board</a></li>
                </ul>
            </div>

            <div className="p-6 border-t">
                <button
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full font-semibold py-2 px-3 rounded transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideBar;

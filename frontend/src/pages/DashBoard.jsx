import TaskStatus from "@/components/TaskStatus";
import React, { useState, useEffect } from "react";
import api from "@/lib/axios";

function DashBoard() {
  const [task, setTask] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [boards, setBoards] = useState([]);

  // State for counts and percentages
  const [counts, setCounts] = useState({
    pending: 0,
    inprogress: 0,
    done: 0,
  });

  const [percentage, setPercentage] = useState({
    pending: "0.00",
    inprogress: "0.00",
    done: "0.00",
  });

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fetchTask = async () => {
    try {
      const res = await api.get(`get-task-by-boardid/${selectedOption}`);

      if (!res || !res.data || res.data.length === 0) {
        alert("No tasks found for this user");
        setTask([]);
        setCounts({ pending: 0, inprogress: 0, done: 0 });
        setPercentage({ pending: "0.00", inprogress: "0.00", done: "0.00" });
        return;
      }

      setTask(res.data);

      const totalCount = res.data.length;

      // Count how many tasks per position
      const newCounts = {
        pending: 0,
        inprogress: 0,
        done: 0,
      };

      res.data.forEach((task) => {
        if (task.position === 1) newCounts.pending += 1;
        else if (task.position === 2) newCounts.inprogress += 1;
        else if (task.position === 3) newCounts.done += 1;
      });

      setCounts(newCounts);

      // Calculate percentages and format to 2 decimal places
      const newPercentage = {
        pending: ((newCounts.pending / totalCount) * 100).toFixed(2),
        inprogress: ((newCounts.inprogress / totalCount) * 100).toFixed(2),
        done: ((newCounts.done / totalCount) * 100).toFixed(2),
      };

      setPercentage(newPercentage);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks");
      setTask([]);
      setCounts({ pending: 0, inprogress: 0, done: 0 });
      setPercentage({ pending: "0.00", inprogress: "0.00", done: "0.00" });
    }
  };

  const fetchBoard = async () => {
    try {
      const res = await api.get("/get-boards");
      if (res && res.data) {
        setBoards(res.data);
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
      alert("Failed to fetch boards");
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      fetchTask();
    } else {
      // Reset when no board selected
      setTask([]);
      setCounts({ pending: 0, inprogress: 0, done: 0 });
      setPercentage({ pending: "0.00", inprogress: "0.00", done: "0.00" });
    }
  }, [selectedOption]);

  return (
    <div className="p-5 w-full h-full">
      {boards.length > 0 && (
        <div className="mb-6 w-full max-w-sm">
          <label
            htmlFor="dropdown"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Choose a board:
          </label>

          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-gray-800 bg-white border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">-- Select --</option>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="graph">
        <TaskStatus counts={counts} percentage={percentage} />
      </div>
    </div>
  );
}

export default DashBoard;

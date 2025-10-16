import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";

const TaskStatus = ({ counts, percentage }) => {
  const renderChart = (percent, color) => (
    <div className="flex flex-col items-center relative">
      <PieChart width={120} height={120}>
        <Pie
          data={[{ value: percent }, { value: 100 - percent }]}
          innerRadius={40}
          outerRadius={55}
          startAngle={-270}
          endAngle={90}
          dataKey="value"
        >
          <Cell fill={color} />
          <Cell fill="#e5e7eb" />
        </Pie>
      </PieChart>
      <div
        className="text-xl font-bold absolute"
        style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {percent}%
      </div>
    </div>
  );

  return (
    <div>
      <Card className="px-1 bg-transparent border-none shadow-none h-[34%]">
        <div className="flex flex-col xl:flex-row justify-around items-center w-auto gap-6">
          {/* Completed */}
          <div className="relative flex flex-col items-center">
            {renderChart(Number(percentage.pending), "red")}
            <p className="mt-2 text-sm text-red-600 font-semibold">
              ● Not Started
            </p>
            <ul className="mt-1 text-gray-700 text-sm">
              <li>
                Tasks: <span className="font-bold">{counts.pending}</span>
              </li>
            </ul>
          </div>

          {/* In Progress */}
          <div className="relative flex flex-col items-center">
            {renderChart(Number(percentage.inprogress), "blue")}
            <p className="mt-2 text-sm text-blue-600 font-semibold">
              ● In Progress
            </p>
            <ul className="mt-1 text-gray-700 text-sm">
              <li>
                Tasks: <span className="font-bold">{counts.inprogress}</span>
              </li>
            </ul>
          </div>

          {/* Not Started */}
          <div className="relative flex flex-col items-center">
            {renderChart(Number(percentage.done), "green")}
            <p className="mt-2 text-sm text-green-600 font-semibold">
              ● Completed
            </p>
            <ul className="mt-1 text-gray-700 text-sm">
              <li>
                Tasks: <span className="font-bold">{counts.done}</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskStatus;

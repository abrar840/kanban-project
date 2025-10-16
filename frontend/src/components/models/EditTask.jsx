import React, { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

const EditTask = ({ onClose, editid }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [contributors, setContributors] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [user_id, setUser_id] = useState(null);
  const [task, setTask] = useState([]);

  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/get-task-by-id/${editid}`);
        const task = res.data;
        setTaskId(task.board_id);
        setTitle(task.title || "");
        setDescription(task.description || "");
        setTask(task);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    if (editid) fetchTask();
  }, [editid]);

  // Fetch contributors
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await api.get(`/get-contributors/${taskId}`);
        setContributors(res.data);
        setUser_id(contributors.id);
      } catch (err) {
        console.error("Failed to fetch contributors", err);
      }
    };

    if (taskId) fetchContributors();
  }, [taskId]);

  const updateItem = async (updatedTask, taskId) => {
    const res = await api.put(`/update-task/${taskId}`, updatedTask);
    return res.data;
  };

  const handleSave = async () => {
    const tempErrors = {};
    if (!title) tempErrors.title = "Title is required";
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      const updatedTask = {
        title,
        description,
        user_id,
      };

      await updateItem(updatedTask, editid);

      onClose();
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to update task.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/delete-task/${editid}`);
      onClose();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="w-full h-full border-gray-400 fixed top-0 left-0 z-1000">
      <div className="overlay absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]"></div>

      <div className="form absolute top-[2%] md:top-[9%] md:left-[20%] h-full w-full lg:h-[85%] lg:w-[50%] md:w-[70%] rounded bg-white overflow-y-auto">
        <div className="card rounded bg-white">
          <Card className="border-none shadow-none">
            <CardHeader className="pb-1">
              <CardTitle className="text-xl font-semibold">Edit Task</CardTitle>

              {/* Contributor dropdown below the heading */}
              <div className="mt-2 w-[60%]">
                <label
                  htmlFor="assignee"
                  className="text-sm font-medium text-gray-600 mb-1 block"
                >
                  Assigned to
                </label>
                <select
                  id="assignee"
                  value={user_id !== null ? String(user_id) : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUser_id(value === "" ? null : Number(value));
                  }}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {/* Always show Unassigned */}

                  {/* Show current assignee if any */}
                  {task.user?.id && (
                    <>
                      <option value={String(task.user.id)}>
                        {task.user.full_name}
                      </option>
                    </>
                  )}
                  <option value="">Unassigned</option>

                  {/* Show other contributors, excluding current assignee */}
                  {contributors
                    .filter((contributor) => contributor.id !== task.user?.id)
                    .map((contributor) => (
                      <option
                        key={contributor.id}
                        value={String(contributor.id)}
                      >
                        {contributor.name}
                      </option>
                    ))}
                </select>
              </div>

              <CardAction className="font-semibold mt-4">
                <button
                  onClick={onClose}
                  className="text-blue-600 hover:underline"
                >
                  Go Back
                </button>
              </CardAction>
            </CardHeader>

            <div className="card2 md:p-10">
              <Card className="shadow-none rounded-none border border-gray-400">
                <CardContent>
                  <div className="flex flex-col gap-6">
                    {/* Title */}
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        type="text"
                        className="border-gray-400 w-[70%]"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        className="shadow-none md:h-[150px] border border-gray-400"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="btn mt-5 ml-5 flex gap-3">
                <Button className="bg-green-400" onClick={handleSave}>
                  Done
                </Button>
                <Button
                  className="bg-red-400 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete Task
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditTask;

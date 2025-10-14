
import React, { useState, useEffect } from 'react';
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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: "", description: "" });

  // Fetch existing task data by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/get-task-by-id/${editid}`);
         
        const task = res.data;

        setTitle(task.title || '');
        setDescription(task.description || '');
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    if (editid) fetchTask();
  }, [editid]);

  const updateItem = async (updatedTask, taskId) => {
    const res = await api.put(`/update-task/${taskId}`, updatedTask);
    return res.data;
  };

  const handleSave = async () => {
    let tempErrors = {};
    if (!title) tempErrors.title = "Title is required";
    

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) return;

    try {
      const updatedTask = { title, description };
      await updateItem(updatedTask, editid);
      alert("Task updated successfully!");
      onClose();
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to update task.");
    }
  };

  return (
    <div className='w-full h-full border-gray-400 fixed top-0 left-0 z-1000'>
      <div className="overlay absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]"></div>

      <div className="form absolute top-[2%] md:top-[9%] md:left-[20%] h-[100vh] w-full lg:h-[80%] lg:w-[50%] md:w-[70%] rounded bg-white overflow-y-auto">
        <div className="card rounded bg-white">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle>Edit Task</CardTitle>
              <CardAction className="font-semibold">
                <button onClick={onClose}><u>Go Back</u></button>
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
                        required
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
                        <p className="text-red-500 text-sm">{errors.description}</p>
                      )}
                    </div>

                  </div>
                </CardContent>
              </Card>

              <div className="btn mt-5 ml-5">
                <Button className="bg-green-400" onClick={handleSave}>
                  Done
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

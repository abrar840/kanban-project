import React, { useState } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Edit, UploadCloud } from 'lucide-react';
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

const EditTask = ({ onClose, task }) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [date, setDate] = useState(task.date || '');
    const [image, setImage] = useState(task.image || '');
    const [id] = useState(task.id);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        date: "",
        image: ""
    });

    // Handle image upload and preview as base64
    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // base64
            };
            reader.readAsDataURL(file);
        }
    };

    // API call to update task
    const updateItem = async (updatedTask, taskId) => {
        const res = await api.put(`/update-task/${taskId}`, updatedTask);
        return res.data;
    };

    // Form submission
    const handleSave = async () => {
        let tempErrors = {};

        if (!title) tempErrors.title = "Title is required";
        if (!description) tempErrors.description = "Description is required";
        if (!date) tempErrors.date = "Date is required";

        setErrors(tempErrors);
        if (Object.keys(tempErrors).length > 0) return;

        try {
            const updatedTask = {
                title,
                description,
                date,
                image: image || "", // optional
            };

            await updateItem(updatedTask, id);
            alert("Task updated successfully!");
            onClose();
        } catch (err) {
            console.error("Error saving task:", err);
            alert("Failed to save task. Please try again.");
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
                                <button onClick={() => onClose()}><u>Go Back</u></button>
                            </CardAction>
                        </CardHeader>

                        <div className="card2 md:p-10">
                            <Card className="shadow-none rounded-none border-1 border-gray-400">
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
                                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                                        </div>

                                        {/* Date */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                id="date"
                                                type="date"
                                                required
                                                className="border-gray-400 w-[70%]"
                                            />
                                            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                                        </div>

                                        {/* Priority (UI only for now) */}
                                        <div className="checkbox">
                                            <Label>Priority</Label>
                                            <div className="flex flex-col lg:flex-row gap-12 items-center text-gray-400 font-light mt-2">
                                                <div className='flex flex-row items-center gap-2'>
                                                    <Label htmlFor="check1"><p className="text-sm text-red-600">●</p>Extreme</Label>
                                                    <Checkbox className="rounded-none" id="check1" />
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <Label htmlFor="check2"><p className="text-sm text-blue-400">●</p>Medium</Label>
                                                    <Checkbox className="rounded-none" id="check2" />
                                                </div>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <Label htmlFor="check3"><p className="text-sm text-green-400">●</p>Low</Label>
                                                    <Checkbox className="rounded-none" id="check3" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description + Image Upload */}
                                        <div className="last flex md:flex-row flex-col gap-8 items-start">

                                            {/* Description */}
                                            <div className="wrapper md:w-[60%] w-full mt-1">
                                                <span><h1 className='font-semibold mb-2'>Description</h1></span>
                                                <Textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="shadow-none md:h-[150px] border border-gray-400"
                                                />
                                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                            </div>

                                            {/* Image Upload */}
                                            <div className="wrapper md:w-[30%] w-full flex flex-col">
                                                <span><h1 className='font-semibold mb-2'>Upload Image</h1></span>
                                                <div className="img border border-gray-400 rounded flex-1">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer hover:border-gray-500 transition-all duration-200 text-center"
                                                    >
                                                        {!image && (
                                                            <>
                                                                <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                                                                <p className="text-sm text-gray-500">Drag & Drop files here</p>
                                                                <p className="text-sm text-gray-400 mb-2">or</p>
                                                                <div className="px-3 py-1 border rounded bg-gray-100 text-sm text-gray-700 hover:bg-gray-200">
                                                                    Browse
                                                                </div>
                                                            </>
                                                        )}
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            className="hidden"
                                                            onChange={handleUpload}
                                                        />
                                                        {image && (
                                                            <img src={image} alt="Preview" className="mt-2 w-full max-w-xs rounded" />
                                                        )}
                                                    </label>
                                                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>

                            {/* Save Button */}
                            <div className="btn mt-5 ml-5">
                                <Button className="bg-orange-600" onClick={handleSave}>
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

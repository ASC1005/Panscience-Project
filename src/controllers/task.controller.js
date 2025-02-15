import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllTasks = asyncHandler(async (req, res) => {
    const filter = req.user.role === "Admin" ? {} : { assigned_to: req.user._id };

    const tasks = await Task.find(filter)
        .populate("assigned_to", "fullName email")
        .lean();

    return res.status(200).json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
});

export const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
        .populate("assigned_to", "fullName email")
        .lean();

    if (!task) throw new ApiError(404, "Task not found");

    if (req.user.role !== "Admin" && task.assigned_to._id.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to view this task");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));
});

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, priority, due_date } = req.body;

    const date_converted = Date(due_date);

    const newTask = await Task.create({
        title,
        description,
        priority,
        due_date: date_converted,
        assigned_to: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, newTask, "Task created successfully"));
});

export const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) throw new ApiError(404, "Task not found");

    if (req.user.role !== "Admin" && task.assigned_to.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to update this task");
    }

    if (req.body.assigned_to && req.user.role !== "Admin") {
        throw new ApiError(403, "Only Admins can change task assignment");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate("assigned_to", "fullName email");

    return res.status(200).json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

export const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) throw new ApiError(404, "Task not found");

    if (req.user.role !== "Admin" && task.assigned_to.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to delete this task");
    }

    await Task.findByIdAndDelete(req.params.id);

    return res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
});

import Priority from "../model/priority.model.js";

export const addPriority = async (req, res) => {
    const priority = req.body;
    const newPriority = new Priority({
        priorityName: priority.priorityName,
        priorityDesc: priority.priorityDesc,
        priorityStatus: priority.priorityStatus,
        priorityComment: priority.priorityComment,
    });
    try {
        const priority = await newPriority.save();
        res.status(200).json({
        success: true,
        status: 200,
        data: priority,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }

export const getAllPriority = async (req, res) => {
    try {
        const priority = await Priority.find();
        res.status(200).json({
        success: true,
        status: 200,
        data: priority,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }

export const updatePriority = async (req, res) => {

    try {
        const updatedPriority = await Priority.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        }, { new: true });
        res.status(200).json({
        success: true,
        status: 200,
        data: updatedPriority,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }

export const deletePriority = async (req, res) => {
    try {
        const priority = await Priority.findByIdAndDelete(req.params.id);
        res.status(200).json({
        success: true,
        status: 200,
        data: priority,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }


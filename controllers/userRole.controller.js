import UserRole from "../model/userRole.model.js";

export const createUserRole = async (req, res) => {
    const userRole = req.body;
    const newUserRole = new UserRole({
        userRoleName: userRole.userRoleName,
        userRoleDesc: userRole.userRoleDesc,
        userRoleStatus: userRole.userRoleStatus,
        userRoleComment: userRole.userRoleComment,
    });
    try {
        const userRole = await newUserRole.save();
        res.status(200).json({
        success: true,
        status: 200,
        data: userRole,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }

export const getAllUserRole = async (req, res) => {
    try {
        const userRole = await UserRole.find();
        res.status(200).json({
        success: true,
        status: 200,
        data: userRole,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }

export const updateUserRole = async (req, res) => {

    try {
        const updatedUserRole = await UserRole.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        }, { new: true });
        res.status(200).json({
        success: true,
        status: 200,
        data: updatedUserRole,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }


export const deleteUserRole = async (req, res) => {
    try {
        const userRole = await UserRole.findByIdAndDelete(req.params.id);
        res.status(200).json({
        success: true,
        status: 200,
        data: userRole,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }

export const getUserRoleById = async (req, res) => {
    try {
        const userRole = await UserRole.findById(req.params.id);
        res.status(200).json({
        success: true,
        status: 200,
        data: userRole,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    }


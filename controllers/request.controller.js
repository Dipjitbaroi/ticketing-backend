import Company from "../model/company.model.js";
import Priority from "../model/priority.model.js";
import Request from "../model/request.model.js";
import RequestStatus from "../model/requestStatus.model.js";
import RequestType from "../model/requestType.model.js";
import User from "../model/user.model.js";

export const addRequest = async (req, res) => {
  const request = req.body;
  const imagePath = req.file ? req.file.path : undefined;

  // find company by companyName 
  const company = await Company.findById(request.company);
  const user = await User.findById(request.user);
  const requestType = await RequestType.findById(request.requestType)
  const ticketPriority = await Priority.findById(request.ticketPriority)
  const requestStatus =await RequestStatus.findById(request.requestStatus)

  const newRequest = new Request({
    requesterName: request.requesterName,
    requestTitle: request.requestStatus,
    requestDescription: request.requestDescription,
    requestOccuringUrl: request.requestOccuringUrl,
    phone: request.phone,
    email: request.email,
    requestType: requestType,
    ticketPriority: ticketPriority,
    requestStatus: requestStatus,
    requestComment: request.requestComment,
    requestOccuringTime: request.requestOccuringTime,
    company: company,
    user: user,
    files: imagePath,
  });
  try {
    const request = await newRequest.save();
    res.status(200).json({
      success: true,
      status: 200,
      data: request,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getAllRequest = async (req, res) => {
  try {
    const request = await Request.find();
    res.status(200).json({
      success: true,
      status: 200,
      data: request,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserRequests = async (req, res) => {
    try {
        const userId = req.query.user_id; // get the user_id query parameter
        const query = userId ? { "user._id": userId } : {}; // create a query object to filter by user
        const request = await Request.find(query); // filter the requests by the user_id
        res.status(200).json({
          success: true,
          status: 200,
          data: request,
        });
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
  };



export const updateRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const update = req.body;
    const imagePath = req.file ? req.file.path : undefined;

    const updatedRequest = await Request.findOneAndUpdate(
      { _id: requestId },
      {
        $set: {
          requesterName: update.requesterName,
          requestTitle: update.requestStatus,
          requestDescription: update.requestDescription,
          requestOccuringUrl: update.requestComment,
          phone: update.requestDate,
          email: update.requestDueDate,
          requestType: update.requestPriority,
          ticketPriority: update.requestAssignedTo,
          requestStatus: update.requestCreatedBy,
          requestComment: update.requestUpdatedBy,
          requestOccuringTime: update.requestUpdatedDate,
          companyName: update.companyName,
          userName: update.userName,
          files: imagePath,
        },
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      data: updatedRequest,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      status: 200,
      data: request,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// count the total number of request created by an user and in response return the numbers
export const countRequest = async (req, res) => {
  try {
    const request = await Request.countDocuments({
      userName: req.params.userName,
    });
    res.status(200).json({
      success: true,
      status: 200,
      data: request,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// count the total number of request by status and the user
export const countRequestByStatus = async (req, res) => {
  try {
    const request = await Request.countDocuments({
      requestStatus: req.params.requestStatus,
      userName: req.params.userName,
    });
    res.status(200).json({
      success: true,
      status: 200,
      data: request,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

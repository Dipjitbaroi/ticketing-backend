import RequestStatus from "../model/requestStatus.model.js";

export const addRequestStatus = async (req, res) => {
  const requestStatus = req.body;
  const newRequestStatus = new RequestStatus({
    requestStatusName: requestStatus.requestStatusName,
    requestStatusDesc: requestStatus.requestStatusDesc,
    requestStatus: requestStatus.requestStatus,
    requestStatusComment: requestStatus.requestStatusComment,
  });
  try {
    const requestStatus = await newRequestStatus.save();
    res.status(200).json({
      success: true,
      status: 200,
      data: requestStatus,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getAllRequestStatus = async (req, res) => {
  try {
    const requestStatus = await RequestStatus.find();
    res.status(200).json({
      success: true,
      status: 200,
      data: requestStatus,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const updatedRequestStatus = await RequestStatus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      status: 200,
      data: updatedRequestStatus,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const deleteRequestStatus = async (req, res) => {
  try {
    const requestStatus = await RequestStatus.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      status: 200,
      data: requestStatus,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

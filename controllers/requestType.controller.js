import RequestType from "../model/requestType.model.js";

export const addRequestType = async (req, res) => {
  const requestType = req.body;
  const newRequestType = new RequestType({
    requestTypeName: requestType.requestTypeName,
    requestTypeDesc: requestType.requestTypeDesc,
    requestStatus: requestType.requestStatus,
    requestTypeComment: requestType.requestTypeComment,
  });
  try {
    const requestType = await newRequestType.save();
    res.status(200).json({
      success: true,
      status: 200,
      data: requestType,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getAllRequestType = async (req, res) => {
  try {
    const requestType = await RequestType.find();
    res.status(200).json({
      success: true,
      status: 200,
      data: requestType,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateRequestType = async (req, res) => {
  try {
    const updatedRequestType = await RequestType.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      status: 200,
      data: updatedRequestType,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const deleteRequestType = async (req, res) => {
  try {
    const requestType = await RequestType.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      status: 200,
      data: requestType,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getRequestTypeById = async (req, res) => {
  try {
    const requestType = await RequestType.findById(req.params.id);
    res.status(200).json({
      success: true,
      status: 200,
      data: requestType,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

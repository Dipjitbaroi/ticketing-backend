import User from "../model/user.model.js";
import Company from "../model/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const addUser = async (req, res) => {
//   const user = req.body;
//   const company = await Company.findById(user.companyName);
//   const hash = bcrypt.hashSync(user.password, 8);
//   const newUser = new User({
//     username: user.username,
//     name: user.name,
//     email: user.email,
//     password: hash,
//     bio: user.bio,
//     dateOfBirth: user.dateOfBirth,
//     country: user.country,
//     gender: user.gender,
//     language: user.language,
//     phone: user.phone,
//     companyName: company,
//   });

//   try {
//     const user = await newUser.save();
//     res.status(201).json({
//       success:true,
//       status:200,
//       data:user
//     });
//   } catch (err) {
//     res.status(409).json({success:false,status:409, message: err.message });
//   }
// };

export const addUser = async (req, res) => {
  const user = req.body;
  let newUserId
  let company
  if (user.role==="Admin") {
    const now = new Date();
    newUserId= `${now.getFullYear()}${now.getMonth()+1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
    
  } else {
   company = await Company.findById(user.company);
  const companyId = company._id;
  const companyName = company.name;
  const lastUser = await User.findOne({ "company._id": companyId }).sort({ user_id: -1 }).select('user_id');
  const lastUserId = lastUser ? lastUser.user_id : `${companyName.slice(0,2)}00000000`;
   newUserId = `${companyName.slice(0,2)}${(parseInt(lastUserId.slice(2)) + 1).toString().padStart(8, '0')}`;
  }
  const hash = bcrypt.hashSync(user.password, 8);
  const newUser = new User({
    user_id: newUserId,
    username: user.username,
    name: user.name,
    email: user.email,
    password: hash,
    bio: user.bio,
    dateOfBirth: user.dateOfBirth,
    country: user.country,
    gender: user.gender,
    language: user.language,
    phone: user.phone,
    company: user.role==="Admin"? null : company,
    role:user.role 
  });

  try {
    const user = await newUser.save();
    res.status(201).json({
      success:true,
      status:200,
      data:user
    });
  } catch (err) {
    res.status(409).json({success:false,status:409, message: err.message });
  }
};






export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.TOKEN_SECRET
    );

    return res.json({
      status: "ok",
      accessToken: token,
      uid: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    return res.json({ status: "error", accessToken: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    try {
      const hashPass = bcrypt.hashSync(req.body.newPassword, 8);
      user.password = hashPass;
      user.save();
      res.status(200).json({ message: "Password Reset Successfully" });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "Invalid Password" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userEmail = req.query.email
    const userInfo = await User.findOne({ email: userEmail }).populate(
      "company",
      "name -_id"
    );
    res.status(200).json({ status: "ok", user: userInfo });
  } catch (err) {
    res.status(401).json({ message: "user not found" });
  }
};


// get all users with pagintion 
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  try {
    results.results = await User.find().limit(limit).skip(startIndex).exec();
    res.status(200).json({
      success:true,
      status:200,
      page:page,
      limit:limit,
      data:results
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get user by search query 
export const getUserBySearch = async (req, res) => {
  try {
    const user = await User.find({ $text: { $search: req.query.search } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// get users by search query 
export const getUsersBySearch = async (req, res) => {
  try {
    const user = await User.find({ $text: { $search: req.query.search } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


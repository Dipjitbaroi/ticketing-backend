import Company from "../model/company.model.js";

export const addCompany = async (req, res) => {
  const company = req.body;
  const imagePath = req.file ? req.file.path : undefined;

  const newCompany = new Company({
    name: company.name,
    address: company.address,
    email: company.email,
    status: company.status,
    comment: company.comment,
    image: imagePath
  });
  try {
    const company = await newCompany.save();
    res.status(200).json(
      {
        success:true,
        status:200,
        data:company
    }
      );
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


// export const getCompany = async (req, res) => {
//   try {
//     const company = await Company.find();
//     res.status(200).json(
//       {
//         success:true,
//         status:200,
//         data:company
//     }
//       );
//   } catch (error) {
//     res.status(401).json({ message: error.message });
//   }
// }
// get company with pagination by default it will be page 1 and limit 10 if no page or limit is provided on the query 
export const getCompanys = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  try {
    results.results = await Company.find().limit(limit).skip(startIndex).exec();
    res.status(200).json({
      success:true,
      status:200,
      page:page,
      limit:limit,
      data:results
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// get company by search query with pagination 

export const getCompanyBySearch = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  try {
    results.results = await Company.find({ $text: { $search: req.query.search } }).limit(limit).skip(startIndex).exec();
    res.status(200).json({
      success:true,
      status:200,
      page:page,
      limit:limit,
      data:results
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// get company by id

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(
      {
        success:true,
        status:200,
        data:company
    }
      );
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// update company 

export const updateCompany = async (req, res) => {
  const company = req.body;
  const newCompany = new Company({
    name: company.name,
    address: company.address,
    email: company.email,
    status: company.status,
    comment: company.comment,
  });
  try {
    const company = await newCompany.save();
    res.status(200).json(
      {
        success:true,
        status:200,
        data:company
    }
      );
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// delete company

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    res.status(200).json(
      {
        success:true,
        status:200,
        data:company
    }
      );
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

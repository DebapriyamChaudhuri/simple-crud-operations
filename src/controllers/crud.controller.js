const crud = require("../models/crud.model");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const newUser = await crud.create({
      name,
      email,
      password,
      age,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    // query param
    const { search, sort, page = 1, limit = 10 } = req.query;

    // Base query
    let query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Sorting
    let sortOption = {};
    if (sort === "asc") {
      sortOption.createdAt = 1; // Ascending
    } else if (sort === "desc") {
      sortOption.createdAt = -1; // Descending
    } else {
      sortOption.createdAt = -1; // Default to descending
    }

    // Pagination
    const skip = (page - 1) * limit;
    const users = await crud
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));
    const totalUsers = await crud.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      total: totalUsers,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

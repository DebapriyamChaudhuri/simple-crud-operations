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

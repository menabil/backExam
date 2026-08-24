const majs = require("../model/createTodo");

// Create
const createUser = async (req, res) => {
  let { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.send({
      success: false,
      message: "Please Fill Filed",
    });
  }

  const userLogin = await new majs({
    userName: userName,
    email: email,
    password: password,
  });
  userLogin.save();

  res.send({
    success: true,
    message: "Login",
  });
};

// Read
const readUser = async (req, res) => {
  let allRead = await majs.find({});
  res.send({
    success: true,
    message: "All Users",
    data: allRead,
  });
};

// Delete
const deleteUser = async (req, res) => {
  let { id } = req.params;
  let deleteUser = await majs.findByIdAndDelete(id);

  res.send({
    success: true,
    message: "User Deleted",
  });
};

// Update
const updateUser = async (req, res) => {
  let { id } = req.params;
  let updateUser = await majs.findByIdAndUpdate({ _id: id }, req.body);

  res.send({
    success: true,
    message: "User Updated",
  });
};

module.exports = { createUser, readUser, deleteUser, updateUser };

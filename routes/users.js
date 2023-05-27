var express = require("express");
var router = express.Router();

var user = require("../models/user");
var userController = require("../controller/userControllers");

/* đăng kí */
router.post("/register", async (req, res) => {
  const datauser = await user.find({}).select("user_id");
  const check = datauser.some((item) => item.user_id == req.body.user_id);
  console.log(check);
  if (check == true) {
    res.send({
      code: 400,
      data: null,
      message: "Đã tồn tại",
    });
  } else {
    var params = user({
      name: req.body.name,
      user_id: req.body.user_id,
      company_id: req.body.company_id,
      root: req.body.root,
      department_id: req.body.department_id,
      phone: req.body.phone,
      day_of_birth: req.body.day_of_birth,
      password: "123456",
      avatar: req.body.avatar,
      money: req.body.money,
      status: null,
    });
    const data = await userController.addUser(params);
    res.send(
      JSON.stringify({
        code: 200,
        data: null,
        message: "Đăng ký thành công",
      })
    );
  }
});

// đăng nhập
router.post("/login", async (req, res) => {
  const datauser = await user
    .find({})
    .select(
      "status name face_data user_id company_id root department_id phone day_of_birth password avatar money"
    );
  const userfind = datauser.find(
    (item) =>
      item.user_id === req.body.user_id && item.password === req.body.password
  );

  if (!userfind)
    res.send({
      code: 400,
      data: null,
      message: "Thông tin người dùng không chính xác",
    });
  else {
    res.send({
      code: 200,
      data: userfind,
      message: "Đăng nhập thành công",
    });
  }
});

router.get("/test", async (req, res) => {
  res.send({
    code: 400,
    data: null,
    message: "Thông tin người dùng không chính xác",
  });
});

// đổi thong tin
router.post("/changeinfo", async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let body = req.body;
    await userController.updateInfo(user_id, body);
    const data = await userController.getUserById(user_id);
    res.send({
      code: 200,
      data: data,
      message: "thay đổi thành công",
    });
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

// xoá user
router.post("/deleteUser", async (req, res) => {
  try {
    let user_id = req.body.user_id;
    const data = await userController.deleteUser(user_id);
    res.send({
      code: 200,
      data: data,
      message: "xoá thành công",
    });
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

router.post("/getUserList", async (req, res) => {
  try {
    let company_id = req.body.company_id;
    const data = await user
      .find({ company_id: company_id })
      .select(
        " name face_data user_id company_id root department_id phone day_of_birth password avatar"
      );
    res.send({
      code: 200,
      data: data,
      message: "success",
    });
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

router.post("/findUserById", async (req, res) => {
  try {
    let user_id = req.body.user_id;
    const data = await user
      .find({ user_id: user_id })
      .select(
        " name face_data user_id company_id root department_id phone day_of_birth password avatar"
      );
    res.send({
      code: 200,
      data: data,
      message: "success",
    });
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

//đổi phòng ban
router.post("/changeDepartment", async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let body = req.body;
    const data = await userController.updateInfo(user_id, body);
    res.send({
      code: 200,
      data: data,
      message: "thay đổi thành công",
    });
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

//lây danh sách user theo phòng ban
router.post("/getUserByDepartment", async (req, res) => {
  try {
    let department_id = req.body.department_id;
    let company_id = req.body.company_id;
    const data = await userController.getUserByDetpartment(
      department_id,
      company_id
    );
    res.send({
      code: 200,
      data: data,
      message: "success",
    });
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

//đổi mật khẩu
router.post("/ChanePassword", async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let old_password = req.body.old_password;
    let new_password = req.body.new_password;
    let body = {
      password: new_password,
    };
    const user = await userController.getUserById(user_id);
    if (user.length > 0) {
      if (user[0].password == old_password) {
        await userController.updateInfo(user_id, body);
        res.send({
          code: 200,
          data: [],
          message: "Thay đổi thành công",
        });
      } else {
        res.send({
          code: 400,
          data: [],
          message: "Mật khẩu cũ không đúng",
        });
      }
    }
  } catch (error) {
    res.send({
      code: 401,
      message: error,
    });
  }
});

//đổi số dư
router.post("/ChangeMoney", async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let newMoney = req.body.newMoney;
    let body = {
      money: newMoney,
    };
    await userController.updateInfo(user_id, body);
    res.send({
      code: 200,
      data: [],
      message: "Thay đổi thành công",
    });
  } catch (error) {
    res.send({
      code: 401,
      message: error,
    });
  }
});

router.post("/checkPermitions", async (req, res) => {
  try {
    res.send({
      code: 200,
      data: [],
      message: "load thành công",
    });
  } catch (error) {
    res.send({
      code: 401,
      message: error,
    });
  }
});

router.post("/checkStatus", async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let status = req.body.status;
    let body = {
      status: status,
    };
    await userController.updateInfo(user_id, body);
    res.send({
      code: 200,
      data: [],
      message: "Thay đổi thành công",
    });
  } catch (error) {
    res.send({
      code: 401,
      message: error,
    });
  }
});

module.exports = router;

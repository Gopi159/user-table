const User = require("./model");
// var ObjectId = require("mongodb").ObjectID;
const code = require("../../utils/properties");

exports.post = async function (req, res) {
  try {
    const { name, email, phone, address } = req.body;
    const user = new User({
      name,
      email,
      phone,
      address,
    });
    const result = await user.save();
    if (!result || !result._id) {
      res.status(code.SERVER_ERROR).json({
        message: code.USER_RETRIVAL_FAILED,
      });
      return;
    }
    res.status(code.SUCCESS_WITH_CREATED_STATUS).json({
      userId: result._id,
      message: code.ADD_USER_SUCCESS,
    });
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: code.USER_RETRIVAL_FAILED,
    });
  }
};

exports.getAll = function (req, res) {
  try {
    User.aggregate(
      [
        {
          $project: {
            userName: "$name",
            userEmail: "$email",
            userPhone: "$phone",
            userAddress: "$address",
            userId: "$_id",
            addedOn: "$createdAt",
          },
        },
        { $sort: { addedOn: -1 } },
        { $limit: 5 },
      ],
      function (err, users) {
        if (err) {
          res.status(code.SERVER_ERROR).json({
            message: code.USER_RETRIVAL_FAILED,
          });
          return;
        }
        if (users.length == 0) {
          res.status(code.NOT_FOUND_STATUS_).json({
            message: code.USER_NOT_FOUND,
          });
          return;
        }
        res.status(code.SUCCESS_STATUS).json({
          data: users,
        });
      }
    );
  } catch (err) {
    res.status(code.SERVER_ERROR).json({
      message: code.USER_RETRIVAL_FAILED,
    });
  }
};

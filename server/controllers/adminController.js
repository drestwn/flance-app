const { passValidator } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Admin, Employer, User, Category } = require("../models/index");

class AdminController {
  static async registerAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const newAdmin = await Admin.create({ email, password });
      res.status(201).json(newAdmin);
    } catch (err) {
      next(err);
    }
  }

  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const findAdmin = await Admin.findOne({
        where: { email },
      });
      if (!findAdmin) {
        throw { name: "Not Found", message: "Not Registered", code: 404 };
      }
      if (!passValidator(password, findAdmin.password)) {
        throw {
          name: "Forbidden",
          message: "Email or Password is incorrect",
          code: 403,
        };
      }

      const access_token = signToken({
        email: findAdmin.email,
        role: "admin",
        id: findAdmin.id,
      });

      res.status(200).json({
        access_token,
        role: "admin",
        id: findAdmin.id,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateCategory = await Category.update(
        {
          name,
        },
        {
          where: { id },
        }
      );
      res.status(200).json(updateCategory);
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const destroyCategory = await Category.destroy({
        where: { id },
      });
      res.status(200).json({
        message: "category has been deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = AdminController;

import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  login,
  logout
} from "../controllers/UserController.js";

const router = express.Router();

// Endpoint untuk CRUD users
router.post("/login", login);
router.delete("logout", logout);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;

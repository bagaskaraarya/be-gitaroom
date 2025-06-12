import express from "express";
import {
  getGitar,
  createGitar,
  updateGitar,
  getGitarById,
  deleteGitar
} from "../controllers/gitarcontroller.js";

const router = express.Router();

// GET semua kursus
router.get("/gitar", getGitar);

// POST buat kursus baru (Img berupa URL, tanpa multer)
router.post("/gitar", createGitar);

// GET satu kursus by id
router.get("/gitar/:id", getGitarById);

// PUT update kursus
router.put("/gitar/:id", updateGitar);

// DELETE kursus
router.delete("/gitar/:id", deleteGitar);

export default router;
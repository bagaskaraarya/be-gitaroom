import express from "express";
import {
  getGitarDibeli,
  daftarGitar,
  batalBayar,
  updateBayarGitar,
  getAllBayarGitar,
} from "../controllers/bayargitarcontroller.js";
const router = express.Router();

// routes/BayarGitarRoute.js
router.get("/bayargitar", getAllBayarGitar);
// GET semua gitar yang diikuti oleh user tertentu
router.get("/bayargitar/:userId", getGitarDibeli);

// POST daftar gitar baru
router.post("/bayargitar", daftarGitar);

// DELETE batal ikut gitar
router.delete("/bayargitar/:id", batalBayar);
router.put("/bayargitar/:id", updateBayarGitar);
export default router;
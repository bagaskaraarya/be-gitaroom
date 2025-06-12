import Gitar from "../models/gitarmodel.js";

// [GET] Semua Gitar
export const getGitar = async (req, res) => {
  try {
    const response = await Gitar.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error("Get Error:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// [GET] Gitar by ID
export const getGitarById = async (req, res) => {
  try {
    const gitar = await Gitar.findByPk(req.params.id);
    if (!gitar) {
      return res.status(404).json({ message: "Gitar tidak ditemukan" });
    }
    res.json(gitar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [POST] Buat Gitar Baru (Img berupa URL)
export const createGitar = async (req, res) => {
  try {
    const { NamaGitar, LamaPemakaian, harga, Deskripsi, Kategori, Img } = req.body;

    if (!NamaGitar || !LamaPemakaian || !harga || !Kategori) {
      return res.status(400).json({ message: "Field wajib tidak boleh kosong" });
    }

    const gitar = await Gitar.create({
      NamaGitarGitar,
      LamaPemakaian,
      harga,
      Img, // URL gambar langsung
      Deskripsi,
      Kategori,
    });

    res.status(201).json({ message: "Gitar berhasil ditambahkan", gitar });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan gitar", error: err.message });
  }
};

// [PUT] Update Gitar
export const updateGitar = async (req, res) => {
  try {
    const id = req.params.id;
    const gitar = await Gitar.findByPk(id);
    if (!gitar) {
      return res.status(404).json({ msg: "Gitar not found" });
    }

    await gitar.update(req.body);
    res.status(200).json({ msg: "Gitar updated successfully" });
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(400).json({ error: "Failed to update gitar" });
  }
};

// [DELETE] Hapus Gitar
export const deleteGitar = async (req, res) => {
  try {
    const id = req.params.id;
    const gitar = await Gitar.findByPk(id);
    if (!gitar) {
      return res.status(404).json({ msg: "Gitar not found" });
    }

    await gitar.destroy();
    res.status(200).json({ msg: "Gitar deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(400).json({ error: "Failed to delete gitar" });
  }
};
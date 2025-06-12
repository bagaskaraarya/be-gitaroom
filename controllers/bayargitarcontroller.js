import BayarGitar from "../models/bayargitar.js";
import gitar from "../models/gitarmodel.js";
import User from "../models/UserModel.js";


export const getAllBayarGitar = async (req, res) => {
  try {
    // Ambil semua data ikut gitar, bisa sekaligus include relasi User dan Gitar
    const data = await bayarGitar.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: gitar, as: "gitar", attributes: ["id", "NamaGitar", "Deskripsi"] },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil data bayar gitar" });
  }
};

// GET semua gitar yang dibeli user
export const getGitarDibeli = async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await bayarGitar.findAll({
  where: { idUser: userId },
  include: [
    {
      model: gitar,
      as : "gitar",
      attributes: ["id", "NamaGitar", "LamaPemakaian", "harga", "Img", "Deskripsi", "Kategori"],
    },
  ],
});


    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


    // UPDATE data ikut gitar (misal update pembayaran)
export const updateBayarGitar = async (req, res) => {
  try {
    const { id } = req.params; // id record bayargitar yang mau diupdate
    const { pembayaran, idUser, idGitar, status } = req.body; // field yang ingin diupdate

    // Cek dulu data bayargitar berdasarkan id
    const bayarGitar = await BayarGitar.findByPk(id);

    if (!bayarGitar) {
      return res.status(404).json({ msg: "Data bayar gitar tidak ditemukan" });
    }

    // Update fields yang dikirim, kalau ada
    if (pembayaran !== undefined) bayarGitar.pembayaran = pembayaran;
    if (idUser !== undefined) bayarGitar.idUser = idUser;
    if (idGitar !== undefined) bayarGitar.idGitar = idGitar;
    if (status !== undefined) bayarGitar.status = status;
    await bayarGitar.save();

    res.json({ msg: "Data berhasil diupdate", data: bayarGitar });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// POST daftar gitar
export const daftarGitar = async (req, res) => {
  try {
    console.log("BODY:", req.body); // cek apa yang diterima backend
    const { idUser, idGitar, pembayaran,status: gitarStatus } = req.body;

    if (!idUser || !idGitar) {
      return res.status(400).json({ msg: "idUser dan idGitar wajib diisi" });
    }

    const existing = await bayarGitar.findOne({
      where: { idUser, idGitar },
    });

    if (existing) {
      return res.status(400).json({ msg: "Gitar ini sudah dibeli" });
    }

    const newData = await bayarGitar.create({
      idUser,
      idGitar,
      pembayaran: pembayaran || "E-Wallet",
      status: gitarStatus || "Lunas", // tambahkan ini
    });

    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// (Opsional) DELETE hapus transaksi
export const batalBayar = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await bayarGitar.destroy({
      where: { id },
    });

    if (!deleted) return res.status(404).json({ msg: "Data tidak ditemukan" });

    res.json({ msg: "Berhasil dibatalkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
import User from "../models/UserModel.js";

// GET USER
async function getUsers(req, res) {
  try {
    // Lakukan query "SELECT * nama_tabel" ke db, simpan ke dalam variabel "users"
    const users = await User.findAll();

    // Kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users, // <- Data seluruh user
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET USER BY ID
async function getUserById(req, res) {
  try {
    /*
      Lakukan query "SELECT * nama_tabel WHERE id = id" ke db
      id diambil dari parameter dari endpoint.
      Setelah itu, simpan hasil query ke dalam variabel "user"
    */
    const user = await User.findOne({ where: { id: req.params.id } });

    // Cek user yg diambil ada apa engga
    // Kalo user gada, masuk ke catch dengan message "User tidak ditemukan 😮" (400)
    if (!user) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    // Kalo user ada, kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user, // <- Data user yg diambil
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE USER
async function createUser(req, res) {
  try {
    // Anda memiliki field 'name', 'email', 'password', 'alamat' di model Anda.
    // Sesuaikan pengecekan panjang body jika ada field yang opsional.
    // Jika semua field (name, email, password, alamat) wajib, maka Object.keys(req.body).length harus 4.
    // Untuk keamanan, pastikan Anda meng-hash password di sini sebelum menyimpannya ke database.
    // Contoh: const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    // Lalu gunakan 'hashedPassword' saat membuat user.
    if (Object.keys(req.body).length < 4) { // Menyesuaikan dengan 4 kolom (name, email, password, alamat)
      const error = new Error("Field cannot be empty 😠. Ensure name, email, password, and alamat are provided.");
      error.statusCode = 400;
      throw error;
    }

    /*
      Masukkin user ke DB
      Ini sama aja kaya query:
      INSERT INTO nama_tabel (name, email, password, alamat)
      VALUES (name, email, password, alamat);

      Setelah itu, simpan hasil query ke dalam variabel "newUser"
      Hasil query berupa user baru yg telah berhasil dibuat
    */
    // PENTING: Lakukan hashing password di sini sebelum User.create()
    const newUser = await User.create(req.body); // Pastikan req.body.password sudah di-hash!

    // Kalo berhasil ngirim respons sukses (201)
    return res.status(201).json({
      status: "Success",
      message: "User Created",
      data: newUser, // <- Data user baru yg ditambahkan
    });
  } catch (error) {
    // Tangani error unik dari Sequelize, misalnya jika email sudah ada (jika Anda menambahkan unique: true di model)
    if (error.name === 'SequelizeUniqueConstraintError') {
        error.statusCode = 400;
        error.message = "Email already exists! Please use a different email.";
    }
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE USER
async function updateUser(req, res) {
  try {
    // Mengambil semua field dari req.body untuk update, termasuk password dan alamat
    const { name, email, password, alamat } = req.body;

    // Anda memiliki field 'name', 'email', 'password', 'alamat' di model Anda.
    // Sesuaikan pengecekan panjang body jika ada field yang opsional atau jika Anda hanya ingin mengizinkan update sebagian.
    // Jika Anda ingin mengizinkan update sebagian, hapus pengecekan Object.keys(req.body).length.
    // Untuk keamanan, pastikan Anda meng-hash password di sini jika password ikut diupdate.
    if (Object.keys(req.body).length === 0) { // Cek jika body kosong
      const error = new Error("No fields provided for update 😠.");
      error.statusCode = 400;
      throw error;
    }

    // Ngecek apakah id user yg diupdate ada apa ga
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    // Kalo gada, masuk ke catch dengan message "User tidak ditemukan 😮" (400)
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    /*
      Kalo ada, lakukan query update ke db
      Ini sama aja kaya query:
      UPDATE nama_tabel
      SET name = name, email = email, password = password, alamat = alamat
      WHERE id = id

      Keterangan:
      Nilai name, email, password, alamat diambil dari req.body
      id diambil dari parameter dari endpoint.

      Hasil query berupa "row affected" disimpan ke dalam variabel "result"
    */
    // PENTING: Jika req.body.password ada, lakukan hashing password di sini sebelum User.update()
    const result = await User.update(req.body, {
      where: { id: req.params.id },
    });

    /*
      Cek apakah query berhasil atau engga
      Kalo gagal (tidak ada row yg affected), masuk ke catch,
      kasi message "Tidak ada data yang berubah" (400)
    */
    if (result[0] == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    // Kalo berhasil, kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    // Tangani error unik dari Sequelize, misalnya jika email sudah ada (jika Anda menambahkan unique: true di model)
    if (error.name === 'SequelizeUniqueConstraintError') {
        error.statusCode = 400;
        error.message = "Email already exists! Please use a different email.";
    }
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  try {
    // Ngecek apakah id user yg mau di-delete ada apa ga
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    // Kalo gada, masuk ke catch dengan message "User tidak ditemukan 😮" (400)
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    /*
      Kalo ada, lakukan query delete user berdasarkan id ke db
      Ini sama aja kaya DELETE FROM nama_tabel WHERE id = id
      id diambil dari parameter dari endpoint.

      Hasil query berupa row affected disimpan ke dalam variabel "result"
    */
    const result = await User.destroy({ where: { id: req.params.id } });

    /*
      Cek apakah query berhasil atau engga
      Kalo gagal (tidak ada row yg affected), masuk ke catch,
      kasi message "Tidak ada data yang berubah" (400)
    */
    if (result == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    // Kalo berhasil, kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };
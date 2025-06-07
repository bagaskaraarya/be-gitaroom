import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "user"
const User = db.define(
  "users", // Nama Tabel
  {
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
          args: true,
          msg: "Email sudah tersedia. Gunakan Email Lainnya"
      }
    }, 
    password: Sequelize.STRING,
    alamat: Sequelize.STRING
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;

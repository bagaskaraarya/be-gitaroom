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
    gender: Sequelize.STRING,
    role:{
      type: Sequelize.ENUM("penjual", "pembeli"),
      allowNull: false,
    }, 
    password: Sequelize.STRING,
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;

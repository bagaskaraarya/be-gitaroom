import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Membuat tabel "users"
const User = db.define(
  "user", // Nama Tabel
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    gender: Sequelize.STRING,
    password: Sequelize.STRING,
      role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  }
);


db.sync().then(() => console.log("Database synced"));

export default User;
import { Sequelize } from "sequelize";

// Koneksi ke Cloud SQL MySQL instance
const db = new Sequelize("gitaroom", "root", "", {
  host: "localhost",  // IP publik instance Cloud SQL kamu
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true, // Hanya kalau SSL diaktifkan
      rejectUnauthorized: false,
    },
  },
});

export default db;
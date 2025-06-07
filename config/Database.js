import { Sequelize } from "sequelize";

// Koneksi ke Cloud SQL MySQL instance
const db = new Sequelize("gitaroom", "root", "gitaroom123", {
  host: "34.134.254.216",  // IP publik instance Cloud SQL kamu
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true, // Hanya kalau SSL diaktifkan
      rejectUnauthorized: false,
    },
  },
});

export default db;
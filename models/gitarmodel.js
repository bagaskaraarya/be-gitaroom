import { Sequelize } from "sequelize";
import db from "../config/database.js";

const gitar = db.define("gitar", {
  NamaGitar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  LamaPemakaian: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  harga: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Img: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Deskripsi: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  Kategori: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,  // supaya nama tabelnya pas 'kursus'
});

export default gitar;
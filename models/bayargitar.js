import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Tidak perlu import User atau kursus jika tidak pakai references langsung

const BayarGitar = db.define("bayargitar", {
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  idGitar: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  pembayaran: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "E-Wallet",
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Lunas",
  },
}, {
  freezeTableName: true,
});

export default BayarGitar;
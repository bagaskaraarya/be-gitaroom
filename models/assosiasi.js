import User from "./UserModel.js";
import gitar from "./gitarmodel.js";
import bayarGitar from "./bayargitar.js";

// User ↔ IkutKursus
User.hasMany(bayarGitar, { foreignKey: "idUser", constraints:true, as: "user" });
bayarGitar.belongsTo(User, { foreignKey: "idUser", constraints:true, as: "user" });

// Kursus ↔ IkutKursus
gitar.hasMany(bayarGitar, { foreignKey: "idGitar", constraints:true, as: "gitar" });
bayarGitar.belongsTo(gitar, { foreignKey: "idGitar", constraints:true, as: "gitar" });
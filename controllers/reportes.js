const fs = require("fs");
const path = require("path");
const { dbConnection } = require("../database/config");

const { poli } = require("../models/reportes");

const { conviertoJson2CSV, conviertoFecha } = require("../utils/scripts");

const poliSP = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = pool.request().execute(poli);
    const data = (await result).recordsets[0];
    const csv = conviertoJson2CSV(data);
    const cadenaFec = conviertoFecha();
    const archivo = `poli_${cadenaFec}.csv`;
    fs.existsSync(archivo) ? fs.unlinkSync(archivo) : null;
    fs.writeFile(archivo, csv, (err) => {
      if (err) throw "Hubo un error al escribir el archivo";
      console.log(`Se ha escrito el archivo ${archivo}`);
    });
    res.json({ data, archivo });
  } catch (e) {
    console.log(e);
    res.status(500).json("Error");
  }
};

module.exports = { poliSP };

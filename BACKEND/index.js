import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "szd",
  }).promise();

app.get("/tablets", async (req, res) => {
  try {
    const tabs = await db.query("SELECT * FROM tablets");
    const rows = tabs[0];
    const fields = rows[1];
    res.status(200).json(rows);
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.get('/tablets2', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {        
      const countResult = await db.query('SELECT COUNT(*) as total FROM tablets');
      const total = countResult[0][0].total;
      const temp = await db.query('SELECT * FROM tablets LIMIT ? OFFSET ?', [limit, offset]);
      const rows = temp[0];
      res.status(200).json({
          data: rows,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
      console.error(`Error retrieving tablets ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/tablets/:tabletID", async (req, res) => {
  try {
    const tabletID = parseInt(req.params.tabletID, 10);
    if (isNaN(tabletID)) {
      return res.status(400).json({ err: "Invalid ID used for tablet" });
    }
    const [rows, fields] = await db.query(
      "SELECT * FROM tablets WHERE id = ?",
      [tabletID]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ err: `Tablet with ID(${tabletID}) not found` });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

app.post("/tablets", async (req, res) => {
  try {
    let newTablet = [
      req.body.name,
      req.body.ram,
      req.body.processor,
      req.body.storage_space,
      req.body.price,
    ];

    if (newTablet[0].length < 1)
      return res
        .status(400)
        .json({ error: "Product name must have at least 1 character" });
    if (newTablet[1].length < 1)
      return res
        .status(400)
        .json({ error: "RAM must have at least 1 character" });
    if (newTablet[2].length < 1)
      return res
        .status(400)
        .json({ error: "Processor must have at least 1 character" });
    if (isNaN(newTablet[4]) || parseFloat(newTablet[4]) <= 0)
      return res
        .status(400)
        .json({ error: "Price must be a valid number greater than 0" });

    const [rows, fields] = await db.query(
      "INSERT INTO tablets (name, ram, processor, storage_space, price) VALUES(?,?,?,?,?)",
      newTablet
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/tablets/:tabletID", async (req, res) => {
  try {
    let tabletID = parseInt(req.params.tabletID);

    if (isNaN(tabletID) || tabletID <= 0) {
      return req.status(400).json({ error: "Invalid number for tabletID" });
    }

    const [updated] = await db.query("DELETE from tablets WHERE id = ?", [
      tabletID,
    ]);

    if (updated.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `Tablet with tabletID(${tabletID}) not found` });
    } else {
      return res.status(200).json({
        message: `Tablet with tabletID(${tabletID}) has been deleted succesfully`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000);

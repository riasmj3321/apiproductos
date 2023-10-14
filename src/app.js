import express from "express";
import cors from "cors";
import {pool} from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {

    try {
      const result = await pool.query("SELECT * FROM productos");
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "No se encontro el recurso",
        });
      }
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pool.query("SELECT * FROM productos WHERE id = $1", [
        id,
      ]);
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "No se encontro el recurso",
        });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

app.post("/products", async (req, res) => {
    const { name, cost, sale, description, stock, image } = req.body;
    if (typeof name !== "string" || typeof cost !== "number" || typeof sale !== "number" || typeof description !== "string" || typeof stock !== "number" || typeof image !== "string") {
      return res.status(400).json({
        message: "Peticion invalida",
      });
    }
    try {
      const result = await pool.query("INSERT INTO productos(name, cost, sale, description, stock, image) VALUES($1, $2, $3, $4, $5, $6)", [
        name,cost, sale, description, stock, image
      ]);
      res.status(201).json({
        message: "Producto creado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const { name, cost, sale, description, stock, image } = req.body;
    if (typeof name !== "string" || typeof cost !== "number" || typeof sale !== "number" || typeof description !== "string" || typeof stock !== "number" || typeof image !== "string") {
      return res.status(400).json({
        message: "Peticion invalida",
      });
    }

    try {
      const result = await pool.query(
        `UPDATE productos
        SET name = $1,
        cost = $2,
        sale = $3,
        description = $4,
        stock = $5
        image = $6	
        WHERE id = $7;`,
        [name, cost, sale, description, stock, image, id]
      );
      res.json({
        message: "Producto actualizado exitosamente",
        body: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });


app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pool.query("DELETE FROM productos WHERE id = $1", [
        id,
      ]);
      res.json({
        message: "Campo Elimiinado Exitosamente",
        body: result.rows[0],
      });

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "No se encontro el recurso",
        });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
  
  app.use((req, res) => {
    res.status(404).json({
      message: "Recurso no encontrado",
    });
  });

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
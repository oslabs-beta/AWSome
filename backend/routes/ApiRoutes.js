import express from "express";
import client from "../modal.js";

const Awsrouter = express.Router();

// get all monitored AWS metrics
Awsrouter.get("/", async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM aws_metrics");
    res.json(results.rows);
  } catch (err) {
    console.error("Error fetching AWS metrics:", err);
    res.status(500).send("Server error");
  }
});

//Add a new AWS metrics
Awsrouter.post("/", async (req, res) => {
  try {
    const { metrics_name, status } = req.body;
    const result = await client.query(
      "INSERT INTO aws_metrics (metrics_name, status) VALUES ($1, $2) RETURNING *",
      [metrics_name, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting AWS metrics:", err);
    res.status(500).send("Server error");
  }
});

export default Awsrouter;

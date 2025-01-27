import client from "./modal.js"; // Import PostgreSQL client from modal.js
import { awsData } from "./data.js"; // Import the awsData function from data.js

// Function to transform fetched metric data
const transformMetrics = (metricResults) => {
  return metricResults.map((result) => ({
    metricName: result.Id,
    timestamps: result.Timestamps || [],
    values: result.Values || [],
  }));
};

// Function to save the transformed metrics data into PostgreSQL
const saveMetricsToDatabase = async (userId, transformedMetrics) => {
  for (const metric of transformedMetrics) {
    for (let i = 0; i < metric.timestamps.length; i++) {
      const query = `
        INSERT INTO metrics (user_id, metric_name, metric_value)
        VALUES ($1, $2, $3)
      `;
      const values = [
        userId,
        metric.metricName,
        JSON.stringify({
          timestamp: metric.timestamps[i],
          value: metric.values[i],
        }),
      ];
      try {
        await client.query(query, values); // Save each metric entry into PostgreSQL
        console.log(`Metric ${metric.metricName} saved.`);
      } catch (error) {
        console.error("Error inserting data into PostgreSQL:", error);
      }
    }
  }
};

// Function to get userId from email
const getUserIdByEmail = async (email) => {
  const query = `SELECT user_id FROM users WHERE email = $1`;
  const result = await client.query(query, [email]);
  return result.rows[0].user_id;
};

// Orchestrating the full workflow
const Workflow = async () => {
  try {
    const userId = await getUserIdByEmail("user@example.com"); // Get the userId from email
    console.log("User ID:", userId);

    const data = await awsData(); // Fetch data from AWS CloudWatch
    const transformedMetrics = transformMetrics(data.MetricDataResults); // Transform raw metric data

    await saveMetricsToDatabase(userId, transformedMetrics); // Save transformed data into PostgreSQL
  } catch (err) {
    console.error("Error in the workflow:", err);
  }
};

// Start the workflow
Workflow();

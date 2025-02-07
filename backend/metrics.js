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

// Function to save the transformed metrics data into PostgreSQL (using UPSERT)
const saveMetricsToDatabase = async (awsAccountId, transformedMetrics) => {
  for (const metric of transformedMetrics) {
    for (let i = 0; i < metric.timestamps.length; i++) {
      // Call updateMetric to handle insert/update logic
      await updateMetric(
        awsAccountId,
        metric.metricName,
        null, // instanceId (if available, otherwise null)
        metric.values[i],
        metric.timestamps[i],
        "Average", // Stat (you can modify based on data)
        "%", // Unit (you can modify based on data)
        60 // Period (you can modify based on data)
      );
    }
  }
};

// Function to update or insert the metric using UPSERT logic
async function updateMetric(
  awsAccountId,
  metricName,
  instanceId,
  metricValue,
  timestamp,
  stat,
  unit,
  period
) {
  const query = `
    INSERT INTO aws_metrics (aws_account_id, metric_name, instance_id, metric_value, timestamp, stat, unit, period)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (aws_account_id, metric_name, timestamp)
    DO UPDATE
    SET 
        metric_value = $4, 
        stat = $6, 
        unit = $7,
        period = $8;
  `;

  try {
    // Execute the UPSERT query with the provided parameters
    await client.query(query, [
      awsAccountId,
      metricName,
      instanceId,
      metricValue,
      timestamp,
      stat,
      unit,
      period,
    ]);
    console.log("Metric updated successfully");
  } catch (err) {
    console.error("Error updating metric:", err);
  }
}

// Function to get AWS account ID by user email
const getAwsAccountIdByEmail = async (email) => {
  const query = `SELECT aws_account_id FROM aws_accounts WHERE user_id = (SELECT id FROM users WHERE email = $1)`;
  const result = await client.query(query, [email]);
  if (result.rows.length === 0) {
    throw new Error("AWS account not found for the provided email.");
  }
  return result.rows[0].aws_account_id;
};

// Orchestrating the full workflow
const Workflow = async () => {
  try {
    // Get the AWS account ID from the email
    const awsAccountId = await getAwsAccountIdByEmail("salem.moon@icloud.com");
    if (!awsAccountId) {
      throw new Error("No AWS account found for the provided email.");
    }
    console.log("AWS Account ID:", awsAccountId);

    // Fetch the data from AWS CloudWatch
    const data = await awsData();
    console.log("Fetched AWS Data:", data); // Log the raw AWS data to inspect it

    // Check if data.MetricDataResults exists
    if (!data.MetricDataResults) {
      throw new Error("MetricDataResults not found in AWS data.");
    }

    // Transform the data
    const transformedMetrics = transformMetrics(data.MetricDataResults);
    console.log("Transformed Metrics:", transformedMetrics); // Log the transformed metrics

    // Save the transformed metrics into the database
    await saveMetricsToDatabase(awsAccountId, transformedMetrics);
  } catch (err) {
    console.error("Error in the workflow:", err);
  } finally {
    await client.end(); // Close connection after all queries
  }
};

// Call Workflow to initiate the process
Workflow();

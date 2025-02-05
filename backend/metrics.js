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
const saveMetricsToDatabase = async (awsAccountId, transformedMetrics) => {
  for (const metric of transformedMetrics) {
    for (let i = 0; i < metric.timestamps.length; i++) {
      const query = `
        INSERT INTO aws_metrics (aws_account_id, metric_name, metric_value, timestamp)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [
        awsAccountId, // AWS Account ID
        metric.metricName,
        metric.values[i],
        metric.timestamps[i], // Timestamp for the metric value
      ];
      try {
        await client.query(query, values); // Save each metric entry into PostgreSQL
        console.log(
          `Metric ${metric.metricName} saved for AWS account ${awsAccountId}.`
        );
      } catch (error) {
        console.error("Error inserting data into aws_metrics:", error);
      }
    }
  }
};

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
  }  finally {
    await client.end(); // Close connection after all queries
  }
}

// Call Workflow to initiate the process
Workflow();



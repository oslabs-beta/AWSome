import {
  CloudWatchClient,
  GetMetricDataCommand,
} from "@aws-sdk/client-cloudwatch";
import pkg from "pg";
const { Pool } = pkg;


// Create a CloudWatch Client
const client = new CloudWatchClient({
  // eslint-disable-next-line no-undef
  region: process.env.AWS_REGION,
  credentials: {
    // eslint-disable-next-line no-undef
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // eslint-disable-next-line no-undef
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export { client };

export const awsData = async () => {
  const input = {
    MetricDataQueries: [
      {
        Id: "cpuutilization",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "CPUUtilization",
            Dimensions: [
              {
                Name: "InstanceId",
                Value: "i-03dc51c409e900f26",
              },
            ],
          },
          Period: 300,
          Stat: "Average",
          Unit: "Percent",
        },
      },
      {
        Id: "networkin",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "NetworkIn",
            Dimensions: [
              {
                Name: "InstanceId",
                Value: "i-03dc51c409e900f26",
              },
            ],
          },
          Period: 300,
          Stat: "Average",
          Unit: "Bytes",
        },
      },
    ],
    StartTime: new Date("2025-01-18T23:05:00.000Z"),
    EndTime: new Date("2025-01-18T23:30:00.000Z"),
    ScanBy: "TimestampDescending",
    MaxDatapoints: 1000,
  };

  const command = new GetMetricDataCommand(input);
  try {
    const response = await client.send(command);
    console.log("response results:", response.MetricDataResults);

    console.log("Inserting metrics into database...");
    for (const metric of response.MetricDataResults) {
      for (let i = 0; i < metric.Timestamps.length; i++) {
        console.log("Metric:", metric.Id, "Value:", metric.Values[i]); // Debugging output

        const query = `
          INSERT INTO aws_metrics 
          (aws_account_id, metric_name, metric_value, timestamp, service_name, region)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [
          1, // Replace with the actual AWS account ID
          metric.Id,
          metric.Values[i],
          metric.Timestamps[i],
          "EC2",
          "us-east-1",
        ];

        await Pool.query(query, values);
      }
    }
    console.log("Metrics inserted successfully!");
    return response; // Return the response for external use
  } catch (error) {
    console.error("Error inserting metrics:", error);
  }
};

// ✅ Correctly formatted IIFE to execute `awsData()`
(async () => {
  const data = await awsData();
  console.log("Final response:", data);
})();

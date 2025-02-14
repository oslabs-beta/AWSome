import {
  CloudWatchClient, // Used to connect to CloudWatch
  CloudWatchServiceException, // Handles specific errors from CloudWatch
  GetMetricDataCommand, // Sends a request to fetch metric data
} from '@aws-sdk/client-cloudwatch';
import awsCredentialProviders from '@aws-sdk/credential-providers';

const { fromSSO } = awsCredentialProviders;

const credentials = await fromSSO({
  profile: 'AdministratorAccess-913524940612',
});
const client = new CloudWatchClient({
  region: 'us-east-1',
  credentials,
});


import pkg from 'pg';
const { Pool } = pkg;

let response;

export { client };

export const awsData = async () => {
  // Starts the awsData function, marked as async because it handles promises (waiting for AWS data)
  const input = {
    // Input object describes the data we're requesting from CloudWatch
    // GetMetricDataInput
    MetricDataQueries: [
      // A list of all the metrics we want
      // MetricDataQueries // required
      {
        // MetricDataQuery
        Id: 'cpuutilization', // required
        MetricStat: {
          // MetricStat
          Metric: {
            // Metric
            Namespace: 'AWS/EC2',
            MetricName: 'CPUUtilization',
            Dimensions: [
              // Dimensions
              {
                // Dimension
                Name: 'InstanceId', // required
                Value: 'i-03dc51c409e900f26', // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
          Unit: 'Percent',
        }, // Lines 17-38 fetches the CPU usage for the EC2 instance
      }, // Data is averaged over 5 min (period:300 seconds) resulting in a percentage format (Unit:percent)
      {
        // MetricDataQuery
        Id: 'networkin', // required
        MetricStat: {
          // MetricStat
          Metric: {
            // Metric
            Namespace: 'AWS/EC2',
            MetricName: 'NetworkIn',
            Dimensions: [
              // Dimensions
              {
                // Dimension
                Name: 'InstanceId', // required
                Value: 'i-03dc51c409e900f26', // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
          Unit: 'Bytes',
        }, // 41-60 fetching the incoming network traffic (NetworkIn) in Bytes
      },
      {
        // MetricDataQuery
        Id: 'networkout', // required
        MetricStat: {
          // MetricStat
          Metric: {
            // Metric
            Namespace: 'AWS/EC2',
            MetricName: 'NetworkOut',
            Dimensions: [
              // Dimensions
              {
                // Dimension
                Name: 'InstanceId', // required
                Value: 'i-03dc51c409e900f26', // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
          Unit: 'Bytes',
        }, // lines 64-83 fetching the outgoing network traffic (NetworkOut) in Bytes
      },
      {
        // MetricDataQuery
        Id: 'write', // required
        MetricStat: {
          // MetricStat
          Metric: {
            // Metric
            Namespace: 'AWS/EC2',
            MetricName: 'EBSWriteOps',
            Dimensions: [
              // Dimensions
              {
                // Dimension
                Name: 'InstanceId', // required
                Value: 'i-03dc51c409e900f26', // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
          Unit: 'Count',
        }, //lines 87-106 fetches write operations on the instance's disk (EBSWriteOps)
      },
      {
        // MetricDataQuery
        Id: 'read', // required
        MetricStat: {
          // MetricStat
          Metric: {
            // Metric
            Namespace: 'AWS/EC2',
            MetricName: 'EBSReadOps',
            Dimensions: [
              // Dimensions
              {
                // Dimension
                Name: 'InstanceId', // required
                Value: 'i-03dc51c409e900f26', // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
          Unit: 'Count',
        }, //lines 110-129 fetches read operations on the instance's disk (EBSReadOps)
      },
    ],
    StartTime: new Date('2025-01-18T23:05:00.000Z'), // required
    EndTime: new Date('2025-01-18T23:30:00.000Z'), // required
    ScanBy: 'TimestampDescending', // Gets the newest data first
    MaxDatapoints: 1000, // Max Datapoints 100,000
  };

  const command = new GetMetricDataCommand(input); //Creates the request to send to CloudWatch using the input
  try {
    // Sends the request and waits for the response
    response = await client.send(command);
    return response; // logs the metric data and entire response if successful
  } catch (caught) {
    if (caught instanceof CloudWatchServiceException) {
      // if theres a CloudWatch error, it logs the error name and message
      console.error(`Error from CloudWatch. ${caught.name}: ${caught.message}`);
    } else {
      throw caught; // if its a different error, it throws it so it can be handled elsewhere
    }
  }

  console.log('Inserting metrics into database...');
  for (const metric of response.MetricDataResults) {
    for (let i = 0; i < metric.Timestamps.length; i++) {
      // console.log('Metric:', metric.Id, 'Value:', metric.Values[i]); // Debugging output
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
        'EC2',
        'us-east-1',
      ];

      await Pool.query(query, values);
    }
  }
  // console.log('Metrics inserted successfully!');
};

// ✅ Correctly formatted IIFE to execute `awsData()`
// (async () => {
//   const data = await awsData();
//   console.log("Final response:", data);
// })();

export const awsHourData = async () => {
  const input = {
    // GetMetricDataInput
    MetricDataQueries: [
      // MetricDataQueries // required
      {
        // MetricDataQuery
        Id: 'cpuutilization', // required
        MetricStat: {
          // MetricStat
          Metric: {
            // Metric
            Namespace: 'AWS/EC2',
            MetricName: 'CPUUtilization',
            Dimensions: [
              // Dimensions
              {
                // Dimension
                Name: 'InstanceId', // required
                Value: 'i-02b1d8cc57898903d', // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
          Unit: 'Percent',
        }, // Lines 17-38 fetches the CPU usage for the EC2 instance
      }, // Data is averaged over 5 min (period:300 seconds) resulting in a percentage format (Unit:percent)
    ],
    StartTime: new Date('2025-01-27T18:50:00.000Z'), // required
    EndTime: new Date('2025-01-27T19:55:00.000Z'), // required
    ScanBy: 'TimestampAscending', // Gets the oldest data first
    MaxDatapoints: 1000, // Max Datapoints 100,000
  };
  const command = new GetMetricDataCommand(input); //Creates the request to send to CloudWatch using the input
  try {
    // Sends the request and waits for the response
    const response = await client.send(command);
    //console.log('response results', response.MetricDataResults);
    return response.MetricDataResults; // logs the metric data and entire response if successful
  } catch (caught) {
    if (caught instanceof CloudWatchServiceException) {
      // if theres a CloudWatch error, it logs the error name and message
      // console.error(`Error from CloudWatch. ${caught.name}: ${caught.message}`);
    } else {
      console.log('why is it spicy');
      throw caught; // if its a different error, it throws it so it can be handled elsewhere
    }
  }
};

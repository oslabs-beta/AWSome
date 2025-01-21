import {
  CloudWatchServiceException,
  ListMetricsCommand,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { client } from './cloudwatch.js';

// export
const main = async () => {
  // Use the AWS console to see available namespaces and metric names. Custom metrics can also be created.
  // https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/viewing_metrics_with_cloudwatch.html
  const command = new ListMetricsCommand({
    Dimensions: [
      {
        Name: 'InstanceId',
        Value: 'i-03dc51c409e900f26',
      },
    ],
    MetricName: 'CPUUtilization',
    Namespace: 'AWS/EC2',
  });

  try {
    const response = await client.send(command);
    console.log(`Metrics count: ${response.Metrics?.length}`);
    console.log('response', response.Metrics[0]);
    return response;
  } catch (caught) {
    if (caught instanceof CloudWatchServiceException) {
      console.error(`Error from CloudWatch. ${caught.name}: ${caught.message}`);
    } else {
      throw caught;
    }
  }
};

main();

const test = async () => {
  const input = {
    // GetMetricDataInput
    MetricDataQueries: [
      // MetricDataQueries // required
      {
        // MetricDataQuery
        Id: 'tester', // required
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
          Stat: 'Minimum', // required
        },
      },
    ],
    StartTime: new Date('2025-01-18T23:05:00.000Z'), // required
    EndTime: new Date('2025-01-18T23:30:00.000Z'), // required
    ScanBy: 'TimestampDescending',
    // MaxDatapoints: 30,
  };

  const command = new GetMetricDataCommand(input);
  try {
    const response = await client.send(command);
    console.log('response timestamp', response.MetricDataResults[0].Timestamps);
    console.log('response value', response.MetricDataResults[0].Values);
    return response;
  } catch (caught) {
    if (caught instanceof CloudWatchServiceException) {
      console.error(`Error from CloudWatch. ${caught.name}: ${caught.message}`);
    } else {
      throw caught;
    }
  }
};

test();

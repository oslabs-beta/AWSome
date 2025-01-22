import {
  CloudWatchServiceException,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { client } from './cloudwatch.js';

// export
const test = async () => {
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
                Value: 'i-03dc51c409e900f26', // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
          Unit: 'Percent',
        },
      },
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
        },
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
        },
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
        },
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
        },
      },
    ],
    StartTime: new Date('2025-01-18T23:05:00.000Z'), // required
    EndTime: new Date('2025-01-18T23:30:00.000Z'), // required
    ScanBy: 'TimestampDescending',
    MaxDatapoints: 1000,
  };

  const command = new GetMetricDataCommand(input);
  try {
    const response = await client.send(command);
    console.log('response results', response.MetricDataResults);
    console.log('response all', response);
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

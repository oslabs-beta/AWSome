import {
  CloudWatchClient, // Used to connect to CloudWatch
  CloudWatchServiceException, // Handles specific errors from CloudWatch
  GetMetricDataCommand, // Sends a request to fetch metric data
} from '@aws-sdk/client-cloudwatch';

const client = new CloudWatchClient({ region: 'us-east-1' });
let response;
const InstanceId = 'i-0610f2356e0d72fcd';



async function MixedMetrix(metricMap) {
  console.log('in metricmix: ', metricMap);
  const { graph, metric, data } = metricMap;
  const queries = [];

  

  for (let i = 0; i < metric.length; i++) {
    queries.push(
      {
        // MetricDataQuery
        Id: metric[i], // required
        MetricStat: {
          // MetricStat
          Metric: {
            // Metric
            Namespace: 'AWS/EC2',
            MetricName: metric[i],
            Dimensions: [
              // Dimensions
              {
                // Dimension
                Name: 'InstanceId', // required
                Value: InstanceId, // required
              },
            ],
          },
          Period: 300, // required
          Stat: 'Average', // required
        }, // Lines 17-38 fetches the CPU usage for the EC2 instance
      } // Data is averaged over 5 min (period:300 seconds) resulting in a percentage format (Unit:percent)
    );
  }

  const input = {
    // Input object describes the data we're requesting from CloudWatch
    // GetMetricDataInput
    MetricDataQueries: queries,
    StartTime: new Date('2025-01-18T23:05:00.000Z'), // required
    EndTime: new Date('2025-01-18T23:30:00.000Z'), // required
    ScanBy: 'TimestampDescending', // Gets the newest data first
    MaxDatapoints: 1000, // Max Datapoints 100,000
  };

  const command = new GetMetricDataCommand(input); //Creates the request to send to CloudWatch using the input
  try {
    // Sends the request and waits for the response
    response = await client.send(command);

    console.log('response results', response.MetricDataResults);

    return response; // logs the metric data and entire response if successful
  } catch (caught) {
    if (caught instanceof CloudWatchServiceException) {
      // if theres a CloudWatch error, it logs the error name and message
      console.error(`Error from CloudWatch. ${caught.name}: ${caught.message}`);
    } else {
      throw caught; // if its a different error, it throws it so it can be handled elsewhere
    }
  }
}

export default MixedMetrix;

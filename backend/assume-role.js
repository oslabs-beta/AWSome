import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts"; // ES Modules import

const REGION = "us-east-1";

const client = new STSClient({ region: REGION });
const input = { // AssumeRoleRequest
  RoleArn: "arn:aws:iam::536697262297:role/AWSome-help", // required
  RoleSessionName: "test-session-1", // required
  DurationSeconds: 3600,
  ExternalId: "UserJayson",
};

const command = new AssumeRoleCommand(input);

try {
  const response = await client.send(command);
  console.log(response);
} catch (error) {
  console.error(error);
}


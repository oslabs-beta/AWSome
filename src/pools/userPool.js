import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_p9EHXxO94',
  ClientId: '1b5155v1t176k3afcj6ms964l8',
};

export default new CognitoUserPool(poolData);

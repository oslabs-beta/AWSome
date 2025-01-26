import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_W8tC9gZqJ',
  ClientId: '1bh4obipeclarqk5tn7pnc1a21',
};

export default new CognitoUserPool(poolData);

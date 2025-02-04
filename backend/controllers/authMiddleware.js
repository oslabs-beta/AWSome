import jwt from 'jsonwebtoken';
import JwksClient from 'jwks-rsa';

const client = JwksClient({
  jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/${
    import.meta.COGNITO_USER_POOL_ID
  }/.well-known/jwks.json`,
});

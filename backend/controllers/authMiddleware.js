import jwt from 'jsonwebtoken';
import JwksClient from 'jwks-rsa';

const client  = JwksClient({
    jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
})
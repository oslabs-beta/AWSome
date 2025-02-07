import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import dotenv from 'dotenv';
dotenv.config();

//cognito issuer url
const COGNITO_ISSUER = `https://cognito-idp.us-east-1.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;

//this client is configured to fetch public keys (JWT)
const client = jwksClient({
  jwksUri: `${COGNITO_ISSUER}/.well-known/jwks.json`,
});

//function to get signing key 
const getKey = async (header) => {
  try {
    const key = await client.getSigningKey(header.kid);
    return key.getPublicKey();
  } catch (err) {
    console.error('Error retrieving signing key:', err);
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    //grabs the first token (access token) sent in the header otherwise just returns null or undefined 
    const token = req.headers.authorization?.split(' ')[1];

    //if token is nonexisten, return error 
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Access denied. No token provided' });
    }
    //if token is not properly fetched and sent (incorrect token)
    if (token.split('.').length !== 3) {
      return res.status(400).json({ error: 'Malformed JWT token' });
    }

    // Decode the JWT to get the kid (key id)
    const decodedHeader = jwt.decode(token, { complete: true })?.header;

    //if decodedheader exists, grab the key id
    const kid = decodedHeader?.kid;

    //if no key id, return error
    if (!kid) {
      return res
        .status(400)
        .json({ error: 'Invalid token: Missing kid in token header' });
    }

    // Fetch the public key using the kid
    const publicKey = await getKey({ kid });

    // Verify the JWT using the public key
    const decoded = jwt.verify(token, publicKey, { issuer: COGNITO_ISSUER });

    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (err) {
    console.error('Error authenticating token:', err);
    return res.status(403).json({ error: 'Access denied' });
  }
};

export default authenticateToken;

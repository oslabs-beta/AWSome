import pg from "pg";

// Create a PostgreSQL client instance
 const client = new pg.Client({
  user: "AWSome_members", // Your PostgreSQL username
  host: "localhost", // If PostgreSQL is running locally
  database: "aws_monitoring", // The database you created
  password: "AWSomepassword", // Your PostgreSQL user's password
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error("Error connecting to PostgreSQL:", err));




  
export default client; // Export the client instance for use in other modules
const client = require('./modal');

//function to insert metrics data 
const insertMetrics = async (userId, metricData) => {
  const query = 
  `INSERT INTO metrics (user_id, metric_name, metric_value)
VALUES ($1, $2, $3);
`;
const values= [userId, 'CPUUtilization', JSON.stringify(metricData)];

try{
  await client.query(query, values);
console.log('Metrics saved!');
} catch (err) {
  console.error('Error saving metrics:', err);
}
};
module.exports = { insertMetrics };
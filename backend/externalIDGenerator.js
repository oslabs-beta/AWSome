const externalIdGenerator = () => {
  const letters = '1234567890qwertyuiopasdfghjklzxcvbnm';
  let result = '';

  for (let i = 0; i < 10; i++){
    result += letters[Math.floor(Math.random() * 35)];
  }

  return result
};

export default externalIdGenerator;

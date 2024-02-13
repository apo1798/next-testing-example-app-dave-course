import axios from 'axios';

export const TestPage = async () => {
  const res = await axios('/todos');

  console.log(res);
  return <div></div>;
};

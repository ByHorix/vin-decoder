
export const fetchRequest = async (url) => {
  const res = await fetch(`https://vpic.nhtsa.dot.gov/api${url}`);
  const data = await res.json();

  return data;
};


export const login = async (data) => {
  const url = `${process.env.REACT_APP_API_URL}/auth`;

  const result = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
  return result;
};

export const signUp = async(data) => {
  const url = `${process.env.REACT_APP_API_URL}/users`;

  const result = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
  return result;
};

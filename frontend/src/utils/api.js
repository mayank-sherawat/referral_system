const API_URL = "https://referral-system-u766.onrender.com";

export const apiRequest = async (endpoint, method = "GET", body, token) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : null
  });

  return res.json();
};

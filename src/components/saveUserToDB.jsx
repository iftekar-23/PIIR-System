// saveUserToDB.js
import axios from "axios";

export const saveUserToDB = async ({ name, email, photoURL }) => {
  try {
    const res = await axios.post(`http://localhost:3000/users`, {
      name,
      email,
      photoURL,
    });

    return res.data;
  } catch (err) {
    console.error("saveUserToDB error:", err.response?.data || err.message);
    throw err;
  }
};

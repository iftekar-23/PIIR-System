// saveUserToDB.js
import axios from "axios";

export const saveUserToDB = async ({ name, email, photoURL }) => {
  try {
    const res = await axios.post(`https://piir-system-server.vercel.app/users`, {
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

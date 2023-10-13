import success_response from "../utils/success_response.js";
import db from "../database/connection.js";
import bodyParser from "body-parser";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const getUsers = async (req, res) => {
  const user_collection = collection(db, "users");
  const user_snapshot = await getDocs(user_collection);
  const user_list = user_snapshot.docs.map((doc) => doc.data());
  return success_response({ data: user_list });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = {
    id: id,
    name: "abimanyu",
    age: 16,
  };
  return success_response({ data: user });
};

export { getUsers, getUserById };

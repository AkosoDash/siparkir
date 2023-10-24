import success_response from "../utils/success_response.js";
import { error_response } from "../utils/error_response.js";
import User from "../model/user.model.js";
import connection from "../database/connection.js";
import bodyParser from "body-parser";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(connection);

const get_user = async (req, res) => {
  const users = await getDocs(collection(db, "users"));
  const users_array = [];

  if (users.empty) {
    throw new error_response("users not found", 404);
  } else {
    users.forEach((doc) => {
      const user = new User(
        doc.id,
        doc.data().name,
        doc.data().username,
        doc.data().password
      );
      users_array.push(user);
    });
  }

  return success_response({ data: users_array });
};

const get_user_by_id = async (req, res) => {
  const { id } = req.params;
  const user = doc(db, "users", id);
  const data = await getDoc(user);

  if (!data.exists()) {
    throw new error_response("user not found", 404);
  } else {
    const user_found = data.data();
    return success_response({ data: user_found });
  }
};

const change_password = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { old_password, new_password, retype_password } = body;

  const user = doc(db, "users", id);
  const data = await getDoc(user);

  if (!data.exists()) throw new error_response("user not found", 404);

  const update_data = data.data();

  if (old_password !== update_data.password)
    throw new error_response("old password was wrong");

  if (new_password < 8)
    throw new error_response("new password must not be less than 8 letters");

  if (old_password === new_password)
    throw new error_response("new password cant be same as old password");

  if (new_password !== retype_password)
    throw new error_response("retype password not same as new password");

  update_data.password = new_password;

  await updateDoc(user, update_data);
  return success_response({ message: "password changed successfully" });
};

const login_user = async (req, res) => {
  const { username, password } = req.body;
  const usersRef = collection(db, "users");

  // Membuat query untuk mencari pengguna dengan username yang cocok
  const queryGet = query(usersRef, where("username", "==", username));

  const querySnapshot = await getDocs(queryGet);

  if (querySnapshot.empty) {
    throw new error_response("User not found", 404);
  } else {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    if (userData.password === password) {
      return success_response({ data: userData });
    } else {
      throw new error_response("Invalid password");
    }
  }
};

export { get_user, get_user_by_id, change_password, login_user };

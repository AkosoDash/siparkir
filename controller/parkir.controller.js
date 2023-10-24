import success_response from "../utils/success_response.js";
import { error_response } from "../utils/error_response.js";
import LahanParkir from "../model/lahan_parkir.model.js";
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
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const db = getFirestore(connection);

const get_data_parkir_keluar = (req, res) => {};

const get_data_parkir_keluar_by_id = () => {};

const guest_out = () => {};

const guest_in = () => {};

export {
  get_data_parkir_keluar,
  get_data_parkir_keluar_by_id,
  guest_in,
  guest_out,
};

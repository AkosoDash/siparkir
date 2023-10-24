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

const get_lahan_parkir = async (req, res) => {
  const lahan_parkir = await getDocs(collection(db, "lahan_parkir"));
  const lahan_parkir_array = [];

  if (lahan_parkir.empty) {
    throw new error_response("lahan parkir empty", 404);
  } else {
    lahan_parkir.forEach((doc) => {
      const lp = new LahanParkir(
        doc.id,
        doc.data().nama_lahan_parkir,
        doc.data().total_daya_tampung
      );
      lahan_parkir_array.push(lp);
    });
  }

  return success_response({ data: lahan_parkir_array });
};

const get_lahan_parkir_by_id = async (req, res) => {
  const { id } = req.params;
  const lahan_parkir = doc(db, "lahan_parkir", id);
  const data = await getDoc(lahan_parkir);

  if (!data.exists()) {
    throw new error_response("lahan parkir not found", 404);
  } else {
    const lahan_parkir_found = data.data();
    return success_response({ data: lahan_parkir_found });
  }
};

const create_lahan_parkir = async (req, res) => {
  const { nama_lahan_parkir, total_daya_tampung } = req.body;

  if (nama_lahan_parkir === "")
    throw new error_response("nama lahan parkir mustn't be null");
  if (total_daya_tampung === "")
    throw new error_response("total daya tampung mustn't be null");
  if (total_daya_tampung === 0)
    throw new error_response("total daya tampung mustn't be zero");

  if (typeof nama_lahan_parkir != "string")
    throw new error_response("nama lahan parkir must be string");
  if (typeof total_daya_tampung != "number")
    throw new error_response("nama lahan parkir must be number");

  const data = { nama_lahan_parkir, total_daya_tampung };
  await addDoc(collection(db, "lahan_parkir"), data);
  return success_response({ data, message: "lahan_parkir" });
};

const update_lahan_parkir = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { nama_lahan_parkir, total_daya_tampung } = body;

  const lahan_parkir = doc(db, "lahan_parkir", id);
  const data = await getDoc(lahan_parkir);

  if (!data.exists()) throw new error_response("lahan parkir not found", 404);

  const update_data = data.data();

  if (nama_lahan_parkir === "")
    throw new error_response("nama lahan parkir mustn't be null");
  if (total_daya_tampung === "")
    throw new error_response("total daya tampung mustn't be null");
  if (total_daya_tampung === 0)
    throw new error_response("total daya tampung mustn't be zero");

  if (typeof nama_lahan_parkir != "string")
    throw new error_response("nama lahan parkir must be string");
  if (typeof total_daya_tampung != "number")
    throw new error_response("nama lahan parkir must be number");

  update_data.nama_lahan_parkir = nama_lahan_parkir;
  update_data.total_daya_tampung = total_daya_tampung;

  await updateDoc(lahan_parkir, update_data);
  return success_response({ message: "data updated successfully" });
};

const delete_lahan_parkir = async (req, res) => {
  const { id } = req.params;

  const lahan_parkir = doc(db, "lahan_parkir", id);
  const data = await getDoc(lahan_parkir);

  if (!data.exists()) throw new error_response("lahan parkir not found", 404);

  await deleteDoc(doc(db, "lahan_parkir", id));
  return success_response({ message: "product deleted successfully" });
};

export {
  get_lahan_parkir,
  get_lahan_parkir_by_id,
  create_lahan_parkir,
  update_lahan_parkir,
  delete_lahan_parkir,
};

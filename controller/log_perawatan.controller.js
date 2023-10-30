import success_response from "../utils/success_response.js";
import { error_response } from "../utils/error_response.js";
import LogPerawatan from "../model/log_perawatan.model.js";
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

const get_log_perawatan = async (req, res) => {
  const log_perawatan = await getDocs(collection(db, "tb_perawatan"));
  const log_perawatan_array = [];

  if (log_perawatan.empty) {
    throw new error_response("log perawatan empty", 404);
  } else {
    log_perawatan.forEach((doc) => {
      const lp = new LogPerawatan(
        doc.id,
        doc.data().kdPerawatan,
        doc.data().username,
        doc.data().kdAlat,
        doc.data().tanggalPerawatan,
        doc.data().keterangan,
        doc.data().namaPengecek,
        doc.data().linkFotoMaintenance
      );
      log_perawatan_array.push(lp);
    });
  }

  return success_response({ data: log_perawatan_array });
};

const get_log_perawatan_by_id = async (req, res) => {
  const { id } = req.params;
  const log_perawatan = doc(db, "tb_perawatan", id);
  const data = await getDoc(log_perawatan);

  if (!data.exists()) {
    throw new error_response("log perawatan not found", 404);
  } else {
    const log_perawatan_found = data.data();
    return success_response({ data: log_perawatan_found });
  }
};

const create_log_perawatan = async (req, res) => {
  const {
    kdPerawatan,
    username,
    kdAlat,
    tanggalPerawatan,
    keterangan,
    namaPengecek,
    linkFotoMaintenance,
  } = req.body;

  // Membuat referensi dokumen dengan kunci kd_log_perawatan
  const log_perawatan_ref = collection(db, "tb_perawatan");
  const queryGet = query(
    log_perawatan_ref,
    where("kd_log_perawatan", "==", kdPerawatan)
  );
  const querySnapshot = await getDocs(queryGet);

  if (querySnapshot.docs[0])
    throw new error_response("kd_log_perawatan already used", 400);

  if (username === "") throw new error_response("username mustn't be null");
  if (kdAlat === "") throw new error_response("kdAlat mustn't be null");
  if (tanggalPerawatan === "")
    throw new error_response("tanggalPerawatan mustn't be null");
  if (keterangan === "") throw new error_response("keterangan mustn't be null");
  if (namaPengecek === "")
    throw new error_response("namaPengecek mustn't be null");
  if (linkFotoMaintenance === "")
    throw new error_response("linkFotoMaintenance mustn't be null");

  if (typeof username !== "string")
    throw new error_response("username must be a string");
  if (typeof kdAlat !== "string")
    throw new error_response("kdAlat must be a string");
  if (typeof tanggalPerawatan !== "string")
    throw new error_response("tanggalPerawatan must be a string");
  if (typeof keterangan !== "string")
    throw new error_response("keterangan must be a string");
  if (typeof namaPengecek !== "string")
    throw new error_response("namaPengecek must be a string");
  if (typeof linkFotoMaintenance !== "string")
    throw new error_response("linkFotoMaintenance must be a string");

  const data = {
    kdPerawatan,
    username,
    kdAlat,
    tanggalPerawatan,
    keterangan,
    namaPengecek,
    linkFotoMaintenance,
  };
  await addDoc(collection(db, "tb_perawatan"), data);
  return success_response({
    data,
    message: "log_perawatan created successfully",
  });
};

const update_log_perawatan = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { nama_log_perawatan, total_daya_tampung } = body;

  const log_perawatan = doc(db, "tb_perawatan", id);
  const data = await getDoc(log_perawatan);

  if (!data.exists()) throw new error_response("log perawatan not found", 404);

  const update_data = data.data();

  if (nama_log_perawatan === "")
    throw new error_response("nama log perawatan mustn't be null");
  if (total_daya_tampung === "")
    throw new error_response("total daya tampung mustn't be null");
  if (total_daya_tampung === 0)
    throw new error_response("total daya tampung mustn't be zero");

  if (typeof nama_log_perawatan != "string")
    throw new error_response("nama log perawatan must be string");
  if (typeof total_daya_tampung != "number")
    throw new error_response("nama log perawatan must be number");

  update_data.nama_log_perawatan = nama_log_perawatan;
  update_data.total_daya_tampung = total_daya_tampung;

  await updateDoc(log_perawatan, update_data);
  return success_response({ message: "data updated successfully" });
};

const delete_log_perawatan = async (req, res) => {
  const { id } = req.params;

  const log_perawatan = doc(db, "tb_perawatan", id);
  const data = await getDoc(log_perawatan);

  if (!data.exists()) throw new error_response("log perawatan not found", 404);

  await deleteDoc(doc(db, "tb_perawatan", id));
  return success_response({ message: "product deleted successfully" });
};

export {
  get_log_perawatan,
  get_log_perawatan_by_id,
  create_log_perawatan,
  update_log_perawatan,
  delete_log_perawatan,
};

import success_response from "../utils/success_response.js";
import { error_response } from "../utils/error_response.js";
import LogParkir from "../model/log_parkir.model.js";
import LahanParkir from "../model/lahan_parkir.model.js";
import connection from "../database/connection.js";
import { getCurrentDate } from "../utils/get_data.js";
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

const get_data_parkir = async (req, res) => {
  const { kd_lahan_parkir } = req.params;
  const { status } = req.query;
  const log_parkir = collection(db, "log_parkir");
  const query_get =
    status !== undefined
      ? query(
          log_parkir,
          where("kd_lahan_parkir", "==", kd_lahan_parkir),
          where("status", "==", status)
        )
      : query(log_parkir, where("kd_lahan_parkir", "==", kd_lahan_parkir));

  const log_parkir_array = [];

  const query_snapshot = await getDocs(query_get);

  if (query_snapshot.empty) {
    throw new error_response("lahan parkir not found", 404);
  }

  query_snapshot.forEach((doc) => {
    const parkir = new LogParkir(
      doc.id,
      doc.data().kd_lahan_parkir,
      doc.data().tanggal_parkir,
      doc.data().status
    );
    log_parkir_array.push(parkir);
  });

  return success_response({ data: log_parkir_array });
};

const get_data_parkir_by_id = async (req, res) => {
  const { kd_lahan_parkir, id_parkir } = req.params;
  const log_parkir = collection(db, "log_parkir");
  const query_get = query(
    log_parkir,
    where("kd_lahan_parkir", "==", kd_lahan_parkir)
  );

  const log_parkir_array = [];

  const query_snapshot = await getDocs(query_get);

  if (query_snapshot.empty) {
    throw new error_response("lahan parkir not found", 404);
  }

  query_snapshot.forEach((doc) => {
    if (doc.id === id_parkir) {
      const parkir = new LogParkir(
        doc.id,
        doc.data().kd_lahan_parkir,
        doc.data().tanggal_parkir,
        doc.data().status
      );
      log_parkir_array.push(parkir);
    }
  });
  return success_response({ data: log_parkir_array });
};

const guest_in = async (req, res) => {
  const { kd_lahan_parkir } = req.params;
  const lahan_parkir_ref = collection(db, "lahan_parkir");
  const log_data = {
    kd_lahan_parkir: kd_lahan_parkir,
    tanggal_parkir: getCurrentDate(),
    status: "parkir",
  };

  const query_get = query(
    lahan_parkir_ref,
    where("kd_lahan_parkir", "==", kd_lahan_parkir)
  );

  const query_snapshot = await getDocs(query_get);

  if (query_snapshot.empty) {
    throw new error_response("lahan parkir not found", 404);
  }

  const doc_ref = query_snapshot.docs[0].ref;
  const doc_data = query_snapshot.docs[0].data();

  doc_data.total_daya_tampung = doc_data.total_daya_tampung - 1;

  await addDoc(collection(db, "log_parkir"), log_data);
  await updateDoc(doc_ref, doc_data);

  return success_response({
    data: { data: doc_data, data_log: log_data },
    message: "guest in",
  });
};

const guest_out = async (req, res) => {
  const { kd_lahan_parkir } = req.params;
  const lahan_parkir_ref = collection(db, "lahan_parkir");
  const log_data = {
    kd_lahan_parkir: kd_lahan_parkir,
    tanggal_parkir: getCurrentDate(),
    status: "keluar",
  };

  const query_get = query(
    lahan_parkir_ref,
    where("kd_lahan_parkir", "==", kd_lahan_parkir)
  );

  const query_snapshot = await getDocs(query_get);

  if (query_snapshot.empty) {
    throw new error_response("lahan parkir not found", 404);
  }

  const doc_ref = query_snapshot.docs[0].ref;
  const doc_data = query_snapshot.docs[0].data();

  doc_data.total_daya_tampung = doc_data.total_daya_tampung + 1;

  await addDoc(collection(db, "log_parkir"), log_data);
  await updateDoc(doc_ref, doc_data);

  return success_response({
    data: { data: doc_data, data_log: log_data },
    message: "guest out",
  });
};

export { get_data_parkir, get_data_parkir_by_id, guest_in, guest_out };

import success_response from "../utils/success_response.js";
import { error_response } from "../utils/error_response.js";
import AlatIOT from "../model/alat_iot.model.js";
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

const get_alat_iot = async (req, res) => {
  const alat_iot = await getDocs(collection(db, "tb_alatIot"));
  const alat_iot_array = [];

  if (alat_iot.empty) {
    throw new error_response("alat iot empty", 404);
  } else {
    alat_iot.forEach((doc) => {
      const lp = new AlatIOT(
        doc.id,
        doc.data().kdAlat,
        doc.data().kdLahanParkir,
        doc.data().tanggalPasang,
        doc.data().terakhirMaintenance,
        doc.data().jadwalMaintenance,
        doc.data().statusAlat,
        doc.data().namaLahanParkir
      );
      alat_iot_array.push(lp);
    });
  }

  return success_response({ data: alat_iot_array });
};

const get_alat_iot_by_id = async (req, res) => {
  const { id } = req.params;
  const alat_iot = doc(db, "tb_alatIot", id);
  const data = await getDoc(alat_iot);

  if (!data.exists()) {
    throw new error_response("log perawatan not found", 404);
  } else {
    const alat_iot_found = data.data();
    return success_response({ data: alat_iot_found });
  }
};

const create_alat_iot = async (req, res) => {
  const {
    kdAlat,
    kdLahanParkir,
    tanggalPasang,
    terakhirMaintenance,
    jadwalMaintenance,
    statusAlat,
    namaLahanParkir,
  } = req.body;

  // Membuat referensi dokumen dengan kunci kd_alat_iot
  const alat_iot_ref = collection(db, "tb_alatIot");
  const queryGet = query(alat_iot_ref, where("kdAlat", "==", kdAlat));
  const querySnapshot = await getDocs(queryGet);

  if (querySnapshot.docs[0])
    throw new error_response("kdAlat already used", 400);

  if (tanggalPasang === "")
    throw new error_response("tanggalPasang mustn't be null");
  if (terakhirMaintenance === "")
    throw new error_response("terakhirMaintenance mustn't be null");
  if (jadwalMaintenance === "")
    throw new error_response("jadwalMaintenance mustn't be null");
  if (statusAlat === "") throw new error_response("statusAlat mustn't be null");
  if (namaLahanParkir === "")
    throw new error_response("namaLahanParkir mustn't be null");

  if (typeof tanggalPasang !== "string")
    throw new error_response("tanggalPasang must be a string");
  if (typeof terakhirMaintenance !== "string")
    throw new error_response("terakhirMaintenance must be a string");
  if (typeof jadwalMaintenance !== "string")
    throw new error_response("jadwalMaintenance must be a string");
  if (typeof statusAlat !== "string")
    throw new error_response("statusAlat must be a string");
  if (typeof namaLahanParkir !== "string")
    throw new error_response("namaLahanParkir must be a string");

  const data = {
    kdAlat,
    kdLahanParkir,
    tanggalPasang,
    terakhirMaintenance,
    jadwalMaintenance,
    statusAlat,
    namaLahanParkir,
  };
  await addDoc(collection(db, "tb_alatIot"), data);
  return success_response({
    data,
    message: "alat_iot created successfully",
  });
};

const update_alat_iot = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { nama_alat_iot, total_daya_tampung } = body;

  const alat_iot = doc(db, "tb_alatIot", id);
  const data = await getDoc(alat_iot);

  if (!data.exists()) throw new error_response("log perawatan not found", 404);

  const update_data = data.data();

  if (nama_alat_iot === "")
    throw new error_response("nama log perawatan mustn't be null");
  if (total_daya_tampung === "")
    throw new error_response("total daya tampung mustn't be null");
  if (total_daya_tampung === 0)
    throw new error_response("total daya tampung mustn't be zero");

  if (typeof nama_alat_iot != "string")
    throw new error_response("nama log perawatan must be string");
  if (typeof total_daya_tampung != "number")
    throw new error_response("nama log perawatan must be number");

  update_data.nama_alat_iot = nama_alat_iot;
  update_data.total_daya_tampung = total_daya_tampung;

  await updateDoc(alat_iot, update_data);
  return success_response({ message: "data updated successfully" });
};

const delete_alat_iot = async (req, res) => {
  const { id } = req.params;

  const alat_iot = doc(db, "tb_alatIot", id);
  const data = await getDoc(alat_iot);

  if (!data.exists()) throw new error_response("log perawatan not found", 404);

  await deleteDoc(doc(db, "tb_alatIot", id));
  return success_response({ message: "product deleted successfully" });
};

export {
  get_alat_iot,
  get_alat_iot_by_id,
  create_alat_iot,
  update_alat_iot,
  delete_alat_iot,
};

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
  const lahan_parkir = await getDocs(collection(db, "tb_lahanparkir"));
  const lahan_parkir_array = [];

  if (lahan_parkir.empty) {
    throw new error_response("lahan parkir empty", 404);
  } else {
    lahan_parkir.forEach((doc) => {
      const lp = new LahanParkir(
        doc.id,
        doc.data().kdLahanParkir,
        doc.data().namaLahanParkir,
        doc.data().totalDayaTampung,
        doc.data().sisaTotalDayaTampung
      );
      lahan_parkir_array.push(lp);
    });
  }

  return success_response({ data: lahan_parkir_array });
};

const get_lahan_parkir_by_id = async (req, res) => {
  const { id } = req.params;
  const lahan_parkir = doc(db, "tb_lahanparkir", id);
  const data = await getDoc(lahan_parkir);

  if (!data.exists()) {
    throw new error_response("lahan parkir not found", 404);
  } else {
    const lahan_parkir_found = data.data();
    return success_response({ data: lahan_parkir_found });
  }
};

const create_lahan_parkir = async (req, res) => {
  const {
    kdLahanParkir,
    namaLahanParkir,
    totalDayaTampung,
    sisaTotalDayaTampung,
  } = req.body;

  // Membuat referensi dokumen dengan kunci kdLahanParkir
  const lahan_parkir_ref = collection(db, "tb_lahanparkir");
  const queryGet = query(
    lahan_parkir_ref,
    where("kdLahanParkir", "==", kdLahanParkir)
  );
  const querySnapshot = await getDocs(queryGet);

  if (querySnapshot.docs[0])
    throw new error_response("kdLahanParkir already used", 400);

  if (namaLahanParkir === "")
    throw new error_response("nama lahan parkir mustn't be null");
  if (totalDayaTampung === "")
    throw new error_response("total daya tampung mustn't be null");
  if (totalDayaTampung === 0)
    throw new error_response("total daya tampung mustn't be zero");

  if (typeof namaLahanParkir !== "string")
    throw new error_response("nama lahan parkir must be a string");
  if (typeof totalDayaTampung !== "number")
    throw new error_response("total daya tampung must be a number");

  const data = {
    kdLahanParkir,
    namaLahanParkir,
    totalDayaTampung,
    sisaTotalDayaTampung,
  };
  await addDoc(collection(db, "tb_lahanparkir"), data);
  return success_response({
    data,
    message: "lahan_parkir created successfully",
  });
};

const update_lahan_parkir = async (req, res) => {
  const { params, body } = req;
  const { id } = params;
  const { namaLahanParkir, totalDayaTampung } = body;

  const lahan_parkir = doc(db, "tb_lahanparkir", id);
  const data = await getDoc(lahan_parkir);

  if (!data.exists()) throw new error_response("lahan parkir not found", 404);

  const update_data = data.data();

  if (namaLahanParkir === "")
    throw new error_response("nama lahan parkir mustn't be null");
  if (totalDayaTampung === "")
    throw new error_response("total daya tampung mustn't be null");
  if (totalDayaTampung === 0)
    throw new error_response("total daya tampung mustn't be zero");

  if (typeof namaLahanParkir != "string")
    throw new error_response("nama lahan parkir must be string");
  if (typeof totalDayaTampung != "number")
    throw new error_response("nama lahan parkir must be number");

  update_data.namaLahanParkir = namaLahanParkir;
  update_data.totalDayaTampung = totalDayaTampung;

  await updateDoc(lahan_parkir, update_data);
  return success_response({ message: "data updated successfully" });
};

const delete_lahan_parkir = async (req, res) => {
  const { id } = req.params;

  const lahan_parkir = doc(db, "tb_lahanparkir", id);
  const data = await getDoc(lahan_parkir);

  if (!data.exists()) throw new error_response("lahan parkir not found", 404);

  await deleteDoc(doc(db, "tb_lahanparkir", id));
  return success_response({ message: "product deleted successfully" });
};

export {
  get_lahan_parkir,
  get_lahan_parkir_by_id,
  create_lahan_parkir,
  update_lahan_parkir,
  delete_lahan_parkir,
};

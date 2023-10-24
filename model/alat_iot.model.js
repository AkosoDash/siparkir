class AlatIOT {
  constructor(
    id,
    kd_lahan_parkir,
    tanggal_pasang,
    terakhir_maintenance,
    jadwal_maintenance,
    status_alat,
    nama_lahan_parkir
  ) {
    (this.id = id),
      (this.kd_lahan_parkir = kd_lahan_parkir),
      (this.tanggal_pasang = tanggal_pasang),
      (this.terakhir_maintenance = terakhir_maintenance),
      (this.jadwal_maintenance = jadwal_maintenance),
      (this.status_alat = status_alat),
      (this.nama_lahan_parkir = nama_lahan_parkir);
  }
}

export default AlatIOT;

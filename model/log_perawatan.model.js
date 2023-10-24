class LogPerawatan {
  constructor(
    id,
    username,
    kd_alat,
    tanggal_perawatan,
    keterangan,
    nama_pengecek
  ) {
    (this.id = id),
      (this.username = username),
      (this.kd_alat = kd_alat),
      (this.tanggal_perawatan = tanggal_perawatan),
      (this.keterangan = keterangan),
      (this.nama_pengecek = nama_pengecek);
  }
}

export default LogPerawatan;

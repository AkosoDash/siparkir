class LogPerawatan {
  constructor(
    id,
    kdPerawatan,
    username,
    kdAlat,
    tanggalPerawatan,
    keterangan,
    namaPengecek,
    linkFotoMaintenance
  ) {
    (this.id = id),
      (this.kdPerawatan = kdPerawatan),
      (this.username = username),
      (this.kdAlat = kdAlat),
      (this.tanggalPerawatan = tanggalPerawatan),
      (this.keterangan = keterangan),
      (this.namaPengecek = namaPengecek),
      (this.linkFotoMaintenance = linkFotoMaintenance);
  }
}

export default LogPerawatan;

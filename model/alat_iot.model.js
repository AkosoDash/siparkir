class AlatIOT {
  constructor(
    id,
    kdAlat,
    kdLahanParkir,
    tanggalPasang,
    terakhirMaintenance,
    jadwalMaintenance,
    statusAlat,
    namaLahanParkir
  ) {
    (this.id = id),
      (this.kdAlat = kdAlat),
      (this.kdLahanParkir = kdLahanParkir),
      (this.tanggalPasang = tanggalPasang),
      (this.terakhirMaintenance = terakhirMaintenance),
      (this.jadwalMaintenance = jadwalMaintenance),
      (this.statusAlat = statusAlat),
      (this.namaLahanParkir = namaLahanParkir);
  }
}

export default AlatIOT;

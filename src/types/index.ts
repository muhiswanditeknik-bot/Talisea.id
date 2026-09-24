export type SeaweedType = 'Eucheuma Cottonii' | 'Eucheuma Spinosum' | 'Gracilaria' | 'Sargassum' | 'Halymenia';

export type QualityGrade = 'Super (KA <34%)' | 'Grade A (KA 35-37%)' | 'Grade B (KA 38-40%)' | 'Grade C (KA >40% / Jemur Ulang)';

export type BatchStatus = 
  | 'terdaftar'           // Petani baru input panen
  | 'dijemput_hub'        // Armada Hub jemput di bentangan / lokasi jemur
  | 'qc_timbang_selesai'  // Selesai timbang digital & moisture test di Hub
  | 'tersimpan_hub'       // Konsolidasi dalam gudang Hub Petani
  | 'loading_kapal'       // Muat di Pelabuhan Tunon Taka Petani
  | 'pelayaran_midmile'   // Dalam pelayaran laut ke Sulsel
  | 'tiba_pelabuhan_tujuan'// Tiba di Pelabuhan Parepare / Makassar
  | 'trucking_lastmile'   // Diantar trucking ke Pabrik
  | 'qc_pabrik_selesai'   // QC penerimaan pabrik selesai
  | 'lunas_selesai';      // Pembayaran tahap 2 cair penuh

export interface SeaweedBatch {
  id: string;
  batchNumber: string;
  petaniName: string;
  petaniPhone: string;
  lokasiTali: string; // e.g. 'Mamolo, Sentra Petani'
  jumlahBentangan: number;
  jenisRumputLaut: SeaweedType;
  tanggalPanen: string;
  tanggalMasukHub?: string;
  beratBasahKg?: number;
  beratKeringKg: number;
  kadarAirPersen: number; // e.g. 35.5%
  impuritasPersen: number; // e.g. 2.1%
  grade: QualityGrade;
  hargaPerKg: number;
  totalNilai: number;
  payoutTahap1: number; // 85%
  payoutTahap2: number; // 15%
  statusTahap1: 'pending' | 'terbayar';
  statusTahap2: 'pending' | 'terbayar';
  hubLokasi: string;
  hubInspector: string;
  nomorResiKargo?: string;
  tujuanPabrik: string;
  status: BatchStatus;
  catatan?: string;
  fotoDokumentasi?: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  jenis: SeaweedType;
  asal: string;
  stokKg: number;
  minOrderKg: number;
  hargaPerKg: number;
  kadarAir: number;
  impuritas: number;
  grade: QualityGrade;
  hubAsal: string;
  supplier: string;
  rating: number;
  terjualKg: number;
  tags: string[];
  imageUrl: string;
  deskripsi: string;
  sertifikasi: string[];
}

export interface FactoryDemand {
  id: string;
  factoryName: string;
  lokasi: string; // e.g. 'Kawasan Pabrik, Sulawesi Selatan'
  kebutuhanJenis: SeaweedType;
  volumeTargetKg: number;
  volumeTerkumpulKg: number;
  maxKadarAir: number;
  hargaBeliPerKg: number;
  deadline: string;
  status: 'aktif' | 'terpenuhi' | 'proses_kargo';
  kontrakId: string;
}

export interface LogisticsRoute {
  id: string;
  namaKapal: string;
  nomorKontainer: string;
  asal: string; // Petani
  transit: string; // Tarakan / Parepare
  tujuan: string; // Gudang Pabrik
  totalMuatanKg: number;
  etd: string;
  eta: string;
  currentStep: number; // 1 to 5
  statusLabel: string;
  koordinatSaatIni: string;
  suhuKelembaban: string;
}

export interface PilotKPI {
  selisihHargaPetani: string; // +22%
  biayaLogistikKg: string; // Rp 1.450 / kg
  kecepatanPayout: string; // < 4 Jam (vs 14-21 hari trad)
  akurasiQCDiscrepancy: string; // < 1.2% deviasi
  onTimeDelivery: string; // 98.4%
  petaniTergabung: number;
  totalVolumePilotTon: number;
}

export interface FactoryPriceOffer {
  id: string;
  factoryName: string;
  region: string; // e.g. 'Sulawesi Selatan', 'Jawa Timur', 'Jawa Tengah & Barat', 'Bali & Nusa Tenggara', 'Kalimantan'
  city: string; // e.g. 'Kawasan Pabrik', 'Makassar', 'Surabaya', 'Pasuruan', 'Cirebon', 'Denpasar'
  seaweedType: SeaweedType;
  gradeRequirement: QualityGrade;
  maxMoisturePercent: number;
  buyingPricePerKg: number; // Franco Pabrik
  previousPricePerKg: number;
  minVolumeTon: number;
  maxVolumeTon: number;
  paymentTerm: string;
  verifiedFactory: boolean;
  lastUpdated: string;
  priceTrend: 'up' | 'down' | 'stable';
  priceChangeAmount: number;
  picContact: string;
  notes?: string;
  status: 'active' | 'quota_full' | 'paused';
}

export interface FarmerOriginRegion {
  id: string;
  regionName: string;
  province: string;
  island: string;
  hubCenter: string;
  localTraderBasePrice: Record<SeaweedType, number>; // Harga tengkulak lokal konvensional
  hubBasePriceBeforeShipping: Record<SeaweedType, number>; // Harga acuan hub sebelum estimasi ongkir
  firstMileCostPerKg: number; // Ongkos jemput bentangan/lokasi jemur ke hub
  hubHandlingCostPerKg: number; // Timbang digital, QC, pengarungan standar 50kg
  activeFarmersCount: number;
}

export interface RegionalShippingRouteCost {
  id: string;
  originId: string;
  destinationFactoryId: string;
  seaFreightPerKg: number; // Ongkir kapal laut / tol laut per kg
  portHandlingPerKg: number; // THC & buruh pelabuhan
  truckingLastMilePerKg: number; // Trucking pelabuhan bongkar ke gerbang pabrik
  quarantineInsurancePerKg: number; // Karantina resmi + asuransi kargo
  transitDays: number;
  transportMode: 'Kapal Laut + Trucking' | 'Darat / Trucking Langsung' | 'Ferry Roro + Trucking';
  routeNotes: string;
}


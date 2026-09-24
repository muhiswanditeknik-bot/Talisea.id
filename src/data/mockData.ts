import { SeaweedBatch, MarketplaceProduct, FactoryDemand, LogisticsRoute, PilotKPI, FactoryPriceOffer, FarmerOriginRegion, RegionalShippingRouteCost } from '../types';

export const INITIAL_BATCHES: SeaweedBatch[] = [
  {
    id: 'BAT-NNK-2026-001',
    batchNumber: 'TAL-SRC-0826-01',
    petaniName: 'Pak Baharuddin (Ketua Kelompok Tani)',
    petaniPhone: '+6281245678901',
    lokasiTali: 'Kawasan Bentangan Pesisir Sektor A',
    jumlahBentangan: 120,
    jenisRumputLaut: 'Eucheuma Cottonii',
    tanggalPanen: '2026-08-20',
    tanggalMasukHub: '2026-08-21',
    beratBasahKg: 9200,
    beratKeringKg: 1450,
    kadarAirPersen: 34.8,
    impuritasPersen: 1.8,
    grade: 'Super (KA <34%)',
    hargaPerKg: 19500,
    totalNilai: 28275000,
    payoutTahap1: 22620000, // 80%
    payoutTahap2: 5655000,  // 20%
    statusTahap1: 'terbayar',
    statusTahap2: 'pending',
    hubLokasi: 'Hub Agregasi Sentra Hulu Pesisir',
    hubInspector: 'Ilyas R. (Certified QC Officer)',
    nomorResiKargo: 'EXP-SEA-TRK-7721',
    tujuanPabrik: 'PT Celebes Seaweed Industries (Pabrik Hilir)',
    status: 'pelayaran_midmile',
    catatan: 'Kering matahari optimal 3 hari, kristal garam minim, aroma laut segar tanpa lumpur.',
    fotoDokumentasi: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BAT-NNK-2026-002',
    batchNumber: 'TAL-SRC-0826-02',
    petaniName: 'Dg. Mangngitung',
    petaniPhone: '+6285298877112',
    lokasiTali: 'Kawasan Bentangan Pesisir Sektor B',
    jumlahBentangan: 180,
    jenisRumputLaut: 'Eucheuma Cottonii',
    tanggalPanen: '2026-08-22',
    tanggalMasukHub: '2026-08-23',
    beratBasahKg: 14000,
    beratKeringKg: 2180,
    kadarAirPersen: 36.2,
    impuritasPersen: 2.3,
    grade: 'Grade A (KA 35-37%)',
    hargaPerKg: 18800,
    totalNilai: 40984000,
    payoutTahap1: 34836400,
    payoutTahap2: 6147600,
    statusTahap1: 'terbayar',
    statusTahap2: 'pending',
    hubLokasi: 'Hub Agregasi Sentra Hulu Pesisir',
    hubInspector: 'Ilyas R. (Certified QC Officer)',
    nomorResiKargo: 'EXP-SEA-TRK-7721',
    tujuanPabrik: 'PT Biota Laut Nusantara (Pabrik Pengolah)',
    status: 'loading_kapal',
    catatan: 'Sortir tali nilon bersih, pengarungan karung dobel 50kg standar industri.',
    fotoDokumentasi: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BAT-NNK-2026-003',
    batchNumber: 'TAL-SRC-0826-03',
    petaniName: 'H. Rusli Sanusi',
    petaniPhone: '+6281399881234',
    lokasiTali: 'Kawasan Bentangan Pulau Pesisir Timur',
    jumlahBentangan: 95,
    jenisRumputLaut: 'Eucheuma Spinosum',
    tanggalPanen: '2026-08-23',
    tanggalMasukHub: '2026-08-24',
    beratBasahKg: 6500,
    beratKeringKg: 980,
    kadarAirPersen: 35.0,
    impuritasPersen: 1.5,
    grade: 'Grade A (KA 35-37%)',
    hargaPerKg: 14200,
    totalNilai: 13916000,
    payoutTahap1: 11828600,
    payoutTahap2: 2087400,
    statusTahap1: 'terbayar',
    statusTahap2: 'pending',
    hubLokasi: 'Sub-Hub Konsolidasi Pulau Pesisir',
    hubInspector: 'Rahmat D. (Field Coordinator)',
    nomorResiKargo: 'EXP-SEA-TRK-7730',
    tujuanPabrik: 'PT Nusantara Agar Ekspor Mandiri (Pabrik Hilir)',
    status: 'tersimpan_hub',
    catatan: 'Spinosum kualitas eksport, kadar carrageenan tinggi.',
    fotoDokumentasi: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BAT-NNK-2026-004',
    batchNumber: 'TAL-SRC-0826-04',
    petaniName: 'Sudirman K.',
    petaniPhone: '+628114455667',
    lokasiTali: 'Kawasan Bentangan Pesisir Sektor C',
    jumlahBentangan: 60,
    jenisRumputLaut: 'Eucheuma Cottonii',
    tanggalPanen: '2026-08-24',
    tanggalMasukHub: '2026-08-25',
    beratBasahKg: 4200,
    beratKeringKg: 650,
    kadarAirPersen: 37.8,
    impuritasPersen: 2.8,
    grade: 'Grade B (KA 38-40%)',
    hargaPerKg: 17500,
    totalNilai: 11375000,
    payoutTahap1: 9668750,
    payoutTahap2: 1706250,
    statusTahap1: 'pending',
    statusTahap2: 'pending',
    hubLokasi: 'Hub Agregasi Sentra Hulu Pesisir',
    hubInspector: 'Ilyas R. (Certified QC Officer)',
    nomorResiKargo: 'DRAFT',
    tujuanPabrik: 'PT Celebes Seaweed Industries (Pabrik Hilir)',
    status: 'qc_timbang_selesai',
    catatan: 'Menunggu konfirmasi deposit escrow pabrik untuk pencairan tahap 1.',
    fotoDokumentasi: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'BAT-NNK-2026-005',
    batchNumber: 'TAL-SRC-0826-05',
    petaniName: 'Umar Bakri',
    petaniPhone: '+6282190001212',
    lokasiTali: 'Kawasan Bentangan Pesisir Sektor D',
    jumlahBentangan: 80,
    jenisRumputLaut: 'Eucheuma Cottonii',
    tanggalPanen: '2026-08-25',
    beratBasahKg: 5800,
    beratKeringKg: 890,
    kadarAirPersen: 35.1,
    impuritasPersen: 1.9,
    grade: 'Grade A (KA 35-37%)',
    hargaPerKg: 18800,
    totalNilai: 16732000,
    payoutTahap1: 14222200,
    payoutTahap2: 2509800,
    statusTahap1: 'pending',
    statusTahap2: 'pending',
    hubLokasi: 'Hub Agregasi Sentra Hulu Pesisir',
    hubInspector: 'Menunggu Penjemputan',
    nomorResiKargo: '-',
    tujuanPabrik: 'Menunggu Smart Matching',
    status: 'dijemput_hub',
    catatan: 'Armada pickup darat pick-up dijadwalkan pukul 14:00 WITA.',
    fotoDokumentasi: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80'
  }
];

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'PROD-01',
    title: 'Eucheuma Cottonii Kering Premium - Batch Konsolidasi Sentra Hulu',
    jenis: 'Eucheuma Cottonii',
    asal: 'Sentra Budidaya Pesisir (First-Mile Origin)',
    stokKg: 18500,
    minOrderKg: 1000,
    hargaPerKg: 19800,
    kadarAir: 34.5,
    impuritas: 1.8,
    grade: 'Super (KA <34%)',
    hubAsal: 'Hub Konsolidasi Sentra Hulu & Port Logistik',
    supplier: 'Koperasi Sentra Petani Tali Laut Mandiri',
    rating: 4.9,
    terjualKg: 84000,
    tags: ['Kadar Air Rendah', 'Bersih Garam', 'Siap Kargo Roro', 'Escrow Aman'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Rumput laut jenis Cottonii hasil budidaya bentangan tali perairan jernih pesisir. Kadar air terukur moisture meter digital rata-rata 34.5%, impuritas dibawah 2%. Sangat ideal untuk industri semi-refined carrageenan (SRC) dan refined carrageenan (RC).',
    sertifikasi: ['QC Talisea.id Certified', 'Uji Lab Kadar Garam', 'Sertifikat Karantina']
  },
  {
    id: 'PROD-02',
    title: 'Eucheuma Cottonii Standard Industri (Grade A)',
    jenis: 'Eucheuma Cottonii',
    asal: 'Sentra Produksi Pesisir Terpadu',
    stokKg: 24000,
    minOrderKg: 2000,
    hargaPerKg: 18900,
    kadarAir: 36.2,
    impuritas: 2.2,
    grade: 'Grade A (KA 35-37%)',
    hubAsal: 'Hub Posko Agregator Sentra Pesisir',
    supplier: 'Gabungan Kelompok Petani Tali Mandiri',
    rating: 4.8,
    terjualKg: 120000,
    tags: ['Volume Kontainer', 'Kemasan Karung 50kg', 'Harga Pabrik'],
    imageUrl: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Pasokan reguler grade industri pabrik olahan carrageenan & agar hilir. Penjemuran sinar matahari 3-4 hari, warna cerah kekuningan/cokelat alami.',
    sertifikasi: ['QC Talisea.id Certified', 'Faktur Digital']
  },
  {
    id: 'PROD-03',
    title: 'Eucheuma Spinosum Organik Kualitas Ekspor',
    jenis: 'Eucheuma Spinosum',
    asal: 'Sentra Kepulauan Pesisir Timur',
    stokKg: 9500,
    minOrderKg: 500,
    hargaPerKg: 14500,
    kadarAir: 35.0,
    impuritas: 1.5,
    grade: 'Grade A (KA 35-37%)',
    hubAsal: 'Sub-Hub Konsolidasi Pulau Pesisir',
    supplier: 'Sentra Rumput Laut Terpadu',
    rating: 4.9,
    terjualKg: 32000,
    tags: ['Kadar Iota Tinggi', 'Aroma Bersih', 'Bebas Sampah'],
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Spinosum kaya kandungan Iota-carrageenan yang elastis dan kenyal. Cocok untuk industri farmasi, kosmetik, pangan jelly, dan stabilisator susu.',
    sertifikasi: ['QC Talisea.id Certified', 'Traceability QR']
  },
  {
    id: 'PROD-04',
    title: 'Gracilaria Tambak Budidaya Pesisir Super',
    jenis: 'Gracilaria',
    asal: 'Sentra Budidaya Tambak Pesisir',
    stokKg: 12000,
    minOrderKg: 1000,
    hargaPerKg: 12500,
    kadarAir: 37.0,
    impuritas: 2.5,
    grade: 'Grade A (KA 35-37%)',
    hubAsal: 'Hub Logistik Transit Terpadu',
    supplier: 'Mitra Tani Gracilaria Lestari',
    rating: 4.7,
    terjualKg: 45000,
    tags: ['Kaya Agar-Agar', 'Batang Panjang', 'Kering Merata'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Bahan baku utama industri bubuk agar-agar (agar powder) food grade dan kertas bioplastik ramah lingkungan.',
    sertifikasi: ['QC Talisea.id Certified']
  }
];

export const FACTORY_DEMANDS: FactoryDemand[] = [
  {
    id: 'DEM-01',
    factoryName: 'PT Celebes Seaweed Industries (Pabrik Hilir)',
    lokasi: 'Kawasan Industri Pengolahan Hilir (Industrial Processing Estate)',
    kebutuhanJenis: 'Eucheuma Cottonii',
    volumeTargetKg: 50000,
    volumeTerkumpulKg: 34500,
    maxKadarAir: 36.0,
    hargaBeliPerKg: 20200,
    deadline: '2026-09-05',
    status: 'aktif',
    kontrakId: 'CTR-OFFTAKER-2026-088'
  },
  {
    id: 'DEM-02',
    factoryName: 'PT Biota Laut Nusantara (Pabrik Pengolah)',
    lokasi: 'Kawasan Koridor Pelabuhan Industri Hilir',
    kebutuhanJenis: 'Eucheuma Cottonii',
    volumeTargetKg: 30000,
    volumeTerkumpulKg: 28000,
    maxKadarAir: 37.0,
    hargaBeliPerKg: 19500,
    deadline: '2026-08-30',
    status: 'proses_kargo',
    kontrakId: 'CTR-OFFTAKER-2026-092'
  },
  {
    id: 'DEM-03',
    factoryName: 'PT Nusantara Agar Ekspor Mandiri (Pabrik Hilir)',
    lokasi: 'Kawasan Kawasan Industri Agro-Marine Terpadu',
    kebutuhanJenis: 'Eucheuma Spinosum',
    volumeTargetKg: 20000,
    volumeTerkumpulKg: 12500,
    maxKadarAir: 35.0,
    hargaBeliPerKg: 15200,
    deadline: '2026-09-12',
    status: 'aktif',
    kontrakId: 'CTR-OFFTAKER-2026-095'
  }
];

export const ACTIVE_LOGISTICS_ROUTES: LogisticsRoute[] = [
  {
    id: 'ROUTE-001',
    namaKapal: 'KM Kargo Nusantara 09 (Armada Tol Laut Reguler)',
    nomorKontainer: 'TALI-CONT-88421',
    asal: 'Hub Agregasi Sentra Hulu & Port Logistik',
    transit: 'Pelabuhan Bongkar Transit Antarpulau',
    tujuan: 'Gudang Pabrik Pengolahan Hilir (Industrial Processing Plant)',
    totalMuatanKg: 18500,
    etd: '24 Agt 2026, 16:00 WITA',
    eta: '27 Agt 2026, 09:00 WITA',
    currentStep: 3,
    statusLabel: 'Pelayaran Mid-Mile Antarpulau (Selat Makassar, Koridor Laut)',
    koordinatSaatIni: '2°15\'22"S 118°42\'10"E',
    suhuKelembaban: '28°C / Kelembaban Kontainer 68% (Kering Normal)'
  },
  {
    id: 'ROUTE-002',
    namaKapal: 'KM Ekspres Pasifik Samudera',
    nomorKontainer: 'TALI-CONT-99104',
    asal: 'Sub-Hub Sentra Kepulauan Pesisir',
    transit: 'Pelabuhan Konsolidasi Wilayah',
    tujuan: 'Pabrik Pengolah Karagenan Hilir',
    totalMuatanKg: 12000,
    etd: '26 Agt 2026, 10:00 WITA',
    eta: '29 Agt 2026, 14:00 WITA',
    currentStep: 2,
    statusLabel: 'Konsolidasi & Loading Kargo Pelabuhan Logistik Asal',
    koordinatSaatIni: '4°08\'12"N 117°38\'50"E',
    suhuKelembaban: '29°C / Siap Muat Kapal'
  }
];

export const PILOT_KPI_DATA: PilotKPI = {
  selisihHargaPetani: '+22.4%', // Harga naik dibanding tengkulak tradisional
  biayaLogistikKg: 'Logistik 5,4% • Admin 2,7% • Gudang Hub 2,7%', // Biaya logistik/Handling 5,4%, admin 2,7% dan Gudang hub 2,7% dari Harga pabrik
  kecepatanPayout: '< 4 Jam (Tahap 1 80%)', // Petani langsung dapat uang di Sentra Hulu
  akurasiQCDiscrepancy: '0.8% Selisih', // Deviasi kadar air Hub vs Pabrik sangat minim
  onTimeDelivery: '99.1%',
  petaniTergabung: 48,
  totalVolumePilotTon: 64.5
};

export const SUPPLY_CHAIN_COMPARISON = [
  {
    aspect: 'Posisi Tawar & Akses Pasar',
    traditional: 'Petani terikat 1 tengkulak lokal, posisi sangat lemah dan tak punya pilihan pasar.',
    talisea: 'Terhubung langsung ke banyak pabrik pengolahan industri hilir lewat smart matching platform.'
  },
  {
    aspect: 'Penilaian Kadar Air & Mutu',
    traditional: 'Penilaian subjektif (remas tangan / perkiraan tengkulak), sering dipotong timbangan sepihak.',
    talisea: 'Pengujian objektif alat moisture tester digital & timbang digital terkalibrasi + foto bukti di platform.'
  },
  {
    aspect: 'Skema Pencairan Dana',
    traditional: 'Pembayaran sering dihutang 2–4 minggu sampai tengkulak menjual barang ke kapal/pabrik.',
    talisea: 'Pembayaran bertahap: 80–90% cair di hari yang sama saat timbang di Hub Sentra Petani, sisa 10–20% saat QC pabrik.'
  },
  {
    aspect: 'Urusan Logistik & Dokumen',
    traditional: 'Petani pusing mengurus perahu, kargo, buruh pelabuhan, dokumen karantina, dan izin laut.',
    talisea: 'Petani terima beres di sentra jemur. First-mile dijemput hub, mid-mile & last-mile diurus logistik terpadu.'
  },
  {
    aspect: 'Margin & Transparansi Biaya',
    traditional: 'Rantai 5-6 perantara (pengumpul, posko, agen, broker) memangkas lebih dari 40% margin petani.',
    talisea: 'Rantai langsung (Petani Pesisir → Hub Sentra → Logistik Kargo → Pabrik Hilir). Transparansi nota per kg.'
  }
];

export const INITIAL_FACTORY_OFFERS: FactoryPriceOffer[] = [
  {
    id: 'FAC-SULSEL-01',
    factoryName: 'PT Celebes Seaweed Industries',
    region: 'Sulawesi Selatan',
    city: 'Pabrik / Parepare',
    seaweedType: 'Eucheuma Cottonii',
    gradeRequirement: 'Grade A (KA 35-37%)',
    maxMoisturePercent: 36.0,
    buyingPricePerKg: 20400,
    previousPricePerKg: 19800,
    minVolumeTon: 15,
    maxVolumeTon: 150,
    paymentTerm: 'Escrow Talisea: DP 80% Timbang Sentra + 20% Bongkar Gudang',
    verifiedFactory: true,
    lastUpdated: '2026-08-25 08:30 WITA',
    priceTrend: 'up',
    priceChangeAmount: 600,
    picContact: '+628114200911',
    notes: 'Kebutuhan besar untuk produksi SRC & Refined Carrageenan food grade ekspor. Bersedia kontrak jangka panjang.',
    status: 'active'
  },
  {
    id: 'FAC-SULSEL-02',
    factoryName: 'PT Biota Laut Nusantara Industri',
    region: 'Sulawesi Selatan',
    city: 'Makassar (KIMA)',
    seaweedType: 'Eucheuma Cottonii',
    gradeRequirement: 'Super (KA <34%)',
    maxMoisturePercent: 35.0,
    buyingPricePerKg: 20800,
    previousPricePerKg: 20800,
    minVolumeTon: 20,
    maxVolumeTon: 200,
    paymentTerm: 'Escrow Talisea: DP 80% Timbang Sentra + 20% Bongkar Gudang',
    verifiedFactory: true,
    lastUpdated: '2026-08-25 07:15 WITA',
    priceTrend: 'stable',
    priceChangeAmount: 0,
    picContact: '+628124233008',
    notes: 'Prioritas kadar air <34%, bebas garam berlebih. Bongkar cepat pelabuhan Soekarno-Hatta Makassar.',
    status: 'active'
  },
  {
    id: 'FAC-JATIM-01',
    factoryName: 'PT Surabaya Agar Gelatin Prima',
    region: 'Jawa Timur',
    city: 'Surabaya / Rungkut',
    seaweedType: 'Eucheuma Cottonii',
    gradeRequirement: 'Grade A (KA 35-37%)',
    maxMoisturePercent: 36.0,
    buyingPricePerKg: 21500,
    previousPricePerKg: 21000,
    minVolumeTon: 20,
    maxVolumeTon: 300,
    paymentTerm: 'Escrow Talisea: DP 80% Timbang Sentra + 20% Bongkar Tanjung Perak',
    verifiedFactory: true,
    lastUpdated: '2026-08-25 09:00 WIB',
    priceTrend: 'up',
    priceChangeAmount: 500,
    picContact: '+628133188990',
    notes: 'Harga franco gudang Surabaya. Siap tampung kontainer kontinu dari Kaltara, Sulsel, dan NTT.',
    status: 'active'
  },
  {
    id: 'FAC-JATIM-02',
    factoryName: 'PT Pasuruan Carrageenan Extractama',
    region: 'Jawa Timur',
    city: 'Pasuruan (PIER)',
    seaweedType: 'Eucheuma Spinosum',
    gradeRequirement: 'Grade A (KA 35-37%)',
    maxMoisturePercent: 35.0,
    buyingPricePerKg: 15800,
    previousPricePerKg: 15500,
    minVolumeTon: 10,
    maxVolumeTon: 80,
    paymentTerm: 'Escrow Talisea: DP 80% Timbang Sentra + 20% Bongkar Gudang',
    verifiedFactory: true,
    lastUpdated: '2026-08-24 16:20 WIB',
    priceTrend: 'up',
    priceChangeAmount: 300,
    picContact: '+628170321887',
    notes: 'Spesialis ekstraksi Iota Carrageenan. Kadar gel strength minimal 450 g/cm².',
    status: 'active'
  },
  {
    id: 'FAC-JATENG-01',
    factoryName: 'PT Agar Swallow Indah Cirebon',
    region: 'Jawa Tengah & Barat',
    city: 'Cirebon / Semarang',
    seaweedType: 'Gracilaria',
    gradeRequirement: 'Grade A (KA 35-37%)',
    maxMoisturePercent: 37.0,
    buyingPricePerKg: 13800,
    previousPricePerKg: 14000,
    minVolumeTon: 15,
    maxVolumeTon: 120,
    paymentTerm: 'Escrow Talisea: DP 80% Timbang Sentra + 20% Verifikasi Lab',
    verifiedFactory: true,
    lastUpdated: '2026-08-24 14:00 WIB',
    priceTrend: 'down',
    priceChangeAmount: -200,
    picContact: '+628189876543',
    notes: 'Kebutuhan Gracilaria tambak kering merata, warna hitam kecokelatan bebas lumpur.',
    status: 'active'
  },
  {
    id: 'FAC-BALI-01',
    factoryName: 'PT Bali Nusa Marine Bio-Extract',
    region: 'Bali & Nusa Tenggara',
    city: 'Denpasar / Benoa',
    seaweedType: 'Eucheuma Spinosum',
    gradeRequirement: 'Super (KA <34%)',
    maxMoisturePercent: 34.0,
    buyingPricePerKg: 16200,
    previousPricePerKg: 16200,
    minVolumeTon: 5,
    maxVolumeTon: 50,
    paymentTerm: 'Escrow Talisea: DP 90% Timbang Sentra + 10% BAST',
    verifiedFactory: true,
    lastUpdated: '2026-08-25 08:00 WITA',
    priceTrend: 'stable',
    priceChangeAmount: 0,
    picContact: '+628193600122',
    notes: 'Untuk industri kosmetik dan nutraceutical premium. Rumput laut harus organik bebas pestisida/polutan.',
    status: 'active'
  },
  {
    id: 'FAC-SULSEL-03',
    factoryName: 'PT Alga Marine Ekspor Bone',
    region: 'Sulawesi Selatan',
    city: 'Bone / Sinjai',
    seaweedType: 'Eucheuma Cottonii',
    gradeRequirement: 'Grade A (KA 35-37%)',
    maxMoisturePercent: 36.5,
    buyingPricePerKg: 19800,
    previousPricePerKg: 19500,
    minVolumeTon: 10,
    maxVolumeTon: 60,
    paymentTerm: 'Escrow Talisea: DP 80% Timbang Sentra + 20% Tiba Pabrik',
    verifiedFactory: false,
    lastUpdated: '2026-08-23 11:30 WITA',
    priceTrend: 'up',
    priceChangeAmount: 300,
    picContact: '+628539988112',
    notes: 'Menyerap panen pesisir Teluk Bone dan sekitarnya.',
    status: 'active'
  }
];

export const FARMER_ORIGIN_REGIONS: FarmerOriginRegion[] = [
  {
    id: 'ORIGIN-KALTARA-01',
    regionName: 'Sentra Pesisir Mamolo & Sebatik',
    province: 'Kalimantan Utara',
    island: 'Kalimantan / Perbatasan',
    hubCenter: 'Hub Agregasi Sentra Mamolo / Tunon Taka Port',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 15200,
      'Eucheuma Spinosum': 10800,
      'Gracilaria': 9500,
      'Sargassum': 3500,
      'Halymenia': 8000
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 18800,
      'Eucheuma Spinosum': 13500,
      'Gracilaria': 11200,
      'Sargassum': 4800,
      'Halymenia': 9500
    },
    firstMileCostPerKg: 450,
    hubHandlingCostPerKg: 200,
    activeFarmersCount: 142
  },
  {
    id: 'ORIGIN-KALTARA-02',
    regionName: 'Sentra Pesisir Tarakan & Bulungan',
    province: 'Kalimantan Utara',
    island: 'Kalimantan',
    hubCenter: 'Hub Logistik Malundung Port Tarakan',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 15500,
      'Eucheuma Spinosum': 11000,
      'Gracilaria': 9800,
      'Sargassum': 3600,
      'Halymenia': 8200
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 18900,
      'Eucheuma Spinosum': 13600,
      'Gracilaria': 11400,
      'Sargassum': 4900,
      'Halymenia': 9600
    },
    firstMileCostPerKg: 400,
    hubHandlingCostPerKg: 200,
    activeFarmersCount: 88
  },
  {
    id: 'ORIGIN-SULSEL-01',
    regionName: 'Sentra Pesisir Jeneponto & Takalar',
    province: 'Sulawesi Selatan',
    island: 'Sulawesi',
    hubCenter: 'Hub Agregasi Pesisir Selatan Sulsel',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 16800,
      'Eucheuma Spinosum': 12200,
      'Gracilaria': 10500,
      'Sargassum': 3800,
      'Halymenia': 8500
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 19500,
      'Eucheuma Spinosum': 14200,
      'Gracilaria': 12100,
      'Sargassum': 5200,
      'Halymenia': 10000
    },
    firstMileCostPerKg: 350,
    hubHandlingCostPerKg: 180,
    activeFarmersCount: 210
  },
  {
    id: 'ORIGIN-SULSEL-02',
    regionName: 'Sentra Pesisir Luwu & Wotu',
    province: 'Sulawesi Selatan',
    island: 'Sulawesi',
    hubCenter: 'Hub Transit Palopo / Malili',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 16500,
      'Eucheuma Spinosum': 12000,
      'Gracilaria': 10800,
      'Sargassum': 3800,
      'Halymenia': 8400
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 19300,
      'Eucheuma Spinosum': 14000,
      'Gracilaria': 12300,
      'Sargassum': 5100,
      'Halymenia': 9800
    },
    firstMileCostPerKg: 400,
    hubHandlingCostPerKg: 180,
    activeFarmersCount: 165
  },
  {
    id: 'ORIGIN-SULTRA-01',
    regionName: 'Sentra Pesisir Bombana & Kendari',
    province: 'Sulawesi Tenggara',
    island: 'Sulawesi',
    hubCenter: 'Hub Konsolidasi Pelabuhan Bungkutoko Kendari',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 16000,
      'Eucheuma Spinosum': 11800,
      'Gracilaria': 10000,
      'Sargassum': 3700,
      'Halymenia': 8300
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 19100,
      'Eucheuma Spinosum': 13900,
      'Gracilaria': 11800,
      'Sargassum': 5000,
      'Halymenia': 9700
    },
    firstMileCostPerKg: 420,
    hubHandlingCostPerKg: 200,
    activeFarmersCount: 130
  },
  {
    id: 'ORIGIN-NTB-01',
    regionName: 'Sentra Pesisir Sumbawa & Lombok Timur',
    province: 'Nusa Tenggara Barat',
    island: 'Nusa Tenggara',
    hubCenter: 'Hub Logistik Pelabuhan Lembar / Badas',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 16200,
      'Eucheuma Spinosum': 12500,
      'Gracilaria': 10200,
      'Sargassum': 3900,
      'Halymenia': 8600
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 19200,
      'Eucheuma Spinosum': 14300,
      'Gracilaria': 11900,
      'Sargassum': 5300,
      'Halymenia': 10200
    },
    firstMileCostPerKg: 380,
    hubHandlingCostPerKg: 190,
    activeFarmersCount: 195
  },
  {
    id: 'ORIGIN-NTT-01',
    regionName: 'Sentra Pesisir Rote Ndao & Kupang',
    province: 'Nusa Tenggara Timur',
    island: 'Nusa Tenggara',
    hubCenter: 'Hub Logistik Tenau Port Kupang',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 15800,
      'Eucheuma Spinosum': 12000,
      'Gracilaria': 9800,
      'Sargassum': 3600,
      'Halymenia': 8200
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 18900,
      'Eucheuma Spinosum': 13800,
      'Gracilaria': 11500,
      'Sargassum': 4900,
      'Halymenia': 9600
    },
    firstMileCostPerKg: 480,
    hubHandlingCostPerKg: 220,
    activeFarmersCount: 175
  },
  {
    id: 'ORIGIN-JATIM-01',
    regionName: 'Sentra Tambak Gracilaria Sidoarjo & Pasuruan',
    province: 'Jawa Timur',
    island: 'Jawa',
    hubCenter: 'Hub Agregasi Tambak Pantura Jatim',
    localTraderBasePrice: {
      'Eucheuma Cottonii': 17500,
      'Eucheuma Spinosum': 13000,
      'Gracilaria': 11500,
      'Sargassum': 4000,
      'Halymenia': 9000
    },
    hubBasePriceBeforeShipping: {
      'Eucheuma Cottonii': 19800,
      'Eucheuma Spinosum': 14500,
      'Gracilaria': 12800,
      'Sargassum': 5400,
      'Halymenia': 10500
    },
    firstMileCostPerKg: 300,
    hubHandlingCostPerKg: 150,
    activeFarmersCount: 110
  }
];

export const SHIPPING_ROUTE_COSTS: RegionalShippingRouteCost[] = [
  // From Kaltara (Mamolo/Sebatik)
  {
    id: 'ROUTE-NNK-PABRIK',
    originId: 'ORIGIN-KALTARA-01',
    destinationFactoryId: 'FAC-SULSEL-01',
    seaFreightPerKg: 1100, // Kargo laut Tunon Taka -> Parepare
    portHandlingPerKg: 180,
    truckingLastMilePerKg: 320, // Parepare -> Gudang Pabrik
    quarantineInsurancePerKg: 100,
    transitDays: 3,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Rute reguler tol laut / kapal kargo KM Thalia & KM Pantokrator. Waktu tempuh 48-72 jam.'
  },
  {
    id: 'ROUTE-NNK-MKS',
    originId: 'ORIGIN-KALTARA-01',
    destinationFactoryId: 'FAC-SULSEL-02',
    seaFreightPerKg: 1200, // Tunon Taka -> Makassar Soekarno Hatta
    portHandlingPerKg: 200,
    truckingLastMilePerKg: 250, // Pelabuhan -> KIMA
    quarantineInsurancePerKg: 100,
    transitDays: 4,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Pengiriman kontainer FCL 20ft/40ft langsung ke Pelabuhan Makassar.'
  },
  {
    id: 'ROUTE-NNK-SBY',
    originId: 'ORIGIN-KALTARA-01',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 1450, // Tunon Taka -> Tanjung Perak Surabaya
    portHandlingPerKg: 220,
    truckingLastMilePerKg: 280, // Tanjung Perak -> Rungkut / Sidoarjo
    quarantineInsurancePerKg: 120,
    transitDays: 5,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kargo kontainer Meratus / Temas / SPIL langsung ke Tanjung Perak Surabaya.'
  },
  {
    id: 'ROUTE-NNK-PASURUAN',
    originId: 'ORIGIN-KALTARA-01',
    destinationFactoryId: 'FAC-JATIM-02',
    seaFreightPerKg: 1450,
    portHandlingPerKg: 220,
    truckingLastMilePerKg: 380, // Tanjung Perak -> Kawasan PIER Pasuruan
    quarantineInsurancePerKg: 120,
    transitDays: 5,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kargo laut ke Surabaya + trucking darat 65 km ke Kawasan Industri Pasuruan.'
  },
  {
    id: 'ROUTE-NNK-BALI',
    originId: 'ORIGIN-KALTARA-01',
    destinationFactoryId: 'FAC-BALI-01',
    seaFreightPerKg: 1600,
    portHandlingPerKg: 240,
    truckingLastMilePerKg: 350,
    quarantineInsurancePerKg: 130,
    transitDays: 6,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kargo laut transit Surabaya / Benoa Port.'
  },
  {
    id: 'ROUTE-NNK-BONE',
    originId: 'ORIGIN-KALTARA-01',
    destinationFactoryId: 'FAC-SULSEL-03',
    seaFreightPerKg: 1200,
    portHandlingPerKg: 200,
    truckingLastMilePerKg: 450, // Parepare/Makassar -> Bone
    quarantineInsurancePerKg: 100,
    transitDays: 4,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Bongkar Parepare dilanjutkan armada truk lintas kabupaten ke Bone.'
  },

  // From Tarakan (Kaltara-02)
  {
    id: 'ROUTE-TRK-PABRIK',
    originId: 'ORIGIN-KALTARA-02',
    destinationFactoryId: 'FAC-SULSEL-01',
    seaFreightPerKg: 1050,
    portHandlingPerKg: 170,
    truckingLastMilePerKg: 320,
    quarantineInsurancePerKg: 100,
    transitDays: 3,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Malundung Tarakan ke Parepare reguler.'
  },
  {
    id: 'ROUTE-TRK-SBY',
    originId: 'ORIGIN-KALTARA-02',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 1400,
    portHandlingPerKg: 220,
    truckingLastMilePerKg: 280,
    quarantineInsurancePerKg: 120,
    transitDays: 4,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kapal peti kemas reguler Tarakan - Tanjung Perak.'
  },

  // From Jeneponto & Takalar (Sulsel-01)
  {
    id: 'ROUTE-JNP-PABRIK',
    originId: 'ORIGIN-SULSEL-01',
    destinationFactoryId: 'FAC-SULSEL-01',
    seaFreightPerKg: 0, // Jalur Darat
    portHandlingPerKg: 0,
    truckingLastMilePerKg: 480, // Truk ekspedisi darat Jeneponto -> Pabrik (240 km)
    quarantineInsurancePerKg: 50,
    transitDays: 1,
    transportMode: 'Darat / Trucking Langsung',
    routeNotes: 'Pengiriman darat cepat via jalur Trans-Sulawesi (6-8 jam sampai di gerbang pabrik).'
  },
  {
    id: 'ROUTE-JNP-MKS',
    originId: 'ORIGIN-SULSEL-01',
    destinationFactoryId: 'FAC-SULSEL-02',
    seaFreightPerKg: 0,
    portHandlingPerKg: 0,
    truckingLastMilePerKg: 250, // Jeneponto/Takalar -> KIMA Makassar (70 km)
    quarantineInsurancePerKg: 50,
    transitDays: 1,
    transportMode: 'Darat / Trucking Langsung',
    routeNotes: 'Truk langsung tiba di hari yang sama (2-3 jam perjalanan).'
  },
  {
    id: 'ROUTE-JNP-SBY',
    originId: 'ORIGIN-SULSEL-01',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 850, // Port Makassar -> Tanjung Perak
    portHandlingPerKg: 180,
    truckingLastMilePerKg: 280,
    quarantineInsurancePerKg: 100,
    transitDays: 3,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Truk ke Port Makassar + kargo kontainer laut ke Surabaya.'
  },

  // From Luwu & Wotu (Sulsel-02)
  {
    id: 'ROUTE-LUWU-PABRIK',
    originId: 'ORIGIN-SULSEL-02',
    destinationFactoryId: 'FAC-SULSEL-01',
    seaFreightPerKg: 0,
    portHandlingPerKg: 0,
    truckingLastMilePerKg: 420, // Luwu/Palopo -> Pabrik via jalur darat Enrekang/Sidrap
    quarantineInsurancePerKg: 50,
    transitDays: 1,
    transportMode: 'Darat / Trucking Langsung',
    routeNotes: 'Truk darat 180 km via poros tengah Sulawesi.'
  },
  {
    id: 'ROUTE-LUWU-SBY',
    originId: 'ORIGIN-SULSEL-02',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 900,
    portHandlingPerKg: 190,
    truckingLastMilePerKg: 350,
    quarantineInsurancePerKg: 100,
    transitDays: 4,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Konsolidasi Pelabuhan Tanjung Ringgit Palopo / Makassar ke Surabaya.'
  },

  // From Bombana & Kendari (Sultra-01)
  {
    id: 'ROUTE-KDR-PABRIK',
    originId: 'ORIGIN-SULTRA-01',
    destinationFactoryId: 'FAC-SULSEL-01',
    seaFreightPerKg: 450, // Ferry Kolaka-Bajoe / Siwa + Truk
    portHandlingPerKg: 150,
    truckingLastMilePerKg: 380,
    quarantineInsurancePerKg: 80,
    transitDays: 2,
    transportMode: 'Ferry Roro + Trucking',
    routeNotes: 'Ferry penyeberangan Teluk Bone (Kolaka - Bajoe) + armada trucking ke Pabrik.'
  },
  {
    id: 'ROUTE-KDR-SBY',
    originId: 'ORIGIN-SULTRA-01',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 1150, // Kendari Bungkutoko -> Tanjung Perak
    portHandlingPerKg: 200,
    truckingLastMilePerKg: 280,
    quarantineInsurancePerKg: 100,
    transitDays: 4,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kapal peti kemas langsung Kendari - Surabaya.'
  },

  // From NTB (Sumbawa/Lombok)
  {
    id: 'ROUTE-NTB-SBY',
    originId: 'ORIGIN-NTB-01',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 750, // Lembar -> Tanjung Perak
    portHandlingPerKg: 160,
    truckingLastMilePerKg: 280,
    quarantineInsurancePerKg: 90,
    transitDays: 2,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kapal Roro KM Dharma Rucitra VII rute Lembar - Surabaya.'
  },
  {
    id: 'ROUTE-NTB-PABRIK',
    originId: 'ORIGIN-NTB-01',
    destinationFactoryId: 'FAC-SULSEL-01',
    seaFreightPerKg: 1100,
    portHandlingPerKg: 190,
    truckingLastMilePerKg: 320,
    quarantineInsurancePerKg: 100,
    transitDays: 4,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kargo laut NTB ke Makassar + trucking ke Pabrik.'
  },
  {
    id: 'ROUTE-NTB-BALI',
    originId: 'ORIGIN-NTB-01',
    destinationFactoryId: 'FAC-BALI-01',
    seaFreightPerKg: 300, // Ferry Lembar - Padangbai
    portHandlingPerKg: 100,
    truckingLastMilePerKg: 220,
    quarantineInsurancePerKg: 60,
    transitDays: 1,
    transportMode: 'Ferry Roro + Trucking',
    routeNotes: 'Ferry cepat penyeberangan Selat Lombok + trucking ke Benoa/Denpasar.'
  },

  // From NTT (Kupang/Rote)
  {
    id: 'ROUTE-NTT-SBY',
    originId: 'ORIGIN-NTT-01',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 1350, // Tenau Kupang -> Tanjung Perak
    portHandlingPerKg: 210,
    truckingLastMilePerKg: 280,
    quarantineInsurancePerKg: 110,
    transitDays: 4,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kapal kontainer tol laut / Meratus Kupang - Tanjung Perak.'
  },
  {
    id: 'ROUTE-NTT-PABRIK',
    originId: 'ORIGIN-NTT-01',
    destinationFactoryId: 'FAC-SULSEL-01',
    seaFreightPerKg: 1400,
    portHandlingPerKg: 210,
    truckingLastMilePerKg: 320,
    quarantineInsurancePerKg: 110,
    transitDays: 5,
    transportMode: 'Kapal Laut + Trucking',
    routeNotes: 'Kargo laut Kupang - Makassar + trucking Parepare/Pabrik.'
  },

  // From Jatim (Sidoarjo/Pasuruan)
  {
    id: 'ROUTE-JATIM-SBY',
    originId: 'ORIGIN-JATIM-01',
    destinationFactoryId: 'FAC-JATIM-01',
    seaFreightPerKg: 0,
    portHandlingPerKg: 0,
    truckingLastMilePerKg: 180, // Sidoarjo -> Rungkut Surabaya (25 km)
    quarantineInsurancePerKg: 30,
    transitDays: 1,
    transportMode: 'Darat / Trucking Langsung',
    routeNotes: 'Trucking lokal 1-2 jam langsung tiba di pabrik.'
  },
  {
    id: 'ROUTE-JATIM-PASURUAN',
    originId: 'ORIGIN-JATIM-01',
    destinationFactoryId: 'FAC-JATIM-02',
    seaFreightPerKg: 0,
    portHandlingPerKg: 0,
    truckingLastMilePerKg: 200,
    quarantineInsurancePerKg: 30,
    transitDays: 1,
    transportMode: 'Darat / Trucking Langsung',
    routeNotes: 'Trucking darat ke PIER Pasuruan 1 hari.'
  },
  {
    id: 'ROUTE-JATIM-CIREBON',
    originId: 'ORIGIN-JATIM-01',
    destinationFactoryId: 'FAC-JATENG-01',
    seaFreightPerKg: 0,
    portHandlingPerKg: 0,
    truckingLastMilePerKg: 450, // Tol Trans Jawa Jatim -> Cirebon (450 km)
    quarantineInsurancePerKg: 50,
    transitDays: 1,
    transportMode: 'Darat / Trucking Langsung',
    routeNotes: 'Armada truk tronton via Tol Trans-Jawa (8-10 jam).'
  }
];


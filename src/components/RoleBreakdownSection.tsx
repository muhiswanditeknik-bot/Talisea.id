import React, { useState } from 'react';
import { 
  Anchor, 
  Scale, 
  Cpu, 
  Ship, 
  Truck, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
  FileCheck,
  QrCode
} from 'lucide-react';

interface RoleBreakdownProps {
  onOpenRegister: (role?: string) => void;
}

export const RoleBreakdownSection: React.FC<RoleBreakdownProps> = ({ onOpenRegister }) => {
  const [selectedRole, setSelectedRole] = useState<number>(0);

  const roles = [
    {
      id: 'petani',
      name: 'PETANI RUMPUT LAUT',
      location: 'Sentra Petani, Sebatik, Mansapa & Sekitarnya',
      icon: Anchor,
      tag: 'Produsen Bahan Baku',
      color: 'emerald',
      duties: [
        'Melakukan budidaya bentangan tali di perairan laut bersih',
        'Panen dan penjemuran matahari sesuai standar kemampuan',
        'Menyerahkan hasil panen ke Hub atau menyediakan akses penjemputan perahu/pickup',
        'Menerima nota timbang digital dan pencairan dana tahap pertama (80-90%) tanpa menunggu tiba di pabrik'
      ],
      benefits: [
        'Tidak pusing mengurus izin kapal, kargo, buruh pelabuhan, dan pabrik',
        'Kepastian harga transparan berdasarkan kadar air objektif',
        'Arus kas lancar untuk modal operasional panen berikutnya'
      ]
    },
    {
      id: 'hub_petani',
      name: 'MITRA HUB / POSKO PETANI',
      location: 'Titik Kumpul Mamolo, Sebatik & Tunon Taka',
      icon: Scale,
      tag: 'First-Mile & Konsolidasi Mutu',
      color: 'teal',
      duties: [
        'Layanan pickup penjemputan hasil jemur petani ke pesisir/bentangan',
        'Penimbangan digital akurat dan pengujian kadar air menggunakan moisture meter terkalibrasi',
        'Pencatatan nota digital terintegrasi QR code ke platform Talisea.id',
        'Penyimpanan gudang yang aman dari hujan/lembab dan pengarungan standar industri (50kg)',
        'Konsolidasi volume minimal kargo untuk efisiensi kontainer kapal'
      ],
      benefits: [
        'Mendapatkan insentif fee handling & QC per kg yang pasti',
        'Sistem pencatatan digital otomatis mengurangi selisih timbangan',
        'Menjadi pusat agregasi ekonomi nelayan setempat'
      ]
    },
    {
      id: 'platform_talisea',
      name: 'PLATFORM TALISEA.ID',
      location: 'Sistem Digital Cloud & Operasional Rantai Pasok',
      icon: Cpu,
      tag: 'Orkestrator & Escrow',
      color: 'blue',
      duties: [
        'Smart matching antara suplai petani dengan spesifikasi PO Pabrik',
        'Pencatatan transaksi digital, kontrak beli, dan faktur elektronik',
        'Pengelolaan sistem pembayaran bertahap (smart escrow payout)',
        'Koordinasi kontrol alur QC asal dan QC tujuan',
        'Penyediaan integrasi WhatsApp otomatis untuk notifikasi status'
      ],
      benefits: [
        'Menghilangkan distorsi harga akibat broker berlebihan',
        'Transparansi data real-time untuk semua pihak',
        'Menjamin keamanan dana pabrik dan kepastian bayar petani'
      ]
    },
    {
      id: 'ekspedisi',
      name: 'MITRA EKSPEDISI KARGO LAUT',
      location: 'Rute Pelayaran Petani/Tarakan ➔ Parepare/Makassar',
      icon: Ship,
      tag: 'Mid-Mile Logistik Antarpulau',
      color: 'cyan',
      duties: [
        'Penyediaan ruang muat kontainer berventilasi atau kargo kapal terjadwal',
        'Pengurusan dokumen manifest pelabuhan & karantina tumbuhan laut',
        'Pengangkutan antarpulau dari Pelabuhan Tunon Taka Petani ke Sulawesi Selatan',
        'Pemberitahuan posisi status kapal & pelacakan kontainer secara real-time'
      ],
      benefits: [
        'Kepastian muatan kargo volume besar dan terjadwal',
        'Dokumen manifes digital terhubung ke platform',
        'Pembayaran ongkos angkut terjadwal lancar'
      ]
    },
    {
      id: 'mitra_lastmile',
      name: 'MITRA SULSEL / TRUCKING LAST-MILE PABRIK',
      location: 'Pelabuhan Parepare / Makassar ➔ Pabrik',
      icon: Truck,
      tag: 'Last-Mile Delivery',
      color: 'indigo',
      duties: [
        'Penerimaan kargo saat kapal sandar di pelabuhan tujuan (Parepare/Makassar)',
        'Pengurusan bongkar muat dan trucking darat menuju gudang Pabrik',
        'Koordinasi serah terima fisik barang bersama tim QC pabrik',
        'Pengesahan berita acara serah terima digital (BAST)'
      ],
      benefits: [
        'Order armada trucking rutin rute pelabuhan ke sentra industri',
        'SLA pengiriman jelas dan terkoordinasi'
      ]
    },
    {
      id: 'pabrik_industri',
      name: 'PABRIK / OFF-TAKER INDUSTRI',
      location: 'Kawasan Industri Pengolahan Rumput Laut Pabrik',
      icon: Building2,
      tag: 'End Buyer & Hilirisasi',
      color: 'amber',
      duties: [
        'Menetapkan kebutuhan volume, jenis rumput laut, dan spesifikasi mutu standar (kadar air & impuritas)',
        'Melakukan deposit dana escrow pembelian di awal',
        'Menerima pengiriman pasokan konsolidasi berkualitas seragam di pintu gudang pabrik',
        'Melakukan QC akhir penerimaan dan menyelesaikan pelunasan 10-20%'
      ],
      benefits: [
        'Kepastian pasokan bahan baku kontinyu tanpa perlu turun langsung ke pelosok pulau',
        'Bahan baku telah teruji kadar air dari asal sehingga meminimalkan risiko susut drastis',
        'Efisiensi biaya procurement dan traceability sumber panen terjamin'
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-900 border border-teal-200 mb-3">
            <BadgeCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>PEMBAGIAN PERAN & TANGGUNG JAWAB (PDF BAB 4)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sinergi 6 Pilar Ekosistem <span className="text-teal-700">Petani ke Pabrik</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Setiap pihak fokus pada keahliannya masing-masing. Tidak ada lagi pihak yang dibebani tugas di luar kapasitasnya.
          </p>
        </div>

        {/* Roles Selector (Desktop & Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {roles.map((r, idx) => {
            const Icon = r.icon;
            const isSelected = selectedRole === idx;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRole(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 shadow-2xs'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-slate-800 text-emerald-300' : 'bg-slate-200 text-slate-600'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold opacity-75">{r.tag}</div>
                  <div className="text-xs font-extrabold mt-0.5 line-clamp-1">{r.name.split('/')[0]}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detail Box */}
        {(() => {
          const current = roles[selectedRole];
          const Icon = current.icon;
          return (
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-700 pb-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                        {current.tag}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-300">{current.location}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {current.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onOpenRegister(current.id)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <span>Daftar Sebagai {current.name.split('/')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Duties */}
                <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/80">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-4">
                    <FileCheck className="w-4 h-4" />
                    <span>Tugas & Tanggung Jawab Operasional</span>
                  </div>
                  <ul className="space-y-3">
                    {current.duties.map((duty, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="bg-emerald-950/40 rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm mb-4">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Manfaat Langsung yang Diperoleh</span>
                    </div>
                    <ul className="space-y-3">
                      {current.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-emerald-100">
                          <BadgeCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-emerald-800/50 flex items-center justify-between text-xs text-slate-300">
                    <span>Terhubung via WhatsApp & Web Talisea.id</span>
                    <span className="text-emerald-400 font-semibold">Status: Siap Kolaborasi</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle, 
  MapPin, 
  ArrowRight, 
  Users, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  FileText, 
  Award,
  Sparkles,
  MessageSquare,
  Scale,
  Ship,
  Building2,
  ChevronRight
} from 'lucide-react';
import { PILOT_KPI_DATA } from '../data/mockData';

interface PilotMetricsProps {
  onOpenRegister: (role?: string) => void;
  onOpenWhatsAppPreview: () => void;
}

export const PilotMetricsSection: React.FC<PilotMetricsProps> = ({ onOpenRegister, onOpenWhatsAppPreview }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const pilotSteps = [
    {
      step: 1,
      title: 'Rekrut Pemasok Petani Hulu',
      desc: 'Rekrut kelompok tani perintis di kawasan sentra pesisir sebagai pemasok awal batch percontohan.',
      tag: 'Kemitraan Komunitas',
      pic: 'Field Officer & Kelompok Tani'
    },
    {
      step: 2,
      title: 'Aktivasi Hub Agregasi Sentra',
      desc: 'Tunjuk 1 koordinator sentra/hub lokal yang memiliki gudang simpan terstandar, timbangan digital, moisture meter, & armada pickup.',
      tag: 'Infrastruktur First-Mile',
      pic: 'Mitra Hub Agregasi'
    },
    {
      step: 3,
      title: 'Jemput, Timbang & QC Digital',
      desc: 'Jemput hasil panen di sentra jemur, lakukan penimbangan digital akurat, uji kadar air, dan terbitkan nota digital QR otomatis.',
      tag: 'Digitalisasi Mutu',
      pic: 'Certified QC Officer & Tim Timbang'
    },
    {
      step: 4,
      title: 'Smart Matching ke Pabrik Off-Taker',
      desc: 'Cocokkan volume & spesifikasi mutu dengan purchase order pabrik pengolahan industri hilir via platform.',
      tag: 'Platform Marketplace',
      pic: 'Talisea.id System'
    },
    {
      step: 5,
      title: 'Konsolidasi Volume & Booking Kapal',
      desc: 'Konsolidasikan minimal volume kontainer (15–20 ton) dan pesan ruang kargo ekspedisi laut koridor antarpulau.',
      tag: 'Logistik Agregasi',
      pic: 'Mitra Ekspedisi Laut'
    },
    {
      step: 6,
      title: 'Pengiriman Kargo & Live Tracking',
      desc: 'Pengangkutan kargo laut reguler, transit pelabuhan, dan trucking darat hingga tiba di gerbang pabrik pengolah.',
      tag: 'Mid & Last Mile',
      pic: 'Armada Kapal & Ekspedisi Darat'
    },
    {
      step: 7,
      title: 'QC Akhir Pabrik & Pelunasan',
      desc: 'Verifikasi mutu akhir di pabrik pengolah, serah terima BAST digital, pencairan pelunasan 10–20%, dan settlement rekening.',
      tag: 'Penyelesaian Transaksi',
      pic: 'Off-Taker Industri & Escrow'
    },
    {
      step: 8,
      title: 'Evaluasi & Peningkatan SOP',
      desc: 'Dokumentasikan deviasi mutu, SLA waktu, efisiensi biaya logistik per kg, serta feedback petani dan pabrik.',
      tag: 'Continuous Improvement',
      pic: 'Talisea Operations & Data Team'
    }
  ];

  const pilotMetrics = [
    {
      metric: 'Selisih Harga Diterima Petani',
      result: PILOT_KPI_DATA.selisihHargaPetani,
      desc: 'Dibandingkan harga perantara tengkulak konvensional',
      color: 'emerald'
    },
    {
      metric: 'Total Biaya Logistik & Handling / kg',
      result: PILOT_KPI_DATA.biayaLogistikKg,
      desc: 'Termasuk pickup, timbang, pengarungan, kargo laut, & trucking pabrik',
      color: 'teal'
    },
    {
      metric: 'Kecepatan Payout Tahap 1',
      result: PILOT_KPI_DATA.kecepatanPayout,
      desc: 'Pencairan instan di hari penyerahan barang di Hub Sentra Hulu',
      color: 'cyan'
    },
    {
      metric: 'Selisih QC Hub Sentra vs QC Pabrik',
      result: PILOT_KPI_DATA.akurasiQCDiscrepancy,
      desc: 'Deviasi kadar air rata-rata sangat rendah (< 1%) berkat moisture meter digital',
      color: 'blue'
    },
    {
      metric: 'Tingkat Keberhasilan Pengiriman',
      result: PILOT_KPI_DATA.onTimeDelivery,
      desc: 'Kargo utuh tanpa kerusakan cuaca dan tiba sesuai jadwal ETA',
      color: 'indigo'
    },
    {
      metric: 'Petani Terdaftar di Rantai Pasok',
      result: `${PILOT_KPI_DATA.petaniTergabung} Petani`,
      desc: 'Dari berbagai kelompok budidaya sentra pesisir terpadu',
      color: 'amber'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-200 mb-3">
            <Award className="w-3.5 h-3.5 text-indigo-700" />
            <span>ROADMAP & METRIK UKUR RANTAI PASOK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Skema Eksekusi Pilot Project <span className="text-indigo-800">1 Batch Percontohan</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Metode implementasi bertahap terukur mulai dari sentra petani pesisir hulu hingga pembuktian rantai pasok ke pabrik pengolahan hilir.
          </p>
        </div>

        {/* 8-Step Pilot Execution Interactive Stepper (PDF Page 10) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                8 Tahapan Alur Eksekusi Pilot Batch #1
              </h3>
              <p className="text-xs text-slate-500">
                Klik tahapan untuk melihat detail penanggung jawab dan standar operasional
              </p>
            </div>
            <button
              onClick={onOpenWhatsAppPreview}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Simulasi Notifikasi WA Petani</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
            {pilotSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  activeStepIndex === idx
                    ? 'bg-indigo-900 text-white border-indigo-900 shadow-md scale-[1.03]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${
                    activeStepIndex === idx ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {s.step}
                  </span>
                </div>
                <div className="text-[11px] font-bold leading-tight line-clamp-2 mt-1">
                  {s.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          {(() => {
            const cur = pilotSteps[activeStepIndex];
            return (
              <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-emerald-50 rounded-2xl p-6 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-600 text-white">
                      Langkah 0{cur.step} dari 08
                    </span>
                    <span className="text-xs font-bold text-indigo-900">• {cur.tag}</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">{cur.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
                    {cur.desc}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs shrink-0 w-full md:w-64">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Penanggung Jawab (PIC)</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{cur.pic}</div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>SOP Terstandar</span>
                    </span>
                    <span className="text-slate-500">Pilot V1.0</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 7 Measurable KPIs (PDF Page 11) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                7 Indikator Utama yang Diukur pada Pilot Project
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Data kuantitatif nyata untuk membuktikan validitas model bisnis dan efisiensi logistik
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pilotMetrics.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-1">{item.metric}</div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-emerald-800">
                    {item.result}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed flex items-start space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner from PDF Page 12 */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-400">
              INTI KESEPAKATAN TALISEA.ID (PDF BAB 11)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              "Petani Tidak Perlu Menjadi Pengirim"
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Talisea.id mengelola koneksi antara petani sentra pesisir, hub agregasi lokal, ekspedisi kargo laut antarpulau, dan pabrik pengolahan hilir. Hasil akhirnya: harga lebih transparan, logistik efisien, dan kesejahteraan petani pesisir meningkat berkelanjutan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenRegister()}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span>Daftar Jadi Mitra Rantai Pasok</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Anchor, 
  Scale, 
  Ship, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Droplets, 
  Banknote, 
  QrCode, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Zap,
  Users,
  AlertTriangle,
  ChevronRight,
  Info
} from 'lucide-react';
import { TaliseaLogo } from './TaliseaLogo';
import { RevenueSharingBreakdown } from './RevenueSharingBreakdown';

interface FarmerToFactoryFlowProps {
  onOpenRegister?: (role?: string) => void;
  onOpenQCSimulator?: () => void;
}

export const FarmerToFactoryFlowSection: React.FC<FarmerToFactoryFlowProps> = ({
  onOpenRegister,
  onOpenQCSimulator
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeTabMode, setActiveTabMode] = useState<'interactive' | 'comparison' | 'revenue-share'>('interactive');

  const pipelineSteps = [
    {
      step: 1,
      tag: 'TAHAP 1: FIRST-MILE SENTRA PESISIR & HUB PENERIMAAN',
      title: 'Panen, Jemur & QC Digital First-Mile',
      actor: 'Petani Rumput Laut ➔ Hub Agregasi Sentra Hulu',
      icon: Anchor,
      iconBg: 'bg-emerald-500 text-slate-950',
      description: 'Petani mengeringkan rumput laut (Eucheuma Cottonii/Spinosum) hingga kadar air standar. Di Hub Penerimaan, rumput laut diuji kadar air digital & ditimbang otomatis tanpa potongan timbangan tak wajar.',
      highlights: [
        'Uji Kadar Air Digital (Target 35-37% SNI)',
        'Timbangan Digital Terkalibrasi (Zero Rafaksi Liar)',
        'Penerbitan Surat/Nota Timbang Digital Ber-QR Code',
        'Pencairan Uang Muka 85% (Payout Tahap 1 Langsung)'
      ],
      duration: 'Waktu proses: 1-2 Jam di Hub Sentra',
      badge: 'First-Mile Origin'
    },
    {
      step: 2,
      tag: 'TAHAP 2: KONSOLIDASI & DOKUMENTASI RESMI',
      title: 'Agregasi Muatan & Sertifikasi Karantina',
      actor: 'Hub Agregator ➔ Pelabuhan Logistik Asal',
      icon: Scale,
      iconBg: 'bg-teal-600 text-white',
      description: 'Hasil panen puluhan kelompok tani diagregasi ke dalam kontainer standar industri, dipasang seal pengaman ber-barcode, dan diproses sertifikasi karantina resmi untuk izin lintas kargo.',
      highlights: [
        'Konsolidasi muatan volume 20–25 Ton per Kontainer',
        'Sertifikat Karantina Tumbuhan Laut Resmi (BKHIT)',
        'Barcode Traceability di setiap karung & kontainer',
        'Pencegahan susut & degradasi mutu selama transit'
      ],
      duration: 'Waktu proses: 12-24 Jam di Pelabuhan Asal',
      badge: 'Hub Consolidation'
    },
    {
      step: 3,
      tag: 'TAHAP 3: LOGISTIK MID-MILE ANTARPULAU',
      title: 'Pelayaran Kargo Terjadwal Jalur Laut',
      actor: 'Armada Kapal Kargo Roro Reguler (Koridor Laut Antarpulau)',
      icon: Ship,
      iconBg: 'bg-cyan-600 text-white',
      description: 'Pengiriman terjadwal melintasi koridor laut strategis menuju pelabuhan bongkar transit dengan tarif ekspedisi ternegosiasi skala volume besar.',
      highlights: [
        'Rute laut kargo terjadwal 48-60 jam pelayaran',
        'Tarif efisien teragregasi (~Rp 1.100/kg kargo kapal)',
        'Sistem Live GPS Tracking & monitoring suhu/kelembaban kontainer',
        'Asuransi muatan kargo laut terproteksi penuh'
      ],
      duration: 'Waktu pelayaran: 2-3 Hari Laut',
      badge: 'Mid-Mile Sea Freight'
    },
    {
      step: 4,
      tag: 'TAHAP 4: LAST-MILE TRUCKING KE GERBANG PABRIK',
      title: 'Bongkar Pelabuhan Transit & Trucking Langsung',
      actor: 'Armada Ekspedisi Darat ➔ Pintu Pabrik Pengolahan',
      icon: Truck,
      iconBg: 'bg-indigo-600 text-white',
      description: 'Kontainer dibongkar di dermaga pelabuhan transit dan langsung ditransfer ke armada truk ekspedisi darat menuju gerbang pabrik pengolahan tanpa jeda timbun terbuka.',
      highlights: [
        'Jarak tempuh darat cepat & terjadwal (<2 Jam)',
        'Armada truk siap siaga sebelum kapal bersandar',
        'Manifest kargo sinkron dengan purchase order pabrik',
        'Bebas risiko penurunan mutu akibat cuaca hujan'
      ],
      duration: 'Waktu trucking: 2-3 Jam Darat',
      badge: 'Last-Mile Delivery'
    },
    {
      step: 5,
      tag: 'TAHAP 5: SERAH TERIMA & PELUNASAN AKHIR (15%)',
      title: 'QC Masuk Pabrik & Pelunasan Akhir 15%',
      actor: 'Pabrik Pengolah Industri Hilir (Off-Taker) ➔ Escrow Talisea',
      icon: Building2,
      iconBg: 'bg-slate-900 text-white',
      description: 'Pabrik melakukan sampling QC akhir penerimaan (kadar air & kekuatan gel), menerbitkan Berita Acara Serah Terima (BAST) digital, dan escrow otomatis mencairkan sisa 15% pelunasan ke rekening petani.',
      highlights: [
        'Penerimaan bahan baku terverifikasi sesuai Purchase Order',
        'BAST Digital instan terbit via sistem Talisea.id',
        'Pelunasan Tahap 2 (15%) otomatis cair ke rekening petani',
        'Pabrik mendapatkan jaminan suplai kontinu & traceable'
      ],
      duration: 'Waktu serah terima: <24 Jam di Pabrik',
      badge: 'Off-Taker Industri'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>ALUR RANTAI PASOK TERPADU (PETANI ➔ PABRIK)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bagaimana Rumput Laut Mengalir dari Tali Petani Langsung ke Pabrik?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Talisea.id mengorkestrasi 5 tahapan terpadu: memangkas mata rantai spekulatif, memberikan uji mutu digital objektif di Sentra Hulu, dan menghubungkan logistik langsung ke pintu pabrik pengolahan industri hilir.
          </p>

          {/* Toggle View Mode */}
          <div className="flex items-center justify-center mt-6">
            <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex flex-wrap justify-center gap-1">
              <button
                onClick={() => setActiveTabMode('interactive')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTabMode === 'interactive'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Simulasi Interaktif 5 Tahap
              </button>
              <button
                onClick={() => setActiveTabMode('comparison')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTabMode === 'comparison'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Perbandingan Rantai: Lama vs Talisea.id
              </button>
              <button
                onClick={() => setActiveTabMode('revenue-share')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeTabMode === 'revenue-share'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <span>★ Bagi Hasil dari Harga Awal (89,2%)</span>
              </button>
            </div>
          </div>
        </div>

        {activeTabMode === 'interactive' && (
          <div>
            {/* Top Flow Step Progress Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
              {pipelineSteps.map((item) => {
                const Icon = item.icon;
                const isSelected = activeStep === item.step;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveStep(item.step)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-white text-slate-700 shadow-2xs border border-slate-200'
                      }`}>
                        {item.step}
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-slate-800 text-emerald-300' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold line-clamp-1">{item.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detailed Card */}
            {(() => {
              const current = pipelineSteps.find((s) => s.step === activeStep) || pipelineSteps[0];
              const Icon = current.icon;
              return (
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left details */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{current.tag}</span>
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {current.title}
                        </h3>
                        <p className="text-xs text-slate-300 font-semibold mt-1 flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Pihak Terlibat: {current.actor}</span>
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {current.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2.5 pt-2">
                        <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                          Fitur & Jaminan Utama di Tahap Ini:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {current.highlights.map((hl, i) => (
                            <div key={i} className="flex items-start space-x-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 text-xs text-slate-200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span>{current.duration}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                            disabled={activeStep === 1}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold disabled:opacity-40 hover:bg-slate-700 cursor-pointer"
                          >
                            ← Sebelumnya
                          </button>
                          <button
                            onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
                            disabled={activeStep === 5}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black disabled:opacity-40 cursor-pointer"
                          >
                            Berikutnya →
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Visual Card */}
                    <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${current.iconBg} shadow-lg`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Status Live Pipeline</div>
                            <div className="text-[10px] text-emerald-400">Terintegrasi Talisea.id Core</div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          Step {activeStep} of 5
                        </span>
                      </div>

                      {/* Dynamic info widget depending on step */}
                      {activeStep === 1 && (
                        <div className="space-y-3 text-xs">
                          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                            <div className="text-[10px] text-slate-400">Instrumen Uji Mutu Hub Sentra:</div>
                            <div className="text-emerald-400 font-bold text-xs mt-0.5">Digital Grain & Moisture Tester TK100G</div>
                            <div className="text-[10px] text-slate-400 mt-1">Akurasi: ±0.5% • Toleransi SNI Kadar Air: 35.0%</div>
                          </div>
                          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30">
                            <div className="text-[10px] text-emerald-300 font-bold">Skema Payout Tahap 1:</div>
                            <div className="text-lg font-black text-white">85% Cair Instan</div>
                            <div className="text-[10px] text-emerald-200/80">Uang langsung masuk rekening petani dalam &lt;4 jam setelah timbang</div>
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="space-y-3 text-xs">
                          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                            <div className="text-[10px] text-slate-400">Fasilitas Port Keberangkatan:</div>
                            <div className="text-white font-bold">Pelabuhan Kargo Logistik Sentra Asal</div>
                            <div className="text-[10px] text-cyan-300 mt-1">Sertifikasi Karantina Tumbuhan Laut BKHIT: Terbit ✓</div>
                          </div>
                          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                            <div className="text-[10px] text-slate-400">Volume Konsolidasi Rata-rata:</div>
                            <div className="text-emerald-400 font-black text-base">20.000 Kg (20 Ton) / Kontainer FCL</div>
                          </div>
                        </div>
                      )}

                      {activeStep === 3 && (
                        <div className="space-y-3 text-xs">
                          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                            <div className="text-[10px] text-slate-400">Armada Kapal Kargo Roro:</div>
                            <div className="text-cyan-300 font-bold text-sm">KM Kargo Nusantara (Trayek Reguler)</div>
                            <div className="text-[10px] text-slate-300 mt-1">Koridor Laut: Selat Antarpulau Terintegrasi</div>
                          </div>
                          <div className="bg-teal-950/80 p-3 rounded-xl border border-teal-500/30 text-emerald-300 font-semibold text-[11px]">
                            Efisiensi Ongkos Laut: ~Rp 1.100/kg (Hemat 32% dibanding kirim perorangan non-agregasi)
                          </div>
                        </div>
                      )}

                      {activeStep === 4 && (
                        <div className="space-y-3 text-xs">
                          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                            <div className="text-[10px] text-slate-400">Pelabuhan Bongkar Transit:</div>
                            <div className="text-white font-bold">Pelabuhan Transit Kargo Terpadu</div>
                            <div className="text-[10px] text-slate-400 mt-1">Waktu Muat Transfer ke Truk: 45 Menit</div>
                          </div>
                          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                            <div className="text-[10px] text-slate-400">Koridor Darat ke Kawasan Industri Pabrik:</div>
                            <div className="text-amber-300 font-bold">Gerbang Pelabuhan ➔ Kawasan Industri Pabrik Hilir (&lt;2 Jam)</div>
                          </div>
                        </div>
                      )}

                      {activeStep === 5 && (
                        <div className="space-y-3 text-xs">
                          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                            <div className="text-[10px] text-slate-400">Destinasi Akhir Pabrik:</div>
                            <div className="text-white font-bold text-sm">Pabrik Pengolah Semi-Refined / Refined Carrageenan (Off-Taker)</div>
                            <div className="text-[10px] text-emerald-400 mt-1">BAST Digital Otomatis Tersinkronisasi</div>
                          </div>
                          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30">
                            <div className="text-[10px] text-emerald-300 font-bold">Pelunasan Tahap 2:</div>
                            <div className="text-base font-black text-white">15% Pelunasan Final</div>
                            <div className="text-[10px] text-emerald-200/80">Langsung dikirim ke rekening petani begitu BAST ditandatangani</div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          onClick={() => onOpenRegister && onOpenRegister()}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                        >
                          <span>Daftar Jadi Bagian dari Skema Ini</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Comparison Mode */}
        {activeTabMode === 'comparison' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch animate-in fade-in duration-200">
            
            {/* Traditional Scheme (Broken) */}
            <div className="bg-rose-50/40 rounded-3xl p-6 sm:p-8 border-2 border-rose-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>SKEMA LAMA KONVENSIONAL (4-5 LAPIS TENGKULAK)</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  Rantai Rumit, Rafaksi Liar & Pembayaran Dihutang
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Petani terpaksa menjual ke pedagang perantara lokal karena keterbatasan modal dan alat uji. Barang diperjualbelikan berkali-kali antar-spekulan sebelum tiba di pabrik pengolahan.
                </p>

                {/* Steps in Old Way */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800">1. Petani Pesisir Hulu</span>
                    <span className="text-[11px] text-rose-600 font-bold">Harga Rp 14.500 - 15.200</span>
                  </div>
                  <div className="text-center text-slate-400 text-xs">↓ Dipotong timbangan 5-10% ("remas tangan")</div>
                  
                  <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800">2. Tengkulak Lapangan / Pengijon</span>
                    <span className="text-[11px] text-amber-700 font-semibold">Mengambil margin Rp 1.500/kg</span>
                  </div>
                  <div className="text-center text-slate-400 text-xs">↓ Dijual lagi ke pedagang perantara kota</div>

                  <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800">3. Pedagang Antarpulau Spekulatif</span>
                    <span className="text-[11px] text-amber-700 font-semibold">Biaya logistik individual tinggi</span>
                  </div>
                  <div className="text-center text-slate-400 text-xs">↓ Dikirim tanpa standardisasi mutu</div>

                  <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-800">4. Pabrik Pengolahan Industri Hilir</span>
                    <span className="text-[11px] text-slate-700 font-bold">Beli Rp 20.000/kg (Franco Pabrik)</span>
                  </div>
                </div>

                <div className="bg-rose-100/70 p-3.5 rounded-xl border border-rose-300 text-xs text-rose-900 space-y-1">
                  <div className="font-bold">❌ Dampak Kerugian Petani:</div>
                  <p className="text-[11px]">
                    Petani kehilangan 30-40% nilai ekonomi panen akibat potongan timbangan subjektif dan keterlambatan pembayaran hingga 1 bulan.
                  </p>
                </div>
              </div>
            </div>

            {/* Talisea Scheme (Integrated) */}
            <div className="bg-emerald-50/40 rounded-3xl p-6 sm:p-8 border-2 border-emerald-400 flex flex-col justify-between space-y-6 relative shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SKEMA TERPADU TALISEA.ID (DIRECT PIPELINE)</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  Petani ➔ Hub Sentra ➔ Ekspedisi ➔ Pabrik Hilir
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Memangkas perantara spekulatif. Hub Sentra Hulu berfungsi sebagai pos timbang digital & titik konsolidasi resmi dengan biaya logistik transparan Rp 2.300/kg all-in.
                </p>

                {/* Steps in Talisea */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3.5 bg-white rounded-xl border-2 border-emerald-400 text-xs flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="font-bold text-slate-900">1. Petani Panen & Jemur Standar</div>
                      <div className="text-[10px] text-slate-500">Kadar air terukur digital (35-37%)</div>
                    </div>
                    <span className="text-xs text-emerald-700 font-black bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                      Harga Bersih: Rp 17.700/kg
                    </span>
                  </div>

                  <div className="text-center text-emerald-600 text-xs font-bold flex items-center justify-center space-x-1">
                    <span>↓ Payout Tahap 1 (85% cair di tempat)</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-emerald-300 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">2. Hub & Logistik Kargo Terpadu</div>
                      <div className="text-[10px] text-slate-500">Biaya handling + kapal laut + trucking: Rp 2.300/kg flat</div>
                    </div>
                    <span className="text-[10px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                      Zero Mark-Up Liar
                    </span>
                  </div>

                  <div className="text-center text-cyan-700 text-xs font-bold">
                    <span>↓ Kargo Logistik Antarpulau Terjadwal</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-emerald-300 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">3. Gerbang Pabrik Pengolahan Industri Hilir</div>
                      <div className="text-[10px] text-slate-500">QC penerimaan, BAST digital & pelunasan 15%</div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      PO Rp 20.000/kg
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-100/80 p-3.5 rounded-xl border border-emerald-300 text-xs text-emerald-950 space-y-1">
                  <div className="font-bold">✓ Keuntungan Nyata untuk Petani & Pabrik:</div>
                  <p className="text-[11px] leading-relaxed">
                    Petani untung <strong>+Rp 2.500/kg lebih tinggi</strong> dan dibayar cepat. Pabrik menerima jaminan suplai rumput laut grade ekspor tepat waktu dengan kadar air terkontrol.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenRegister && onOpenRegister('petani')}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Daftar Kemitraan Petani / Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Revenue Share Mode */}
        {activeTabMode === 'revenue-share' && (
          <div className="animate-in fade-in duration-200">
            <RevenueSharingBreakdown onOpenRegister={onOpenRegister} />
          </div>
        )}

        {/* Operational Highlights Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">
              Standarisasi Timbang Digital
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Semua timbangan di Hub Sentra Hulu terkalibrasi berkala oleh Metrologi Legal. Tidak ada lagi taksiran berat sepihak dari pedagang perantara.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
              <Ship className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">
              Koridor Logistik Terpadu (Hulu ➔ Hilir)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jalur laut dan darat terjadwal mingguan memastikan kargo tidak tertahan lama di dermaga sehingga kadar air dan kekuatan gel karagenan tetap prima.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Banknote className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">
              Pembayaran Berjenjang (85% + 15%)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memberikan likuiditas langsung bagi petani saat panen di Sentra Hulu sekaligus melindungi pabrik dengan klausul QC serah terima di gerbang industri hilir.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

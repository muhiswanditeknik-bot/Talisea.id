import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  XCircle, 
  Scale, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  Zap,
  Users,
  Anchor,
  Ship,
  Warehouse,
  FileSpreadsheet
} from 'lucide-react';
import { SUPPLY_CHAIN_COMPARISON } from '../data/mockData';

interface ProblemSolutionProps {
  onOpenRegister: (role?: string) => void;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionProps> = ({ onOpenRegister }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'flow'>('flow');

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>ANALISIS MASALAH & SOLUSI RANTAI PASOK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengapa Talisea.id Berperan Sebagai <span className="text-emerald-700">Pengelola Rantai Pasok</span>, Bukan Sekadar Marketplace?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Dalam perdagangan rumput laut tradisional dari sentra petani hulu ke pabrik pengolahan hilir, petani terjepit rantai perantara panjang, ketidakpastian kadar air, dan tertundanya pembayaran.
          </p>
        </div>

        {/* 4 Core Problems Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          
          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs hover:border-rose-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Posisi Tawar Petani Lemah</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Petani hanya bergantung pada satu pembeli perantara lokal. Tidak memiliki opsi pasar lain saat harga ditekan.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs hover:border-amber-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Kadar Air & QC Tidak Transparan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Penentuan harga dan potongan berat (rafaksi) dilakukan secara subjektif tanpa alat ukur kadar air digital terstandar.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-xs hover:border-orange-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Rantai Perantara Terlalu Panjang</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              5-6 lapis pedagang perantara & broker mengambil margin besar sebelum barang sampai ke pabrik pengolah hilir.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs hover:border-indigo-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Ship className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">Petani Rumit Urus Kargo Sendiri</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Petani tidak praktis mengurus kargo laut, bongkar muat pelabuhan, dokumen karantina, dan negosiasi pabrik.
            </p>
          </div>

        </div>

        {/* Traditional Scheme vs Talisea.id Flow Diagram (Direct from PDF Page 3 & 4) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Transformasi Alur Rantai Pasok: Sentra Hulu ➔ Pabrik Hilir
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Perbandingan alur konvensional (6 lapis perantara) vs alur Talisea.id terintegrasi
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('flow')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'flow'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Diagram Skema Alur
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tabel Perbandingan Rinci
              </button>
            </div>
          </div>

          {activeTab === 'flow' ? (
            <div className="space-y-10">
              
              {/* Traditional Flow (PDF Page 3) */}
              <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-200">
                <div className="flex items-center space-x-2 text-rose-800 font-extrabold text-sm mb-3">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>1. SKEMA TRADISIONAL (SAAT INI)</span>
                  <span className="text-[11px] font-normal text-rose-700 ml-auto hidden sm:inline">
                    6 Titik Perantara • Margin Terkikis • Pembayaran Tertunda
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 items-center">
                  
                  <div className="bg-white p-3 rounded-xl border border-rose-200 text-center shadow-2xs">
                    <div className="text-[10px] font-semibold text-rose-500">ASAL</div>
                    <div className="font-extrabold text-slate-800 text-xs mt-0.5">PETANI PESISIR</div>
                    <div className="text-[10px] text-slate-500 mt-1">Posisi tawar lemah</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 text-center shadow-2xs">
                    <div className="text-[10px] font-semibold text-rose-500">LAYER 1</div>
                    <div className="font-extrabold text-slate-800 text-xs mt-0.5">PENGUMPUL LOKAL</div>
                    <div className="text-[10px] text-slate-500 mt-1">Timbang manual</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 text-center shadow-2xs">
                    <div className="text-[10px] font-semibold text-rose-500">LAYER 2</div>
                    <div className="font-extrabold text-slate-800 text-xs mt-0.5">PEDAGANG BESAR / POSKO</div>
                    <div className="text-[10px] text-slate-500 mt-1">Potongan mutu</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 text-center shadow-2xs">
                    <div className="text-[10px] font-semibold text-rose-500">LAYER 3</div>
                    <div className="font-extrabold text-slate-800 text-xs mt-0.5">EKSPEDISI KARGO</div>
                    <div className="text-[10px] text-slate-500 mt-1">Kargo laut konvensional</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 text-center shadow-2xs">
                    <div className="text-[10px] font-semibold text-rose-500">LAYER 4</div>
                    <div className="font-extrabold text-slate-800 text-xs mt-0.5">BROKER / AGEN PERANTARA</div>
                    <div className="text-[10px] text-slate-500 mt-1">Komisi perantara</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 text-center shadow-2xs">
                    <div className="text-[10px] font-semibold text-rose-500">TUJUAN AKHIR</div>
                    <div className="font-extrabold text-slate-800 text-xs mt-0.5">PABRIK / OFF-TAKER</div>
                    <div className="text-[10px] text-slate-500 mt-1">Terima harga tinggi</div>
                  </div>

                </div>

                <div className="mt-3 text-xs text-rose-700 bg-white/80 p-2.5 rounded-lg border border-rose-200/80 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Potensi persoalan:</strong> Margin petani terkikis hingga 30-40%, penilaian mutu tidak seragam, risiko rafaksi tinggi, dan pencairan pembayaran dari perantara kerap tertunda hingga 2-4 minggu.
                  </span>
                </div>
              </div>

              {/* Talisea.id Flow (PDF Page 4) */}
              <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-300">
                <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-sm mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>2. SKEMA TALISEA.ID (TERINTEGRASI & EFISIEN)</span>
                  <span className="text-[11px] font-semibold text-emerald-700 ml-auto hidden sm:inline">
                    Petani Tidak Perlu Mengurus Logistik Sendiri
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
                  
                  {/* Step 1 */}
                  <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">01. FIRST-MILE</div>
                      <div className="font-extrabold text-slate-900 text-sm mt-1">PETANI PESISIR</div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Panen di bentangan tali, jemur optimal, minta pickup lewat WA/Aplikasi.
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] font-bold text-emerald-700">
                      ✓ Dijemput armada hub
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wide">02. QC & TIMBANG</div>
                      <div className="font-extrabold text-slate-900 text-sm mt-1">HUB AGREGASI SENTRA</div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Timbang digital, uji kadar air moisture tester, cetak nota, konsolidasi kargo.
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] font-bold text-teal-700">
                      ✓ Payout 85% cair seketika
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-gradient-to-b from-emerald-600 to-teal-700 text-white p-4 rounded-xl shadow-md flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-200 uppercase tracking-wide">03. SMART MATCHING</div>
                      <div className="font-extrabold text-white text-sm mt-1">PLATFORM TALISEA.ID</div>
                      <p className="text-[11px] text-emerald-100 mt-1">
                        Menghubungkan pasokan, order pabrik, kontrak digital, escrow & tracking.
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-emerald-500/50 text-[10px] font-bold text-cyan-200">
                      ✓ Koordinasi & Kontrol Alur
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-cyan-600 uppercase tracking-wide">04. MID & LAST MILE</div>
                      <div className="font-extrabold text-slate-900 text-sm mt-1">EKSPEDISI & TRUCKING</div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Kargo kargo laut reguler + trucking langsung ke pintu pabrik hilir.
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] font-bold text-cyan-700">
                      ✓ Tracking real-time
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">05. INDUSTRI</div>
                      <div className="font-extrabold text-slate-900 text-sm mt-1">PABRIK PENGOLAH</div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Menerima pasokan bervolume besar yang sudah terstandardisasi & data QC akurat.
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] font-bold text-amber-700">
                      ✓ QC Akhir & Pelunasan 15%
                    </div>
                  </div>

                </div>

                <div className="mt-4 text-xs text-emerald-900 bg-white/90 p-3 rounded-lg border border-emerald-300 flex items-start space-x-2.5">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Keunggulan Inti:</strong> Hub melakukan penjemputan & QC objektif di sentra asal petani. Pabrik menerima pasokan yang sudah dikonsolidasi dengan data mutu lengkap. Petani menerima mayoritas uang (80-90%) tanpa perlu menunggu kapal tiba di tujuan!
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="py-3 px-4 font-bold text-slate-700 w-1/4">Aspek Rantai Pasok</th>
                    <th className="py-3 px-4 font-bold text-rose-700 bg-rose-50/60 w-3/8">Skema Tradisional Lama</th>
                    <th className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/80 w-3/8">Solusi Talisea.id Terpadu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SUPPLY_CHAIN_COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 align-top">
                        {row.aspect}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 bg-rose-50/30 align-top">
                        <div className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.traditional}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 bg-emerald-50/40 font-medium align-top">
                        <div className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.talisea}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Bottom callout */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              Tertarik menerapkan skema ini pada kelompok tani atau pabrik Anda?
            </div>
            <button
              onClick={() => onOpenRegister()}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-2 transition-all"
            >
              <span>Daftar / Konsultasi Kemitraan Rantai Pasok</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Coins, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Scale, 
  Building, 
  AlertCircle, 
  Sparkles,
  Wallet,
  ArrowDown,
  Percent
} from 'lucide-react';

export const StagedPaymentSection: React.FC = () => {
  const [simulatedKg, setSimulatedKg] = useState<number>(2500);
  const [pricePerKg, setPricePerKg] = useState<number>(19500);
  const [upfrontPercent, setUpfrontPercent] = useState<number>(85); // 85% default (between 80-90%)

  const totalValue = simulatedKg * pricePerKg;
  const payoutTahap1 = Math.round(totalValue * (upfrontPercent / 100));
  const payoutTahap2 = totalValue - payoutTahap1;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-teal-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3">
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOLUSI KAS PETANI (PDF BAB 6 & 7)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Skema Pembayaran Bertahap: <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              Petani Tidak Perlu Menunggu Sampai Kapal Tiba
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Pada sistem lama, petani harus menunggu 2–4 minggu hingga kapal sandar di Sulsel. Dengan Talisea.id Smart Escrow, 
            <strong> 80–90% dana langsung cair saat timbang & lolos QC di Hub Petani.</strong>
          </p>
        </div>

        {/* 4-Step Escrow Flow (PDF Page 7 Diagram) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          
          {/* Step 1 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 relative group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-900 text-blue-300 border border-blue-700">
                LANGKAH 1
              </span>
              <Lock className="w-4 h-4 text-blue-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Pabrik Deposit Dana</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Off-taker Pabrik mengunci dana kontrak (100%) ke Rekening Escrow Talisea.id sebelum pengiriman dimulai.
            </p>
            <div className="mt-3 text-[11px] font-semibold text-blue-300">
              Dana aman 100% terkunci
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 relative group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-teal-900 text-teal-300 border border-teal-700">
                LANGKAH 2
              </span>
              <Scale className="w-4 h-4 text-teal-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">QC & Timbang di Hub Petani</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mitra Hub melakukan timbang digital dan tes kadar air moisture meter. Data diunggah ke platform.
            </p>
            <div className="mt-3 text-[11px] font-semibold text-teal-300">
              Nota digital otomatis terbit
            </div>
          </div>

          {/* Step 3 (Highlight) */}
          <div className="bg-gradient-to-b from-emerald-900/90 to-slate-900 border-2 border-emerald-400 rounded-2xl p-5 relative shadow-lg shadow-emerald-950">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                LANGKAH 3 (INSTAN)
              </span>
              <Wallet className="w-4 h-4 text-emerald-300" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">80–90% Payout Awal</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Mayoritas pembayaran langsung ditransfer ke rekening / dompet petani saat barang masuk Hub Petani.
            </p>
            <div className="mt-3 text-[11px] font-bold text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cair &lt; 4 Jam di Hari yang Sama</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 relative group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-900 text-amber-300 border border-amber-700">
                LANGKAH 4
              </span>
              <Building className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">10–20% Pelunasan</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sisa pembayaran dicairkan penuh setelah kargo tiba di pabrik dan diverifikasi tim QC akhir pabrik.
            </p>
            <div className="mt-3 text-[11px] font-semibold text-amber-300">
              Pencatatan BAST & Rekonsiliasi
            </div>
          </div>

        </div>

        {/* Interactive Payment Simulator Card */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-700 pb-5 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Simulator Pencairan Bertahap Transaksi Panen
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Uji coba simulasi perhitungan dana yang diterima petani di Sentra Petani vs pelunasan di Pabrik
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-emerald-300">
              <span>Rasio Payout:</span>
              <span className="font-bold">{upfrontPercent}% (Awal) / {100 - upfrontPercent}% (Pelunasan)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Volume Panen Kering (Kg):</span>
                  <span className="text-emerald-400 font-bold text-sm">{simulatedKg.toLocaleString('id-ID')} Kg ({ (simulatedKg / 1000).toFixed(1) } Ton)</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={simulatedKg}
                  onChange={(e) => setSimulatedKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>500 Kg (1 Petani)</span>
                  <span>5.000 Kg</span>
                  <span>15.000 Kg (1 Kontainer Penuh)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Harga Kontrak Mutu Super/Grade A (Rp/Kg):</span>
                  <span className="text-emerald-400 font-bold text-sm">{formatIDR(pricePerKg)}/Kg</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="500"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Rp 10.000</span>
                  <span>Rp 30.000</span>
                  <span>Rp 50.000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Persentase Payout Awal (Hub Petani):</span>
                  <span className="text-cyan-300 font-bold text-sm">{upfrontPercent}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[80, 85, 90].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setUpfrontPercent(pct)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        upfrontPercent === pct
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {pct}% Payout Awal
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Breakdown Results */}
            <div className="lg:col-span-6 space-y-3">
              
              {/* Total Value */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">TOTAL NILAI KONTRAK TRANSAKSI</div>
                  <div className="text-xl sm:text-2xl font-black text-white">{formatIDR(totalValue)}</div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>Deposit Escrow</span>
                  <div className="text-emerald-400 font-bold text-xs">Pabrik Mitra</div>
                </div>
              </div>

              {/* Tahap 1 Card */}
              <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-500/50 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-400">TAHAP 1: PAYOUT AWAL ({upfrontPercent}%)</span>
                    <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      Hari Ini di Hub Petani
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1">
                    {formatIDR(payoutTahap1)}
                  </div>
                  <div className="text-[11px] text-emerald-200/80 mt-1">
                    ✓ Langsung diterima petani setelah timbang & tester kadar air di Hub Mamolo/Sebatik.
                  </div>
                </div>
              </div>

              {/* Tahap 2 Card */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-400">TAHAP 2: PELUNASAN ({100 - upfrontPercent}%)</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      Setelah QC Pabrik
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
                    {formatIDR(payoutTahap2)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    ✓ Dicairkan setelah kontainer dibongkar di gudang Pabrik & QC akhir tuntas.
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Catatan: Persentase 80-90% / 10-20% adalah skema percontohan hasil FGD Talisea.id (Petani-Pabrik) dan diikat dalam perjanjian jual beli digital tersertifikasi.
              </span>
            </div>
            <a
              href="#transparansi-bagi-hasil-section"
              className="shrink-0 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-[11px] border border-emerald-400/40 flex items-center space-x-1.5 transition-all"
            >
              <Percent className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lihat Tabel Alokasi 89,2% Petani</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

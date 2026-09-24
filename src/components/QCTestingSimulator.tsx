import React, { useState } from 'react';
import { 
  Activity, 
  Droplets, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Sun, 
  TrendingUp, 
  Info,
  Sparkles,
  Award
} from 'lucide-react';
import { SeaweedType } from '../types';

export const QCTestingSimulator: React.FC = () => {
  const [selectedJenis, setSelectedJenis] = useState<SeaweedType>('Eucheuma Cottonii');
  const [moisture, setMoisture] = useState<number>(35.0);
  const [impurity, setImpurity] = useState<number>(2.0);
  const [sampleWeightKg, setSampleWeightKg] = useState<number>(1000);

  // Industry Standard Benchmark: 35-37% is standard baseline
  const baseStandardPrice = selectedJenis === 'Eucheuma Cottonii' ? 19000 : selectedJenis === 'Eucheuma Spinosum' ? 14200 : 12000;

  // Calculate dynamic price based on moisture
  let grade = 'Grade A (Standar Ekspor)';
  let priceAdj = 0;
  let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  let advice = 'Kadar air sangat ideal untuk pabrik carrageenan. Siap dikarungi dan tidak ada potongan timbangan!';

  if (moisture < 34.0) {
    grade = 'Grade Super (Kering Optimal <34%)';
    priceAdj = +800;
    statusColor = 'text-emerald-800 bg-emerald-100 border-emerald-400';
    advice = 'Kualitas sangat premium! Rendemen karagenan tinggi. Petani berhak atas harga bonus insentif mutu kering optimal.';
  } else if (moisture >= 34.0 && moisture <= 37.0) {
    grade = 'Grade A (Standar Industri 35-37%)';
    priceAdj = 0;
    statusColor = 'text-teal-800 bg-teal-50 border-teal-300';
    advice = 'Sesuai spesifikasi standar penerimaan Pabrik. Penimbangan 100% diterima penuh tanpa rafaksi.';
  } else if (moisture > 37.0 && moisture <= 40.0) {
    grade = 'Grade B (Lembab Sedang 38-40%)';
    priceAdj = -1200;
    statusColor = 'text-amber-800 bg-amber-50 border-amber-300';
    advice = 'Kadar air sedikit di atas standar. Disarankan jemur ulang 3-5 jam di bawah terik matahari untuk mendapatkan harga Grade A.';
  } else {
    grade = 'Grade C (Basah >40% - Wajib Jemur Ulang)';
    priceAdj = -3000;
    statusColor = 'text-rose-800 bg-rose-50 border-rose-300';
    advice = 'Kadar air terlalu basah. Berisiko jamur dan fermentasi saat kargo laut. Wajib dijemur ulang sebelum masuk kontainer.';
  }

  // Impurity adjustment
  if (impurity > 3.0) {
    priceAdj -= 500;
  }

  const finalPricePerKg = Math.max(8000, baseStandardPrice + priceAdj);
  const totalPayout = sampleWeightKg * finalPricePerKg;
  const payoutTahap1 = Math.round(totalPayout * 0.80);
  const payoutTahap2 = totalPayout - payoutTahap1;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-900 border border-teal-200 mb-3">
            <Activity className="w-3.5 h-3.5 text-teal-700" />
            <span>STANDARISASI MUTU & DIGITAL QC (PDF BAB 5 & 6)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simulator Uji Kadar Air & Penentuan Harga Transparan
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Gantikan penilaian subjektif tengkulak ("remas tangan") dengan data moisture meter digital terkalibrasi. Ketahui nilai panen Anda secara akurat tanpa potongan timbangan liar.
          </p>
        </div>

        {/* Simulator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Pilih Komoditas Rumput Laut:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Eucheuma Cottonii', 'Eucheuma Spinosum', 'Gracilaria'] as SeaweedType[]).map((j) => (
                  <button
                    key={j}
                    onClick={() => setSelectedJenis(j)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                      selectedJenis === j
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {j.replace('Eucheuma ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Moisture Slider with Visual Gauge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span>Kadar Air Moisture Meter Digital (%):</span>
                </label>
                <span className="text-lg font-black text-slate-900 bg-cyan-50 text-cyan-900 px-3 py-0.5 rounded-xl border border-cyan-200">
                  {moisture.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="28"
                max="48"
                step="0.1"
                value={moisture}
                onChange={(e) => setMoisture(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="grid grid-cols-4 text-[10px] text-slate-500 font-semibold pt-1">
                <span className="text-emerald-700">&lt; 34% (Super)</span>
                <span className="text-teal-700">35-37% (Standar)</span>
                <span className="text-amber-700">38-40% (Lembab)</span>
                <span className="text-rose-700">&gt; 40% (Basah)</span>
              </div>
            </div>

            {/* Impurity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <span>Tingkat Impuritas / Pasir / Garam / Sampah (%):</span>
                </label>
                <span className="text-sm font-black text-slate-900 bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-200">
                  {impurity.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={impurity}
                onChange={(e) => setImpurity(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.5% (Sangat Bersih)</span>
                <span>3.0% (Batas Maksimum Pabrik)</span>
                <span>6.0% (Kotor)</span>
              </div>
            </div>

            {/* Volume Sample Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <span>Simulasi Berat Kering Panen (Kg):</span>
                </label>
                <span className="text-sm font-bold text-slate-800">
                  {sampleWeightKg.toLocaleString('id-ID')} Kg ({ (sampleWeightKg / 1000).toFixed(1) } Ton)
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={sampleWeightKg}
                onChange={(e) => setSampleWeightKg(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Recommendation Box */}
            <div className={`p-4 rounded-2xl border ${statusColor} space-y-1.5`}>
              <div className="flex items-center space-x-2 font-bold text-xs">
                {moisture <= 37 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span>Rekomendasi QC Officer Sentra Petani:</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {advice}
              </p>
            </div>

          </div>

          {/* Right Column: Instant Calculation & Payout Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                HASIL PENENTUAN HARGA SESUAI MUTU
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                {grade}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Komoditas: {selectedJenis}
              </p>
            </div>

            {/* Price Per Kg Display */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Harga Transparan per Kg:</div>
                <div className="text-2xl font-black text-emerald-300">
                  {formatIDR(finalPricePerKg)}
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  priceAdj >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {priceAdj >= 0 ? `+${formatIDR(priceAdj)}` : formatIDR(priceAdj)}
                </span>
                <div className="text-[10px] text-slate-400 mt-0.5">vs harga dasar</div>
              </div>
            </div>

            {/* Payout Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Total Nilai Kontrak ({sampleWeightKg.toLocaleString('id-ID')} Kg):</span>
                <span className="font-bold text-white text-sm">{formatIDR(totalPayout)}</span>
              </div>

              {/* Tahap 1 Payout Highlight */}
              <div className="bg-emerald-900/60 p-3.5 rounded-xl border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-emerald-300">Payout Tahap 1 (80%) Instan:</div>
                  <div className="text-lg font-black text-white">{formatIDR(payoutTahap1)}</div>
                  <div className="text-[10px] text-emerald-200/80">Langsung cair di Hub Petani</div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Tahap 2 */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">Pelunasan Tahap 2 (20%):</div>
                  <div className="text-sm font-bold text-amber-300">{formatIDR(payoutTahap2)}</div>
                </div>
                <span className="text-[10px] text-slate-400">Saat QC Pabrik</span>
              </div>
            </div>

            {/* PDF Principle Note */}
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start space-x-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Prinsip PDF Talisea.id:</strong> Standar mutu & harga final mengikuti spesifikasi pembeli. Angka ini menggantikan taksiran sepihak dengan data timbang & kadar air digital yang sah.
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

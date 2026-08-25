import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Coins, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Ship, 
  Truck, 
  Building2,
  Sparkles,
  PieChart
} from 'lucide-react';

export const MarginCalculator: React.FC = () => {
  const [harvestWeightKg, setHarvestWeightKg] = useState<number>(3000);
  const [factoryOfferPrice, setFactoryOfferPrice] = useState<number>(20000);
  const [moistureStandard, setMoistureStandard] = useState<number>(35.0);

  // Traditional breakdown
  // In traditional: Middlemen take ~35-40% margin through rafaksi potongan timbangan (5-10%) and lower base buying price (~Rp 14.500 - 15.500)
  const traditionalFarmerPrice = 15200;
  const traditionalRafaksiPercent = 7.5; // 7.5% weight deduction based on arbitrary feeling
  const traditionalEffectiveWeight = harvestWeightKg * (1 - traditionalRafaksiPercent / 100);
  const traditionalTotalIncome = traditionalEffectiveWeight * traditionalFarmerPrice;

  // Talisea.id breakdown
  // Direct matching to factory with transparent fixed fee:
  // Hub handling fee: Rp 500 / kg
  // Logistics & Sea freight: Rp 1.450 / kg
  // Platform fee: Rp 350 / kg
  // Farmer gets factory price - net handling = ~Rp 17.700 / kg (no bogus weight deductions)
  const logisticsAndHandlingCostPerKg = 2300; // Total handling + ship + trucking + platform
  const taliseaNetFarmerPricePerKg = factoryOfferPrice - logisticsAndHandlingCostPerKg; // Rp 17.700
  const taliseaTotalIncome = harvestWeightKg * taliseaNetFarmerPricePerKg;

  const marginGain = taliseaTotalIncome - traditionalTotalIncome;
  const percentageGain = ((marginGain / traditionalTotalIncome) * 100).toFixed(1);

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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>KALKULATOR MARGIN & EFISIENSI BIAYA (PDF BAB 5 & 8)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kalkulator Selisih Pendapatan Petani & Efisiensi Rantai
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Bandingkan penghasilan riil petani antara skema tengkulak berlapis (potongan timbangan subjektif) vs skema terpadu Talisea.id (QC digital + logistik teragregasi).
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Parameter Simulasi Transaksi Panen
            </h3>

            {/* Volume Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Volume Panen Kering Petani:</span>
                <span className="text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                  {harvestWeightKg.toLocaleString('id-ID')} Kg ({ (harvestWeightKg / 1000).toFixed(1) } Ton)
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={harvestWeightKg}
                onChange={(e) => setHarvestWeightKg(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>500 Kg (1-2 Petani)</span>
                <span>3.000 Kg</span>
                <span>10.000 Kg (Kelompok Tani)</span>
              </div>
            </div>

            {/* Factory Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Harga Beli Pabrik Pengolah Hilir (Franco Pabrik):</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 font-extrabold">
                  {formatIDR(factoryOfferPrice)}/Kg
                </span>
              </div>
              <input
                type="range"
                min="17000"
                max="24000"
                step="250"
                value={factoryOfferPrice}
                onChange={(e) => setFactoryOfferPrice(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Rp 17.000 (Standar)</span>
                <span>Rp 20.000 (Rata-rata Pasar)</span>
                <span>Rp 24.000 (Super Premium)</span>
              </div>
            </div>

            {/* Breakdown of Transparent Costs in Talisea */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>Struktur Biaya Transparan Talisea.id / Kg:</span>
                <span className="text-slate-500 font-normal">Rp 2.300 / Kg Total</span>
              </div>
              
              <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200/60">
                <span>• First-Mile Pickup & Hub Agregasi Sentra:</span>
                <span className="font-semibold text-slate-900">Rp 500/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>• Ekspedisi Kargo Kapal Laut (Mid-Mile):</span>
                <span className="font-semibold text-slate-900">Rp 1.100/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>• Trucking Last-Mile & Bongkar Muat Pabrik:</span>
                <span className="font-semibold text-slate-900">Rp 350/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>• Platform, Escrow & Karantina:</span>
                <span className="font-semibold text-slate-900">Rp 350/kg</span>
              </div>
            </div>

          </div>

          {/* Comparison Cards */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Highlight Comparison Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-lg space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                  TAMBAHAN KEUNTUNGAN BERSIH PETANI
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black">
                +{formatIDR(marginGain)}
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Petani mendapatkan peningkatan penghasilan sebesar <strong>+{percentageGain}%</strong> dibanding menjual ke tengkulak konvensional pada volume {harvestWeightKg.toLocaleString('id-ID')} Kg.
              </p>
            </div>

            {/* Two Column Card Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Traditional Side */}
              <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 pb-2 border-b border-rose-100">
                  <span>Skema Tradisional Lama</span>
                  <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-[10px]">Tengkulak</span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Harga Diterima Petani:</div>
                  <div className="text-sm font-bold text-slate-800">{formatIDR(traditionalFarmerPrice)}/kg</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Potongan Timbangan (Rafaksi):</div>
                  <div className="text-xs font-semibold text-rose-600">~{traditionalRafaksiPercent}% (-{(harvestWeightKg * traditionalRafaksiPercent / 100).toFixed(0)} Kg)</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Waktu Pencairan Uang:</div>
                  <div className="text-xs font-semibold text-amber-700">14 – 28 Hari (Dihutang)</div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400 font-semibold">Total Diterima Petani:</div>
                  <div className="text-lg font-extrabold text-slate-800">{formatIDR(traditionalTotalIncome)}</div>
                </div>
              </div>

              {/* Talisea Side */}
              <div className="bg-white p-5 rounded-2xl border-2 border-emerald-400 shadow-xs space-y-3 relative">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 pb-2 border-b border-emerald-100">
                  <span>Skema Talisea.id</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-[10px] text-emerald-700 font-bold">Terintegrasi</span>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Harga Bersih Petani:</div>
                  <div className="text-sm font-black text-emerald-700">{formatIDR(taliseaNetFarmerPricePerKg)}/kg</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Potongan Timbangan:</div>
                  <div className="text-xs font-bold text-emerald-700">0% (Timbang Digital Teruji)</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Waktu Pencairan Uang:</div>
                  <div className="text-xs font-bold text-cyan-800">&lt; 4 Jam di Hub Agregasi Sentra</div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400 font-semibold">Total Diterima Petani:</div>
                  <div className="text-lg font-black text-emerald-700">{formatIDR(taliseaTotalIncome)}</div>
                </div>
              </div>

            </div>

            <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl text-xs leading-relaxed space-y-1">
              <div className="font-bold text-white flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Kunci Transparansi PDF Talisea.id:</span>
              </div>
              <p>
                Petani tidak dibebani risiko biaya logistik tak terduga. Semua rincian ongkos angkut dan insentif mutu tertulis transparan di Nota Timbang Digital resmi.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

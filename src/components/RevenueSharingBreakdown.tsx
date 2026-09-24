import React, { useState } from 'react';
import { 
  PieChart, 
  TrendingUp, 
  ShieldCheck, 
  Percent, 
  Coins, 
  Ship, 
  Warehouse, 
  Cpu, 
  UserCheck, 
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  Info,
  Building2,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface RevenueSharingBreakdownProps {
  onOpenRegister?: (role?: string) => void;
}

export const RevenueSharingBreakdown: React.FC<RevenueSharingBreakdownProps> = ({ onOpenRegister }) => {
  // Preset simulation base price: Rp 37.000 / Kg
  const [basePrice, setBasePrice] = useState<number>(37000);
  const [volumeKg, setVolumeKg] = useState<number>(3000);

  // Standard component proportions:
  // Base Price: Rp 37.000 (100%)
  // Logistics & Transport: Rp 2.000 (5.4%)
  // Fee Gudang Hub Tarakan/Sentra: Rp 1.000 (2.7%)
  // Fee Platform Talisea.id: Rp 1.000 (2.7%)
  // Farmer Net: Rp 33.000 (89.2%)
  const costComponents = [
    {
      id: 'factory_deposit',
      name: 'Harga Beli Pabrik (Simulasi Awal)',
      isGross: true,
      perKg: basePrice,
      percentage: 100,
      badge: '100% Escrow B2B',
      color: 'slate',
      icon: Building2,
      functionDesc: 'Total dana deposit B2B yang ditransfer pabrik ke Escrow.',
      note: 'Dana diamankan penuh di awal sebelum barang dimuat ke armada laut.'
    },
    {
      id: 'logistics',
      name: 'Biaya Logistik & Transportasi',
      isDeduction: true,
      perKg: Math.round(basePrice * (2000 / 37000)),
      percentage: 5.4,
      badge: '5,4%',
      color: 'cyan',
      icon: Ship,
      functionDesc: 'Sewa kapal feeder Petani–Tarakan + Kontainer Laut.',
      note: 'Termasuk sertifikat karantina tumbuhan laut BKHIT dan asuransi kargo.'
    },
    {
      id: 'hub_tarakan',
      name: 'Fee Gudang Hub Tarakan / Sentra',
      isDeduction: true,
      perKg: Math.round(basePrice * (1000 / 37000)),
      percentage: 2.7,
      badge: '2,7%',
      color: 'teal',
      icon: Warehouse,
      functionDesc: 'Biaya operasional penjemputan, uji QC digital, & bongkar muat.',
      note: 'Uji kadar air moisture meter terkalibrasi + pengarungan karung standar 50kg.'
    },
    {
      id: 'platform_fee',
      name: 'Fee Platform Talisea.id',
      isDeduction: true,
      perKg: Math.round(basePrice * (1000 / 37000)),
      percentage: 2.7,
      badge: '2,7%',
      color: 'blue',
      icon: Cpu,
      functionDesc: 'Pemeliharaan server cloud, lisensi software, & layanan dev.',
      note: 'Menyediakan matching order otomatis, transparansi BAST digital, & WhatsApp gateway.'
    },
    {
      id: 'farmer_net',
      name: 'Harga Terima Bersih Petani',
      isNet: true,
      perKg: basePrice - Math.round(basePrice * (2000 / 37000)) - Math.round(basePrice * (1000 / 37000)) - Math.round(basePrice * (1000 / 37000)),
      percentage: 89.2,
      badge: '89,2% Diterima Petani',
      color: 'emerald',
      icon: UserCheck,
      functionDesc: 'Diterima utuh oleh petani tanpa potongan spekulatif.',
      note: 'Langsung dicairkan bertahap (DP 85% instan di Hub + 15% saat serah terima pabrik).'
    }
  ];

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const farmerPerKg = basePrice - 2000 - 1000 - 1000; // Rp 33.000 for 37.000 default
  const totalTransaction = basePrice * volumeKg;
  const totalFarmerIncome = (basePrice - 4000) * volumeKg;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200 mb-2">
            <Percent className="w-3.5 h-3.5 text-emerald-700" />
            <span>TRANSPARANSI BAGI HASIL RESMI TALISEA.ID</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Persentase Bagi Hasil & Alokasi Komponen Biaya dari Harga Awal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Berdasarkan simulasi harga beli pabrik, petani menerima bersih hingga <strong>89,2%</strong> tanpa potongan liar perantara.
          </p>
        </div>

        {/* Quick Badge */}
        <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
            89%
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-800">Porsi Terbesar untuk Petani</div>
            <div className="text-[10px] text-emerald-700 font-semibold">Timbang digital 0% rafaksi spekulatif</div>
          </div>
        </div>
      </div>

      {/* Interactive Sliders for Custom Simulation */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
            <span>Harga Beli Pabrik (Franco Pabrik Hilir):</span>
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 font-extrabold">
              {formatIDR(basePrice)} / Kg
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="50000"
            step="500"
            value={basePrice}
            onChange={(e) => setBasePrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Rp 10.000</span>
            <span>Rp 50.000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
            <span>Volume Penjualan Panen:</span>
            <span className="text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 font-extrabold">
              {volumeKg.toLocaleString('id-ID')} Kg ({ (volumeKg / 1000).toFixed(1) } Ton)
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="15000"
            step="500"
            value={volumeKg}
            onChange={(e) => setVolumeKg(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>1.000 Kg</span>
            <span>3.000 Kg (Standar Panen)</span>
            <span>15.000 Kg (FCL)</span>
          </div>
        </div>
      </div>

      {/* Main Table: Persentase Bagi Hasil dari Harga Awal */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4 sm:px-6">Komponen Biaya</th>
              <th className="py-3.5 px-4 sm:px-6">Alokasi per Kg</th>
              <th className="py-3.5 px-4 sm:px-6">Persentase</th>
              <th className="py-3.5 px-4 sm:px-6">Fungsi & Peruntukan Operasional</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
            
            {/* 1. Harga Beli Pabrik (Simulasi) */}
            <tr className="hover:bg-slate-50/70 transition-colors bg-white">
              <td className="py-4 px-4 sm:px-6">
                <div className="font-extrabold text-slate-900 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Harga Beli Pabrik (Simulasi)</span>
                    <div className="text-[10px] text-slate-400 font-normal">Titik acuan harga kontrak B2B</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 sm:px-6 font-extrabold text-slate-900">
                {formatIDR(basePrice)}
              </td>
              <td className="py-4 px-4 sm:px-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-800 border border-slate-300">
                  100%
                </span>
              </td>
              <td className="py-4 px-4 sm:px-6 text-slate-600 text-xs leading-relaxed">
                Total dana deposit B2B yang ditransfer pabrik ke <em>Escrow</em>.
              </td>
            </tr>

            {/* 2. Biaya Logistik & Transportasi */}
            <tr className="hover:bg-slate-50/70 transition-colors bg-white">
              <td className="py-4 px-4 sm:px-6">
                <div className="font-semibold text-slate-800 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                    <Ship className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Biaya Logistik & Transportasi</span>
                    <div className="text-[10px] text-slate-400 font-normal">Mid-mile & antarpulau</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 sm:px-6 font-semibold text-rose-700">
                ({formatIDR(Math.round(basePrice * (2000 / 37000)))})
              </td>
              <td className="py-4 px-4 sm:px-6">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                  5,4%
                </span>
              </td>
              <td className="py-4 px-4 sm:px-6 text-slate-600 text-xs leading-relaxed">
                Sewa kapal <em>feeder</em> Petani–Tarakan + Kontainer Laut.
              </td>
            </tr>

            {/* 3. Fee Gudang Hub Tarakan */}
            <tr className="hover:bg-slate-50/70 transition-colors bg-white">
              <td className="py-4 px-4 sm:px-6">
                <div className="font-semibold text-slate-800 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Warehouse className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Fee Gudang Hub Tarakan / Sentra</span>
                    <div className="text-[10px] text-slate-400 font-normal">First-mile & uji mutu digital</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 sm:px-6 font-semibold text-rose-700">
                ({formatIDR(Math.round(basePrice * (1000 / 37000)))})
              </td>
              <td className="py-4 px-4 sm:px-6">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  2,7%
                </span>
              </td>
              <td className="py-4 px-4 sm:px-6 text-slate-600 text-xs leading-relaxed">
                Biaya operasional penjemputan, uji QC digital, & bongkar muat.
              </td>
            </tr>

            {/* 4. Fee Platform Talisea.id */}
            <tr className="hover:bg-slate-50/70 transition-colors bg-white">
              <td className="py-4 px-4 sm:px-6">
                <div className="font-semibold text-slate-800 flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Fee Platform Talisea.id</span>
                    <div className="text-[10px] text-slate-400 font-normal">SaaS & Escrow orchestration</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 sm:px-6 font-semibold text-rose-700">
                ({formatIDR(Math.round(basePrice * (1000 / 37000)))})
              </td>
              <td className="py-4 px-4 sm:px-6">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  2,7%
                </span>
              </td>
              <td className="py-4 px-4 sm:px-6 text-slate-600 text-xs leading-relaxed">
                Pemeliharaan server cloud, lisensi software, & layanan dev.
              </td>
            </tr>

            {/* 5. Harga Terima Bersih Petani (HIGHLIGHT) */}
            <tr className="bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-white font-extrabold border-t-2 border-emerald-400">
              <td className="py-5 px-4 sm:px-6">
                <div className="flex items-center space-x-2 text-emerald-950">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-black">Harga Terima Bersih Petani</span>
                    <div className="text-[10px] text-emerald-700 font-semibold">Tanpa potongan timbangan "remas tangan"</div>
                  </div>
                </div>
              </td>
              <td className="py-5 px-4 sm:px-6 text-base sm:text-lg font-black text-emerald-700">
                {formatIDR(basePrice - Math.round(basePrice * (4000 / 37000)))}
              </td>
              <td className="py-5 px-4 sm:px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-emerald-600 text-white shadow-xs">
                  89,2%
                </span>
              </td>
              <td className="py-5 px-4 sm:px-6 text-emerald-950 text-xs sm:text-sm font-bold leading-relaxed">
                Diterima utuh oleh petani tanpa potongan spekulatif.
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* Visual Percentage Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-700">
          <span>Distribusi Alokasi Setiap Rp 100.000 Nilai Transaksi Pabrik:</span>
          <span className="text-emerald-700">Petani Bersih: 89,2% (Rp 89.200)</span>
        </div>
        
        <div className="h-5 w-full bg-slate-200 rounded-xl overflow-hidden flex shadow-inner">
          <div 
            style={{ width: '89.2%' }} 
            className="bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center transition-all"
            title="Bagian Petani Bersih: 89,2%"
          >
            Petani Bersih 89,2%
          </div>
          <div 
            style={{ width: '5.4%' }} 
            className="bg-cyan-500 text-white text-[9px] font-semibold flex items-center justify-center transition-all"
            title="Logistik & Kargo: 5,4%"
          >
            5,4%
          </div>
          <div 
            style={{ width: '2.7%' }} 
            className="bg-teal-600 text-white text-[9px] font-semibold flex items-center justify-center transition-all"
            title="Hub & QC: 2,7%"
          >
            2,7%
          </div>
          <div 
            style={{ width: '2.7%' }} 
            className="bg-blue-600 text-white text-[9px] font-semibold flex items-center justify-center transition-all"
            title="Platform Talisea: 2,7%"
          >
            2,7%
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 gap-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>Petani Pesisir (89,2%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            <span>Logistik Kargo Laut (5,4%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
            <span>Hub Gudang & QC (2,7%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Platform Cloud Talisea (2,7%)</span>
          </div>
        </div>
      </div>

      {/* Summary Comparison & Benefits Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Nilai Transaksi Kontrak ({ (volumeKg/1000).toFixed(1) } Ton)</div>
          <div className="text-xl font-extrabold text-slate-900">{formatIDR(totalTransaction)}</div>
          <div className="text-[11px] text-slate-500">Deposit 100% aman di Smart Escrow B2B</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
          <div className="text-[11px] font-bold text-emerald-800 uppercase">Total Dana Diterima Petani</div>
          <div className="text-xl font-black text-emerald-700">{formatIDR(totalFarmerIncome)}</div>
          <div className="text-[11px] text-emerald-700 font-medium">85% cair di Petani + 15% di Pabrik</div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-1.5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-teal-800 uppercase">Total Biaya Operasional & Logistik</div>
            <div className="text-xl font-extrabold text-teal-900">{formatIDR(totalTransaction - totalFarmerIncome)}</div>
          </div>
          {onOpenRegister && (
            <button
              onClick={() => onOpenRegister('petani')}
              className="mt-2 w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <span>Gabung Kemitraan Ekosistem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

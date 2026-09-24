import React from 'react';
import { 
  Anchor, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  ShieldCheck, 
  Truck, 
  TrendingUp, 
  Coins, 
  Warehouse, 
  Ship, 
  FileText,
  Clock,
  Sparkles,
  MapPin,
  Building2,
  Percent
} from 'lucide-react';
import { TaliseaLogo } from './TaliseaLogo';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onOpenRegister: (role?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenRegister }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white">
      {/* Subtle Sea / Wave Pattern Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:pt-12 lg:pb-28">
        
        {/* Official Brand Logo Showcase in Hero */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <div className="bg-slate-950/80 backdrop-blur-md px-6 py-3.5 rounded-3xl border border-emerald-500/30 shadow-2xl mb-4">
            <TaliseaLogo theme="white" size="lg" showTagline={true} />
          </div>

          {/* Tagline Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-xs">
              <Anchor className="w-3.5 h-3.5 text-emerald-400" />
              <span>Skema Rantai Pasok Terpadu: Sentra Hulu Petani → Pabrik Hilir</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-teal-900/60 text-cyan-200 border border-teal-700/50">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sentra Pesisir ke Off-Taker Industri</span>
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Menghubungkan <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">Bentangan Tali</span> untuk Kesejahteraan Bersama
          </h1>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            Platform pengelola rantai pasok rumput laut terpadu. 
            <span className="font-semibold text-emerald-300"> Petani tidak perlu repot urus logistik</span>—kami menghubungkan panen sentra pesisir langsung dengan pabrik pengolahan industri hilir melalui digitalisasi QC, transparansi harga, dan pencairan pembayaran bertahap.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('factory-prices')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2.5 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Building2 className="w-5 h-5 text-slate-950" />
              <span>Papan Harga Pabrik & Ongkir</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm sm:text-base border border-slate-700 flex items-center justify-center space-x-2.5 backdrop-blur-md transition-all cursor-pointer"
            >
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Marketplace B2B</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-emerald-300 font-bold text-sm sm:text-base border border-emerald-500/30 flex items-center justify-center space-x-2.5 backdrop-blur-md transition-all hover:border-emerald-400 cursor-pointer"
            >
              <Warehouse className="w-4 h-4 text-emerald-400" />
              <span>Stok Hub Sentra</span>
            </button>

            <button
              onClick={() => setActiveTab('qc-tester')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-teal-950/60 hover:bg-teal-900/80 text-cyan-200 font-semibold text-sm border border-cyan-500/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Simulator QC</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('transparansi-bagi-hasil-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('calculator');
                }
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-extrabold text-sm sm:text-base border border-emerald-400/50 flex items-center justify-center space-x-2.5 backdrop-blur-md transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <Percent className="w-4 h-4 text-emerald-400" />
              <span>★ Bagi Hasil 89,2% Petani</span>
            </button>
          </div>
        </div>

        {/* 4 Core Stakeholder Cards (Integration) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Petani */}
          <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-400/50 transition-all hover:shadow-xl hover:shadow-emerald-950/40 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-4 group-hover:scale-110 transition-transform">
              <Anchor className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">01. Petani Pesisir</div>
            <h3 className="text-base font-bold text-white mb-2">Panen & Pengeringan</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Fokus budidaya & jemur. Pasokan dijemput hub, ditimbang digital transparan tanpa potongan sepihak.
            </p>
            <div className="text-[11px] text-emerald-300 font-semibold flex items-center space-x-1.5 bg-emerald-950/60 py-1.5 px-2.5 rounded-lg border border-emerald-800/40">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>Payout 80–90% Hari yang Sama</span>
            </div>
          </div>

          {/* Card 2: Mitra Hub */}
          <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-teal-500/20 rounded-2xl p-5 hover:border-teal-400/50 transition-all hover:shadow-xl hover:shadow-teal-950/40 group">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 mb-4 group-hover:scale-110 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">02. Hub Agregasi Sentra</div>
            <h3 className="text-base font-bold text-white mb-2">Timbang Digital & QC</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Uji kadar air moisture meter, penerbitan nota digital otomatis, pengarungan standar, dan konsolidasi batch.
            </p>
            <div className="text-[11px] text-teal-300 font-semibold flex items-center space-x-1.5 bg-teal-950/60 py-1.5 px-2.5 rounded-lg border border-teal-800/40">
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Nota Digital QR Terintegrasi</span>
            </div>
          </div>

          {/* Card 3: Ekspedisi Laut */}
          <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-cyan-500/20 rounded-2xl p-5 hover:border-cyan-400/50 transition-all hover:shadow-xl hover:shadow-cyan-950/40 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
              <Ship className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">03. Kargo Ekspedisi</div>
            <h3 className="text-base font-bold text-white mb-2">Mid-Mile Antarpulau</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Pengangkutan laut terjadwal rute kargo reguler dengan pelacakan kontainer dan karantina resmi.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold flex items-center space-x-1.5 bg-cyan-950/60 py-1.5 px-2.5 rounded-lg border border-cyan-800/40">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Tracking GPS Kontainer</span>
            </div>
          </div>

          {/* Card 4: Pabrik Off-taker */}
          <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-amber-500/20 rounded-2xl p-5 hover:border-amber-400/50 transition-all hover:shadow-xl hover:shadow-amber-950/40 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">04. Pabrik Pengolah</div>
            <h3 className="text-base font-bold text-white mb-2">Off-taker Industri</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Menerima suplai kontinu ber-QC terverifikasi, volume konsolidasi besar, harga adil dengan deposit escrow aman.
            </p>
            <div className="text-[11px] text-amber-300 font-semibold flex items-center space-x-1.5 bg-amber-950/60 py-1.5 px-2.5 rounded-lg border border-amber-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>QC Akhir & Pelunasan 10–20%</span>
            </div>
          </div>

        </div>

        {/* Live Banner Numbers from Pilot */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-teal-950/80 border border-emerald-500/30 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">89,2%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Diterima Bersih Petani</div>
              <div className="text-[10px] text-slate-400">dari Harga Beli Pabrik</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">&lt; 4 Jam</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Pencairan Tahap 1 (80%)</div>
              <div className="text-[10px] text-slate-400">Tanpa tunggu kapal sandar</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">100%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Digital QC & Moisture Tester</div>
              <div className="text-[10px] text-slate-400">Transparan & data tersimpan</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Sentra Hulu ➔ Pabrik</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Koridor Rantai Terpadu</div>
              <div className="text-[10px] text-slate-400">First-mile hingga off-taker</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { 
  Anchor, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Heart,
  Scale,
  Ship,
  Building2
} from 'lucide-react';
import { TaliseaLogo } from './TaliseaLogo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenRegister: (role?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenRegister }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Siap Bergabung dalam Rantai Pasok Terpadu?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Koridor Rantai Pasok: Sentra Hulu Petani Pesisir ➔ Pabrik Pengolahan Hilir
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRegister('petani')}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <span>Daftar Mitra Petani / Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenRegister('pabrik')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <span>Buka PO Pembeli Pabrik</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <TaliseaLogo size="md" theme="white" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              Platform orkestrator rantai pasok dan marketplace rumput laut terintegrasi. Menghubungkan bentangan tali petani pesisir dengan industri hilir melalui standarisasi mutu digital, efisiensi logistik antarpulau, dan pencairan pembayaran instan.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 py-1.5 px-3 rounded-xl border border-emerald-800/40 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Smart Escrow & Verified QC Protocol</span>
            </div>
          </div>

          {/* Col 3: Solusi Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigasi Aplikasi
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('landing')} className="hover:text-emerald-400 transition-colors">
                  Beranda & Konsep Rantai
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('factory-prices')} className="hover:text-emerald-400 text-emerald-400 font-semibold transition-colors">
                  ★ Radar Harga Pabrik & Ongkir
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-emerald-400 transition-colors">
                  Marketplace B2B & Live PO
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('inventory')} className="hover:text-emerald-400 transition-colors">
                  Sistem Inventaris Hub Sentra
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('qc-tester')} className="hover:text-emerald-400 transition-colors">
                  Simulator Uji Kadar Air
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('logistics')} className="hover:text-emerald-400 transition-colors">
                  Pelacakan Kargo Laut & Darat
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-400 text-emerald-400 font-semibold transition-colors">
                  ★ Persentase Bagi Hasil & Margin (89,2%)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Titik Operasional */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Koridor Logistik Terpadu
            </div>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Sentra Hulu:</strong> Hub Agregasi & Posko Timbang Pesisir
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Ship className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Mid-Mile:</strong> Kargo Kapal Laut Berjadwal Antarpulau
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Destinasi Hilir:</strong> Pabrik Pengolahan & Off-Taker Industri
                </span>
              </div>
            </div>
          </div>

          {/* Col 5: Kontak & Kolaborasi */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Kontak Tim Operasional
            </div>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a 
                href="https://wa.me/6285249402129?text=Halo%20Talisea.id,%20saya%20tertarik%20dengan%20kemitraan%20rantai%20pasok%20rumput%20laut." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>WhatsApp: +62 852-4940-2129</span>
              </a>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>kontak@talisea.id</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/6285249402129?text=Halo%20Talisea.id,%20saya%20ingin%20konsultasi%20pasokan%20rumput%20laut."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-[11px] font-bold transition-all"
                >
                  <span>Chat WhatsApp Langsung</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; 2026 <strong>Talisea.id</strong>. Menghubungkan Bentangan Tali untuk Kesejahteraan Bersama.
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Standarisasi Mutu</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Dokumentasi API</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

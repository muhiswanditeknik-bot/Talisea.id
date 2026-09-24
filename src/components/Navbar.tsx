import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Layers, 
  ShoppingBag, 
  Warehouse, 
  Activity, 
  Ship, 
  Calculator, 
  UserCheck, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building2,
  FileSpreadsheet
} from 'lucide-react';
import { TaliseaLogo } from './TaliseaLogo';
import { initAuth } from '../lib/googleAuth';
import { User } from 'firebase/auth';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegister: (role?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = initAuth((user) => {
      setGoogleUser(user);
    });
    return () => unsub();
  }, []);

  const sheetId = typeof window !== 'undefined' ? localStorage.getItem('talisea_google_sheet_id') : null;

  const navItems = [
    { id: 'landing', label: 'Beranda & Konsep', icon: Layers },
    { id: 'factory-prices', label: 'Harga Pabrik & Ongkir', icon: Building2, badge: 'Live Radar' },
    { id: 'scheme', label: 'Skema Petani ➔ Pabrik', icon: Anchor, badge: '5 Tahap' },
    { id: 'marketplace', label: 'Marketplace B2B', icon: ShoppingBag, badge: 'Live PO' },
    { id: 'inventory', label: 'Sistem Inventaris', icon: Warehouse, badge: 'Hub Sentra' },
    { id: 'qc-tester', label: 'Simulator QC', icon: Activity },
    { id: 'logistics', label: 'Pelacakan Kargo', icon: Ship },
    { id: 'calculator', label: 'Bagi Hasil & Margin', icon: Calculator, badge: '89,2% Petani' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-slate-950">
              RANTAI TERPADU
            </span>
            <span className="hidden sm:inline font-medium text-slate-200">
              Rantai Pasok Rumput Laut: <span className="text-white font-semibold underline decoration-emerald-400">Sentra Hulu Petani Pesisir → Pabrik Pengolahan Hilir</span>
            </span>
            <span className="sm:hidden font-medium text-slate-200">
              Petani Pesisir → Pabrik Pengolah Hilir
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-300">
            <button 
              onClick={() => onOpenRegister('petani')}
              className="hover:text-emerald-400 transition-colors underline text-[11px] font-semibold hidden md:inline-block cursor-pointer"
            >
              Gabung Mitra Rantai Pasok →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="cursor-pointer group select-none py-1"
          >
            <div className="bg-slate-950 hover:bg-slate-900 px-3.5 py-1.5 rounded-2xl border border-slate-800 shadow-sm flex items-center transition-all group-hover:border-emerald-500/40">
              <TaliseaLogo size="md" showTagline={false} theme="white" />
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 shadow-2xs font-bold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            {sheetId && (
              <a
                href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
                title="Buka Google Sheets Kemitraan (4 Sheet Terpisah)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Sheet</span>
              </a>
            )}

            <button
              onClick={() => setActiveTab('inventory')}
              className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Warehouse className="w-4 h-4 text-emerald-600" />
              <span>Portal Gudang / Hub</span>
            </button>

            <button
              onClick={() => onOpenRegister()}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Daftar Mitra</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold flex items-center"
            >
              <Warehouse className="w-4 h-4 mr-1 text-emerald-600" />
              <span>Hub</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => { setActiveTab('marketplace'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left text-slate-900"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-600 mb-1" />
              <div className="font-bold text-xs">Marketplace B2B</div>
              <div className="text-[10px] text-slate-500">Pabrik & Pembeli</div>
            </button>
            <button
              onClick={() => { setActiveTab('inventory'); setMobileMenuOpen(false); }}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left text-slate-900"
            >
              <Warehouse className="w-5 h-5 text-teal-600 mb-1" />
              <div className="font-bold text-xs">Sistem Stok Hub</div>
              <div className="text-[10px] text-slate-500">Petani & Agregator</div>
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isActive ? 'bg-slate-800 text-emerald-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Daftar Kemitraan Petani & Pabrik</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Anchor, 
  Truck, 
  Building2, 
  Sparkles, 
  Phone, 
  MapPin, 
  User, 
  Mail, 
  Scale, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { TaliseaLogo } from './TaliseaLogo';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'petani'
}) => {
  const [role, setRole] = useState<string>(initialRole || 'petani');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    capacityTonPerMonth: '5',
    seaweedType: 'Eucheuma Cottonii',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Pendaftaran Mitra Berhasil!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Terima kasih, <strong>{formData.name || 'Mitra'}</strong>. Tim Field Officer Talisea.id wilayah {formData.location || 'Nunukan/Pinrang'} akan menghubungi Anda via WhatsApp ({formData.phone || 'kontak terdaftar'}) untuk verifikasi dan penjadwalan inspeksi timbang.
            </p>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
              Status Pendaftaran: <strong>Terverifikasi Masuk Pilot Koridor Nunukan - Pinrang</strong>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              Tutup & Kembali ke Aplikasi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header Brand */}
            <div>
              <TaliseaLogo variant="compact" size="sm" />
              <h2 className="text-xl font-black text-slate-900 mt-2">
                Pendaftaran Mitra Rantai Pasok
              </h2>
              <p className="text-xs text-slate-500">
                Bergabung dalam ekosistem pasokan rumput laut terintegrasi Nunukan – Pinrang.
              </p>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Daftar Sebagai Peran:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('petani')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex flex-col items-center justify-center text-center transition-all ${
                    role === 'petani'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Anchor className="w-4 h-4 mb-1" />
                  <span>Petani / Kelompok</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('logistik')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex flex-col items-center justify-center text-center transition-all ${
                    role === 'logistik'
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Truck className="w-4 h-4 mb-1" />
                  <span>Transporter / Kapal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('pabrik')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold flex flex-col items-center justify-center text-center transition-all ${
                    role === 'pabrik'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 mb-1" />
                  <span>Pabrik Pengolahan</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap / Nama Kelompok Tani / Nama Usaha:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pak Kamaruddin / Pokdakan Mamolo Bersatu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    No. WhatsApp Aktif:
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="0812-xxxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lokasi / Domisili:
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Mamolo Nunukan / Suppa Pinrang"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jenis Komoditas:
                  </label>
                  <select
                    value={formData.seaweedType}
                    onChange={(e) => setFormData({ ...formData, seaweedType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Eucheuma Cottonii">Eucheuma Cottonii</option>
                    <option value="Eucheuma Spinosum">Eucheuma Spinosum</option>
                    <option value="Gracilaria">Gracilaria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kapasitas Panen / Kebutuhan:
                  </label>
                  <select
                    value={formData.capacityTonPerMonth}
                    onChange={(e) => setFormData({ ...formData, capacityTonPerMonth: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="1-3">1 - 3 Ton / Siklus Panen</option>
                    <option value="5">5 - 10 Ton / Bulan</option>
                    <option value="20">1 Kontainer (20 Ton) / Bulan</option>
                    <option value="50">&gt; 50 Ton / Bulan (Skala Industri)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Note about direct payment */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start space-x-2">
              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Keuntungan Mitra:</strong> Jaminan penimbangan digital bersertifikat, bantuan logistik kapal rute Nunukan–Pinrang, dan pencairan pembayaran bertahap 80-90% saat timbang di gudang.
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
            >
              Kirim Formulir Pendaftaran Mitra
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

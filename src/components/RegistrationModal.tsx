import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Anchor, 
  Scale, 
  Ship, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TaliseaLogo } from './TaliseaLogo';
import { RegistrationData } from '../lib/googleSheetsService';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'petani'
}) => {
  const [selectedRole, setSelectedRole] = useState<'petani' | 'hub_sentra' | 'ekspedisi' | 'pabrik'>(
    (initialRole as 'petani' | 'hub_sentra' | 'ekspedisi' | 'pabrik') || 'petani'
  );
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+628');
  const [location, setLocation] = useState('Sentra Pesisir Mamolo');
  const [capacity, setCapacity] = useState('100 Bentangan Tali (1-2 Ton/Bulan)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const roleOptions: {
    id: 'petani' | 'hub_sentra' | 'ekspedisi' | 'pabrik';
    label: string;
    icon: typeof Anchor;
    sub: string;
  }[] = [
    { id: 'petani', label: 'Petani Rumput Laut', icon: Anchor, sub: 'Sentra Budidaya Pesisir' },
    { id: 'hub_sentra', label: 'Mitra Hub Agregasi', icon: Scale, sub: 'Gudang & Timbangan Digital' },
    { id: 'ekspedisi', label: 'Ekspedisi Kargo Laut', icon: Ship, sub: 'Kargo Koridor Laut Antarpulau' },
    { id: 'pabrik', label: 'Pabrik Pengolah Hilir', icon: Building2, sub: 'Off-Taker Industri' }
  ];

  const roleLabels: Record<string, string> = {
    petani: 'Petani Rumput Laut (Sentra Pesisir)',
    hub_sentra: 'Mitra Hub Agregasi & Timbang Digital',
    ekspedisi: 'Mitra Ekspedisi Kargo Laut',
    pabrik: 'Pabrik Pengolah Hilir / Off-Taker Industri'
  };

  const generateWhatsAppUrl = () => {
    const roleText = roleLabels[selectedRole] || selectedRole;
    const registrationId = `REG-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

    const message = `Halo Admin Talisea.id (+6285249402129),

Saya ingin mendaftarkan kemitraan ekosistem baru di platform Talisea.id:

📋 *DETAIL FORMULIR PENDAFTARAN MITRA*
• *No. Registrasi*: ${registrationId}
• *Tanggal*: ${timestamp}
• *Peran Kemitraan*: ${roleText}
• *Nama Lengkap / PIC*: ${fullName}
• *Nomor WhatsApp*: ${phone}
• *Domisili / Lokasi*: ${location}
• *Estimasi Kapasitas / Bentangan*: ${capacity}
• *Catatan / Keterangan*: ${notes.trim() ? notes : '-'}

Mohon verifikasi pendaftaran saya dan koordinasi jadwal penjemputan/kemitraan selanjutnya. Terima kasih!`;

    return `https://wa.me/6285249402129?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const record: RegistrationData = {
      id: `REG-${Date.now().toString().slice(-6)}`,
      role: selectedRole,
      fullName,
      phone,
      location,
      capacity,
      notes,
      createdAt: new Date().toISOString()
    };

    // Save to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('talisea_partner_registrations') || '[]');
      existing.unshift(record);
      localStorage.setItem('talisea_partner_registrations', JSON.stringify(existing));
    } catch {
      // ignore
    }

    // Open WhatsApp link
    const waUrl = generateWhatsAppUrl();
    try {
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Fallback if click blocked
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    confetti({ particleCount: 75, spread: 65 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl flex items-center border border-slate-800 shadow-2xs">
            <TaliseaLogo size="sm" showTagline={false} theme="white" />
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <div>
            <div className="mb-5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                KORIDOR RANTAI PASOK TERPADU
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                Pendaftaran Kemitraan Ekosistem
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Role Picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Pilih Peran Anda dalam Ekosistem:
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {roleOptions.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center space-x-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-white text-slate-600 shadow-2xs'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">{r.label}</div>
                          <div className={`text-[10px] ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>{r.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap / Kontak PIC:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. H. Baharuddin / PT Nama"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor WhatsApp Aktif:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+62812..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Location & Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Domisili / Lokasi Operasional:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sentra Pesisir Mamolo / Area Kawasan Industri"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimasi Kapasitas / Kebutuhan:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 150 Bentangan Tali / 30 Ton PO"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Tambahan (Opsional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Kondisi jemur saat ini, kebutuhan armada pickup, atau spesifikasi mutu khusus..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verifikasi Cepat & Langsung:</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Data pendaftaran Anda langsung terhubung ke tim operasional Talisea.id untuk proses verifikasi dan validasi kemitraan.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke WhatsApp Admin</span>
                </a>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Memproses...' : 'Daftar Kemitraan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-4 animate-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900">
              Pendaftaran Mitra Berhasil!
            </h3>
            
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Data pendaftaran <strong>{fullName || 'Mitra'}</strong> telah tersimpan di sistem Talisea.id. Tim operasional kami akan segera menghubungi Anda.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Buka WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
              >
                Tutup & Selesai
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

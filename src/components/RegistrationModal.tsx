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
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+628');
  const [location, setLocation] = useState('Sentra Pesisir Mamolo');
  const [capacity, setCapacity] = useState('100 Bentangan Tali (1-2 Ton/Bulan)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const roleOptions = [
    { id: 'petani', label: 'Petani Rumput Laut', icon: Anchor, sub: 'Sentra Budidaya Pesisir' },
    { id: 'hub_sentra', label: 'Mitra Hub Agregasi', icon: Scale, sub: 'Gudang & Timbangan Digital' },
    { id: 'ekspedisi', label: 'Ekspedisi Kargo Laut', icon: Ship, sub: 'Kargo Koridor Laut Antarpulau' },
    { id: 'pabrik', label: 'Pabrik Pengolah Hilir', icon: Building2, sub: 'Off-Taker Industri' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <TaliseaLogo size="sm" showTagline={false} />
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                KORIDOR RANTAI PASOK TERPADU
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                Pendaftaran Kemitraan Ekosistem
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Bergabunglah ke dalam rantai pasok terintegrasi Talisea.id untuk kepastian harga, digital QC, dan pembayaran lancar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Role Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Pilih Peran Anda dalam Ekosistem:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roleOptions.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center space-x-2.5 ${
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
                  <span>Jaminan Kerahasiaan & Transparansi Data:</span>
                </div>
                <p className="text-[11px]">
                  Data Anda akan diteruskan ke tim operasional Talisea.id untuk verifikasi lapangan di sentra produksi / kawasan industri pengolah dan jadwal penjemputan percontohan.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                <a
                  href={`https://wa.me/6285249402129?text=Halo%20Talisea.id,%20saya%20ingin%20bergabung%20sebagai%20mitra%20rantai%20pasok%20rumput%20laut.%20Peran:%20${encodeURIComponent(selectedRole)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  💬 Hubungi WA Langsung (+62 852-4940-2129)
                </a>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Kirim Formulir Mitra</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-8 space-y-4 animate-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Pendaftaran Mitra Berhasil!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Terima kasih, <strong>{fullName || 'Mitra'}</strong>. Tim koordinator lapangan Talisea.id akan segera menghubungi nomor WhatsApp <strong>{phone}</strong> untuk koordinasi teknis dan penjemputan batch pertama.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/6285249402129?text=Halo%20Talisea.id,%20saya%20baru%20saja%20mendaftar%20kemitraan%20atas%20nama%20${encodeURIComponent(fullName || 'Mitra')}%20(${encodeURIComponent(location)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <span>Konfirmasi Cepat via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Tutup & Kembali ke Aplikasi
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

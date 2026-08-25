import React from 'react';
import { 
  X, 
  Send, 
  CheckCheck, 
  MessageSquare, 
  Anchor, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SeaweedBatch } from '../types';
import { INITIAL_BATCHES } from '../data/mockData';

interface WhatsAppPreviewModalProps {
  batch?: SeaweedBatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({
  batch,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const currentBatch = batch || INITIAL_BATCHES[0];

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-700 overflow-hidden text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">WhatsApp Bot Talisea.id</h3>
              <p className="text-[10px] text-emerald-400">Notifikasi Otomatis Petani Real-time</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* WhatsApp Chat Bubble Simulation */}
        <div className="bg-[#0b141a] p-4 rounded-2xl border border-slate-800 space-y-3 font-sans">
          
          <div className="text-[10px] text-center text-slate-500 font-semibold my-1">
            HARI INI
          </div>

          {/* Incoming message bubble */}
          <div className="bg-[#202c33] text-slate-100 p-3.5 rounded-2xl rounded-tl-xs text-xs space-y-2 max-w-[95%] shadow-md border border-slate-700/50">
            <div className="font-bold text-emerald-400 flex items-center space-x-1">
              <span>🌿 TALISEA.ID - NOTA TIMBANG RESMI</span>
            </div>

            <p className="text-[11px] leading-relaxed">
              Yth. <strong>{currentBatch.petaniName}</strong>,
              <br />
              Hasil panen rumput laut Anda di <strong>{currentBatch.lokasiTali}</strong> telah selesai ditimbang digital dan lolos uji kadar air di Hub Agregasi Sentra.
            </p>

            <div className="bg-[#111b21] p-2.5 rounded-xl border border-slate-700 text-[11px] space-y-1 font-mono">
              <div className="text-slate-400">Lot: <span className="text-white font-bold">{currentBatch.batchNumber}</span></div>
              <div className="text-slate-400">Jenis: <span className="text-white">{currentBatch.jenisRumputLaut}</span></div>
              <div className="text-slate-400">Berat Kering: <span className="text-emerald-300 font-bold">{currentBatch.beratKeringKg} Kg</span></div>
              <div className="text-slate-400">Kadar Air: <span className="text-emerald-300 font-bold">{currentBatch.kadarAirPersen}% ({currentBatch.grade})</span></div>
              <div className="text-slate-400">Harga: <span className="text-white font-bold">{formatIDR(currentBatch.hargaPerKg)}/Kg</span></div>
            </div>

            <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-500/40 text-[11px] space-y-1">
              <div className="font-bold text-emerald-300">💰 DANA TAHAP 1 (85%) SUDAH DITRANSFER:</div>
              <div className="text-sm font-black text-white">{formatIDR(currentBatch.payoutTahap1)}</div>
              <div className="text-[10px] text-emerald-200/80">
                Sisa 15% ({formatIDR(currentBatch.payoutTahap2)}) akan dicairkan saat kargo diverifikasi pabrik pengolah hilir.
              </div>
            </div>

            <div className="text-[10px] text-cyan-300 flex items-center space-x-1 pt-1 underline">
              <ExternalLink className="w-3 h-3" />
              <span>Lihat Nota Digital & Live Tracking Kargo</span>
            </div>

            <div className="flex justify-end items-center space-x-1 text-[9px] text-slate-400 pt-1">
              <span>14:28</span>
              <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>

        </div>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Petani langsung menerima kepastian tanpa perlu repot datang ke bank atau pusing menagih tengkulak.
          </p>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MessageSquare, X, Send, ArrowRight, ShieldCheck } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const waNumber = '6285249402129';
  const displayPhone = '+62 852-4940-2129';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 text-white animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                TL
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Layanan WhatsApp Talisea</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-300 font-medium">Online & Responsif</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Butuh konsultasi kemitraan panen petani, koordinasi hub penimbangan, atau penawaran PO pabrik pengolah?
          </p>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/50 mb-3 text-[11px] space-y-1">
            <div className="text-slate-400">Nomor WhatsApp Resmi:</div>
            <div className="text-white font-bold text-xs">{displayPhone}</div>
          </div>

          <a
            href={`https://wa.me/${waNumber}?text=Halo%20Talisea.id,%20saya%20ingin%20berkonsultasi%20mengenai%20kemitraan%20rantai%20pasok%20rumput%20laut.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Mulai Chat di WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Kontak WhatsApp"
        className="group relative flex items-center space-x-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping absolute top-2 left-2 opacity-30"></div>
        <MessageSquare className="w-5 h-5 text-slate-950 shrink-0" />
        <span className="font-extrabold tracking-tight hidden sm:inline">WhatsApp 0852-4940-2129</span>
        <span className="font-extrabold sm:hidden">WhatsApp</span>
      </button>
    </div>
  );
};

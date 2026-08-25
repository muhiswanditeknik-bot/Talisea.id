import React from 'react';
import { 
  X, 
  Printer, 
  QrCode, 
  CheckCircle2, 
  Scale, 
  Droplets, 
  MapPin, 
  Calendar, 
  User, 
  Ship, 
  Building2,
  FileCheck
} from 'lucide-react';
import { SeaweedBatch } from '../types';
import { TaliseaLogo } from './TaliseaLogo';

interface ReceiptModalProps {
  batch: SeaweedBatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ batch, isOpen, onClose }) => {
  if (!isOpen || !batch) return null;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[92vh]">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5 print:hidden">
          <span className="text-xs font-bold text-slate-500">Preview Dokumen Digital Resmi</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Nota</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Nota Sheet */}
        <div className="bg-white p-6 rounded-2xl border border-slate-300 text-slate-800 text-xs space-y-5 font-sans">
          
          {/* Top Logo & Title */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div>
              <TaliseaLogo size="sm" showTagline={true} />
              <p className="text-[10px] text-slate-500 mt-1">
                Hub Agregasi & Posko QC First-Mile Sentra Pesisir
              </p>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] font-bold">
                NOTA DIGITAL TERVERIFIKASI
              </span>
              <div className="text-sm font-mono font-black text-slate-900 mt-1">
                {batch.batchNumber}
              </div>
            </div>
          </div>

          {/* Farmer & Batch Identifiers */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">NAMA PETANI / PEMASOK:</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{batch.petaniName}</div>
              <div className="text-[10px] text-slate-500">{batch.petaniPhone}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">LOKASI BENTANGAN TALI:</div>
              <div className="font-bold text-slate-900 mt-0.5">{batch.lokasiTali}</div>
              <div className="text-[10px] text-slate-500">{batch.jumlahBentangan} Bentangan Tali</div>
            </div>
          </div>

          {/* Technical Specs Table */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
              Hasil Pengukuran Digital & Parameter Mutu:
            </div>
            
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50">
                  <td className="py-2 px-3 text-slate-500">Komoditas Rumput Laut</td>
                  <td className="py-2 px-3 font-bold text-slate-900 text-right">{batch.jenisRumputLaut}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-500">Berat Timbangan Kering Bersih</td>
                  <td className="py-2 px-3 font-extrabold text-slate-900 text-right">
                    {batch.beratKeringKg.toLocaleString('id-ID')} Kg ({ (batch.beratKeringKg / 1000).toFixed(2) } Ton)
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-3 text-slate-500">Kadar Air (Digital Moisture Meter)</td>
                  <td className="py-2 px-3 font-extrabold text-emerald-700 text-right">{batch.kadarAirPersen}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-500">Tingkat Impuritas / Garam</td>
                  <td className="py-2 px-3 font-semibold text-slate-800 text-right">{batch.impuritasPersen}%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-2 px-3 text-slate-500">Klasifikasi Grade Mutu</td>
                  <td className="py-2 px-3 font-extrabold text-teal-800 text-right">{batch.grade}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-500">Harga Kontrak per Kg</td>
                  <td className="py-2 px-3 font-bold text-slate-900 text-right">{formatIDR(batch.hargaPerKg)} / Kg</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Staged Breakdown */}
          <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-300 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Total Nilai Kontrak:</span>
              <span className="text-base font-black text-slate-900">{formatIDR(batch.totalNilai)}</span>
            </div>
            
            <div className="pt-2 border-t border-emerald-200 flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-900">✓ Payout Tahap 1 (85% di Hub Agregasi):</span>
              <span className="font-black text-emerald-800 text-sm">{formatIDR(batch.payoutTahap1)}</span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-600">
              <span>Pelunasan Tahap 2 (15% di Pabrik Pengolah):</span>
              <span className="font-bold text-slate-800">{formatIDR(batch.payoutTahap2)}</span>
            </div>
          </div>

          {/* QR Code & Signatures */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-lg flex items-center justify-center p-1.5">
                <QrCode className="w-full h-full" />
              </div>
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <div className="font-bold text-slate-800">Scan Verifikasi Otentik</div>
                <div>ID: {batch.id}</div>
                <div>Inspector: {batch.hubInspector}</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-[10px] text-slate-400">Petugas Timbang & QC</div>
              <div className="font-bold text-slate-800 text-xs mt-6 underline decoration-slate-400">
                {batch.hubInspector.split('(')[0]}
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold">Hub Agregasi Sentra</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

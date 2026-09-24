import React, { useState } from 'react';
import { 
  Ship, 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Thermometer, 
  Droplets, 
  Anchor, 
  CheckCircle2, 
  ArrowRight, 
  Navigation,
  FileCheck,
  PackageCheck,
  AlertCircle
} from 'lucide-react';
import { ACTIVE_LOGISTICS_ROUTES } from '../data/mockData';
import { LogisticsRoute } from '../types';

export const LogisticsTracker: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<LogisticsRoute>(ACTIVE_LOGISTICS_ROUTES[0]);

  const stages = [
    {
      step: 1,
      title: 'First-Mile (Sentra Petani)',
      desc: 'Penjemputan hasil jemur petani di pesisir Mamolo/Sebatik & konsolidasi gudang Hub Petani.',
      status: 'Selesai',
      completed: true,
      icon: Anchor
    },
    {
      step: 2,
      title: 'Pelabuhan Tunon Taka',
      desc: 'Timbang bruto/tara, karantina tumbuhan laut, stuffing ke kontainer berlabel QR & muat kapal roro.',
      status: 'Selesai',
      completed: true,
      icon: PackageCheck
    },
    {
      step: 3,
      title: 'Mid-Mile Pelayaran Laut',
      desc: 'Pelayaran lintas pulau KM Thalia melintasi Selat Makassar rute Pelabuhan Asal Petani menuju Pelabuhan Parepare.',
      status: 'Sedang Berlayar',
      completed: false,
      active: true,
      icon: Ship
    },
    {
      step: 4,
      title: 'Transit Pelabuhan Parepare',
      desc: 'Bongkar kargo di dermaga Parepare & transfer ke armada trucking darat (menuju Pabrik).',
      status: 'Menunggu Sandar',
      completed: false,
      icon: Navigation
    },
    {
      step: 5,
      title: 'Last-Mile & Gudang Pabrik',
      desc: 'Pengantaran ke gudang PT Celebes Seaweed (Pabrik), QC akhir penerimaan, BAST & pelunasan 20%.',
      status: 'Jadwal 27 Agt',
      completed: false,
      icon: Truck
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-900 border border-cyan-200 mb-2">
              <Ship className="w-3.5 h-3.5 text-cyan-700" />
              <span>SISTEM PELACAKAN LOGISTIK MULTI-MODA (PDF BAB 7 & 8)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pelacakan Kargo Laut & Darat: Petani ➔ Pabrik
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              First-Mile Petani • Mid-Mile Kapal Antarpulau • Last-Mile Trucking ke Pintu Pabrik
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {ACTIVE_LOGISTICS_ROUTES.map((route) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedRoute.id === route.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {route.nomorKontainer}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Route Active Banner Card */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-700 pb-6 mb-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/30 text-cyan-300 border border-cyan-400/40">
                  KAPAL DALAM PELAYARAN
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedRoute.nomorKontainer}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{selectedRoute.namaKapal}</h2>
              <div className="text-xs text-slate-300 flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Rute: {selectedRoute.asal} ➔ {selectedRoute.tujuan}</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Total Muatan</div>
                <div className="text-base font-black text-white">{(selectedRoute.totalMuatanKg / 1000).toFixed(1)} Ton</div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Estimasi Tiba (ETA)</div>
                <div className="text-xs font-bold text-cyan-300 mt-1">{selectedRoute.eta}</div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 font-semibold">Kondisi Kontainer</div>
                <div className="text-[11px] font-bold text-emerald-400 mt-1">{selectedRoute.suhuKelembaban}</div>
              </div>
            </div>
          </div>

          {/* Current Live Position */}
          <div className="bg-teal-950/60 p-4 rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
              <span className="font-semibold text-cyan-200">
                Posisi Koordinat Real-time: <span className="font-mono text-white font-bold">{selectedRoute.koordinatSaatIni}</span>
              </span>
            </div>
            <div className="text-slate-300">
              Status: <span className="text-emerald-300 font-bold">{selectedRoute.statusLabel}</span>
            </div>
          </div>

        </div>

        {/* 5-Stage Visual Supply Chain Flow (PDF Page 8) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-6">
            Alur Perjalanan Muatan 5 Tahap (First ➔ Mid ➔ Last Mile)
          </h3>

          <div className="space-y-6">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={idx} className="flex items-start space-x-4 relative group">
                  {/* Timeline connector line */}
                  {idx < stages.length - 1 && (
                    <div className={`absolute left-5 top-10 bottom-0 w-0.5 -ml-px ${
                      stage.completed ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} style={{ height: 'calc(100% - 10px)' }}></div>
                  )}

                  {/* Icon Node */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 ${
                    stage.completed
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : stage.active
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 animate-pulse'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Details Card */}
                  <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                    stage.active
                      ? 'bg-cyan-50/50 border-cyan-300 shadow-xs'
                      : stage.completed
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{stage.title}</span>
                        {stage.completed && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded">
                            ✓ Lolos
                          </span>
                        )}
                        {stage.active && (
                          <span className="text-[10px] font-bold text-cyan-800 bg-cyan-200 px-2 py-0.2 rounded animate-pulse">
                            Sedang Berjalan
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">{stage.status}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Port & Sea Freight Info Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-slate-900">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Kelengkapan Dokumen Karantina & Pelabuhan:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Semua kargo yang diangkut telah melalui pemeriksaan Balai Karantina Hewan, Ikan, dan Tumbuhan (BKHIT) Wilayah Petani dengan sertifikat bebas hama dan dokumen manifest resmi terverifikasi.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-slate-900">
              <Truck className="w-4 h-4 text-cyan-600" />
              <span>Mitra Trucking Last-Mile Pabrik:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Armada trucking siap siaga di Pelabuhan Parepare sebelum kapal sandar untuk mencegah penumpukan kargo dan memastikan barang sampai di pabrik dalam waktu kurang dari 3 jam setelah pembongkaran.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

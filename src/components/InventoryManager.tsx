import React, { useState } from 'react';
import { 
  Warehouse, 
  Plus, 
  Search, 
  Filter, 
  Scale, 
  Droplets, 
  QrCode, 
  FileText, 
  CheckCircle, 
  Clock, 
  Ship, 
  Building, 
  ArrowRight, 
  Coins, 
  Printer, 
  Phone, 
  MapPin, 
  Layers, 
  Sparkles,
  ChevronRight,
  Eye,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_BATCHES } from '../data/mockData';
import { SeaweedBatch, QualityGrade, SeaweedType, BatchStatus } from '../types';

interface InventoryManagerProps {
  onOpenReceipt: (batch: SeaweedBatch) => void;
  onOpenWhatsAppPreview: (batch?: SeaweedBatch) => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ onOpenReceipt, onOpenWhatsAppPreview }) => {
  const [batches, setBatches] = useState<SeaweedBatch[]>(INITIAL_BATCHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQCModalOpen, setIsQCModalOpen] = useState(false);
  const [selectedBatchForQC, setSelectedBatchForQC] = useState<SeaweedBatch | null>(null);

  // Form states for adding new batch
  const [newPetaniName, setNewPetaniName] = useState('');
  const [newPetaniPhone, setNewPetaniPhone] = useState('+628');
  const [newLokasiTali, setNewLokasiTali] = useState('Perairan Mamolo, Sentra Petani');
  const [newBentangan, setNewBentangan] = useState<number>(100);
  const [newJenis, setNewJenis] = useState<SeaweedType>('Eucheuma Cottonii');
  const [newBeratBasah, setNewBeratBasah] = useState<number>(7500);
  const [newBeratKeringEst, setNewBeratKeringEst] = useState<number>(1200);

  // Form states for QC modal
  const [qcWeightKg, setQcWeightKg] = useState<number>(1200);
  const [qcMoisture, setQcMoisture] = useState<number>(35.2);
  const [qcImpurity, setQcImpurity] = useState<number>(1.9);
  const [qcInspector, setQcInspector] = useState('Ilyas R. (QC Lapangan Petani)');

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Helper for grade and price determination based on moisture
  const calculateGradeAndPrice = (moisture: number, jenis: SeaweedType) => {
    let basePrice = jenis === 'Eucheuma Cottonii' ? 19500 : jenis === 'Eucheuma Spinosum' ? 14500 : 12500;
    let grade: QualityGrade = 'Grade A (KA 35-37%)';

    if (moisture < 34.0) {
      grade = 'Super (KA <34%)';
      basePrice += 1000;
    } else if (moisture >= 34.0 && moisture <= 37.0) {
      grade = 'Grade A (KA 35-37%)';
    } else if (moisture > 37.0 && moisture <= 40.0) {
      grade = 'Grade B (KA 38-40%)';
      basePrice -= 1200;
    } else {
      grade = 'Grade C (KA >40% / Jemur Ulang)';
      basePrice -= 3000;
    }

    return { grade, price: basePrice };
  };

  // Filtered Batches
  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.petaniName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          batch.lokasiTali.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalStockKg = batches.reduce((acc, b) => acc + b.beratKeringKg, 0);
  const totalPayout1 = batches.filter(b => b.statusTahap1 === 'terbayar').reduce((acc, b) => acc + b.payoutTahap1, 0);
  const totalActiveBatches = batches.length;
  const totalInVoyage = batches.filter(b => b.status === 'pelayaran_midmile' || b.status === 'loading_kapal').length;

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const batchNo = `TAL-NNK-0826-0${batches.length + 1}`;
    const { grade, price } = calculateGradeAndPrice(35.5, newJenis);
    const totalVal = newBeratKeringEst * price;
    const p1 = Math.round(totalVal * 0.80);
    const p2 = totalVal - p1;

    const newBatch: SeaweedBatch = {
      id: `BAT-NNK-2026-00${batches.length + 1}`,
      batchNumber: batchNo,
      petaniName: newPetaniName,
      petaniPhone: newPetaniPhone,
      lokasiTali: newLokasiTali,
      jumlahBentangan: newBentangan,
      jenisRumputLaut: newJenis,
      tanggalPanen: new Date().toISOString().split('T')[0],
      beratBasahKg: newBeratBasah,
      beratKeringKg: newBeratKeringEst,
      kadarAirPersen: 35.5,
      impuritasPersen: 2.0,
      grade: grade,
      hargaPerKg: price,
      totalNilai: totalVal,
      payoutTahap1: p1,
      payoutTahap2: p2,
      statusTahap1: 'pending',
      statusTahap2: 'pending',
      hubLokasi: 'Hub Posko Agregator Mamolo (Sentra Petani)',
      hubInspector: 'Menunggu Pengujian',
      tujuanPabrik: 'PT Celebes Seaweed Industries (Pabrik)',
      status: 'terdaftar',
      catatan: 'Permintaan penjemputan armada perahu hub lokal sentra petani'
    };

    setBatches([newBatch, ...batches]);
    setIsAddModalOpen(false);
    confetti({ particleCount: 60, spread: 60 });
  };

  const handleOpenQCModal = (batch: SeaweedBatch) => {
    setSelectedBatchForQC(batch);
    setQcWeightKg(batch.beratKeringKg);
    setQcMoisture(batch.kadarAirPersen);
    setQcImpurity(batch.impuritasPersen);
    setIsQCModalOpen(true);
  };

  const handleSaveQC = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatchForQC) return;

    const { grade, price } = calculateGradeAndPrice(qcMoisture, selectedBatchForQC.jenisRumputLaut);
    const totalVal = qcWeightKg * price;
    const p1 = Math.round(totalVal * 0.80);
    const p2 = totalVal - p1;

    const updated = batches.map(b => {
      if (b.id === selectedBatchForQC.id) {
        return {
          ...b,
          beratKeringKg: qcWeightKg,
          kadarAirPersen: qcMoisture,
          impuritasPersen: qcImpurity,
          grade: grade,
          hargaPerKg: price,
          totalNilai: totalVal,
          payoutTahap1: p1,
          payoutTahap2: p2,
          hubInspector: qcInspector,
          tanggalMasukHub: new Date().toISOString().split('T')[0],
          statusTahap1: 'terbayar' as const, // Auto payout tahap 1 on QC pass
          status: 'qc_timbang_selesai' as BatchStatus
        };
      }
      return b;
    });

    setBatches(updated);
    setIsQCModalOpen(false);
    confetti({ particleCount: 80, spread: 70 });
  };

  const handleAdvanceStatus = (batchId: string) => {
    const statusSequence: BatchStatus[] = [
      'terdaftar',
      'dijemput_hub',
      'qc_timbang_selesai',
      'tersimpan_hub',
      'loading_kapal',
      'pelayaran_midmile',
      'tiba_pelabuhan_tujuan',
      'trucking_lastmile',
      'qc_pabrik_selesai',
      'lunas_selesai'
    ];

    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        const curIdx = statusSequence.indexOf(b.status);
        const nextStatus = curIdx < statusSequence.length - 1 ? statusSequence[curIdx + 1] : b.status;
        const isLunas = nextStatus === 'lunas_selesai' || nextStatus === 'qc_pabrik_selesai';
        return {
          ...b,
          status: nextStatus,
          statusTahap2: isLunas ? 'terbayar' : b.statusTahap2
        };
      }
      return b;
    }));
  };

  const getStatusBadge = (status: BatchStatus) => {
    switch (status) {
      case 'terdaftar':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">Didaftarkan Petani</span>;
      case 'dijemput_hub':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">Dijemput Hub</span>;
      case 'qc_timbang_selesai':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800">QC & Payout 1 Selesai</span>;
      case 'tersimpan_hub':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">Konsolidasi Gudang</span>;
      case 'loading_kapal':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-100 text-cyan-800">Muat Kapal Petani</span>;
      case 'pelayaran_midmile':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800">Pelayaran Kargo Laut</span>;
      case 'tiba_pelabuhan_tujuan':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">Tiba di Parepare/Sulsel</span>;
      case 'trucking_lastmile':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-800">Trucking ke Pabrik</span>;
      case 'qc_pabrik_selesai':
      case 'lunas_selesai':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">Lunas & Selesai di Pabrik</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Warehouse className="w-4 h-4" />
              <span>Sistem Manajemen Inventaris & Hub Agregator Petani</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Manajemen Lot Panen, QC Timbangan & Payout Petani
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Pencatatan digital dari bentangan tali laut hingga kontainer kargo laut ke Pabrik
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-emerald-600/20 transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Input Panen Petani Baru</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Total Stok Kering di Hub</span>
              <Warehouse className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {totalStockKg.toLocaleString('id-ID')} <span className="text-sm font-semibold text-slate-500">Kg</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              {(totalStockKg / 1000).toFixed(2)} Ton Konsolidasi Siap Kargo
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Payout Tahap 1 Dicairkan</span>
              <Coins className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-teal-800">
              {formatIDR(totalPayout1)}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              80% dibayar di hari timbang di Hub Petani
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Batch Dalam Kargo Laut</span>
              <Ship className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-2xl font-black text-cyan-800">
              {totalInVoyage} <span className="text-sm font-semibold text-slate-500">Batch</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Rute Petani ➔ Parepare/Pabrik
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Akurasi QC Rata-rata</span>
              <Scale className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-800">
              35.4% <span className="text-sm font-semibold text-slate-500">KA</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              Standard Mutu Industri Terpenuhi
            </div>
          </div>

        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama petani, nomor lot, atau lokasi tali..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
            >
              <option value="all">Semua Status Rantai</option>
              <option value="terdaftar">Didaftarkan Petani</option>
              <option value="dijemput_hub">Dijemput Hub</option>
              <option value="qc_timbang_selesai">QC & Timbang Selesai</option>
              <option value="tersimpan_hub">Konsolidasi di Gudang</option>
              <option value="loading_kapal">Muat Kapal</option>
              <option value="pelayaran_midmile">Dalam Pelayaran Laut</option>
              <option value="lunas_selesai">Selesai / Lunas</option>
            </select>
          </div>
        </div>

        {/* Batches Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3.5 px-4">Nomor Batch & Petani</th>
                  <th className="py-3.5 px-4">Komoditas & Lokasi Tali</th>
                  <th className="py-3.5 px-4">Hasil QC (KA & Berat)</th>
                  <th className="py-3.5 px-4">Harga & Nilai Kontrak</th>
                  <th className="py-3.5 px-4">Status Payout Bertahap</th>
                  <th className="py-3.5 px-4">Status Rantai Pasok</th>
                  <th className="py-3.5 px-4 text-center">Aksi & Nota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Batch & Farmer */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-mono font-bold text-slate-900 text-xs">{batch.batchNumber}</div>
                      <div className="font-bold text-emerald-800 text-xs mt-0.5">{batch.petaniName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{batch.petaniPhone}</span>
                      </div>
                    </td>

                    {/* Commodity & Tali */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-semibold text-slate-800">{batch.jenisRumputLaut}</div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{batch.lokasiTali}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        {batch.jumlahBentangan} Bentangan Tali
                      </div>
                    </td>

                    {/* QC & Weight */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900 text-xs">
                        {batch.beratKeringKg.toLocaleString('id-ID')} Kg Kering
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] mt-0.5">
                        <span className="text-emerald-700 font-semibold">{batch.kadarAirPersen}% KA</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600">Imp: {batch.impuritasPersen}%</span>
                      </div>
                      <div className="text-[10px] font-bold text-teal-700 mt-0.5">
                        {batch.grade}
                      </div>
                    </td>

                    {/* Pricing */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-black text-slate-900 text-xs">
                        {formatIDR(batch.totalNilai)}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        @{formatIDR(batch.hargaPerKg)}/Kg
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                        Pabrik: {batch.tujuanPabrik.split('-')[0]}
                      </div>
                    </td>

                    {/* Staged Payout */}
                    <td className="py-3.5 px-4 align-top space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Tahap 1 (80%):</span>
                        <span className={`font-bold ${batch.statusTahap1 === 'terbayar' ? 'text-emerald-700' : 'text-amber-600'}`}>
                          {batch.statusTahap1 === 'terbayar' ? '✓ Lunas' : 'Menunggu QC'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Tahap 2 (20%):</span>
                        <span className={`font-bold ${batch.statusTahap2 === 'terbayar' ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {batch.statusTahap2 === 'terbayar' ? '✓ Lunas' : 'Saat Tiba Pabrik'}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 align-top">
                      <div>{getStatusBadge(batch.status)}</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        {batch.hubInspector}
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 align-top text-center space-y-1.5">
                      
                      <div className="flex items-center justify-center space-x-1.5">
                        {/* Open Receipt */}
                        <button
                          onClick={() => onOpenReceipt(batch)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center"
                          title="Cetak Nota Digital QR"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                        </button>

                        {/* WhatsApp Alert */}
                        <button
                          onClick={() => onOpenWhatsAppPreview(batch)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center"
                          title="Kirim Notifikasi WhatsApp"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        {/* Input QC */}
                        <button
                          onClick={() => handleOpenQCModal(batch)}
                          className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold flex items-center"
                          title="Input Uji Kadar Air & Timbang"
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Advance Workflow Status */}
                      {batch.status !== 'lunas_selesai' && (
                        <button
                          onClick={() => handleAdvanceStatus(batch.id)}
                          className="w-full py-1 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <span>Proses Alur</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Input New Farmer Harvest */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Pendaftaran Panen Petani Baru</h3>
                    <p className="text-[11px] text-slate-500">Pilot Sentra Petani: First-mile pickup request</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddBatch} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Petani:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pak Baharuddin"
                      value={newPetaniName}
                      onChange={(e) => setNewPetaniName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+628..."
                      value={newPetaniPhone}
                      onChange={(e) => setNewPetaniPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi Bentangan:</label>
                    <select
                      value={newLokasiTali}
                      onChange={(e) => setNewLokasiTali(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none"
                    >
                      <option value="Mamolo, Sentra Petani">Mamolo, Sentra Petani</option>
                      <option value="Sebatik Timur, Perbatasan">Sebatik Timur, Perbatasan</option>
                      <option value="Mansapa, Sentra Petani">Mansapa, Sentra Petani</option>
                      <option value="Tanjung Ahus, Sentra Petani">Tanjung Ahus, Sentra Petani</option>
                      <option value="Tanjung Cantik, Sentra Petani">Tanjung Cantik, Sentra Petani</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Tali Bentangan:</label>
                    <input
                      type="number"
                      required
                      min="10"
                      value={newBentangan}
                      onChange={(e) => setNewBentangan(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Rumput Laut:</label>
                  <select
                    value={newJenis}
                    onChange={(e) => setNewJenis(e.target.value as SeaweedType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none"
                  >
                    <option value="Eucheuma Cottonii">Eucheuma Cottonii (Kadar Karagenan Tinggi)</option>
                    <option value="Eucheuma Spinosum">Eucheuma Spinosum (Iota Karagenan)</option>
                    <option value="Gracilaria">Gracilaria (Agar-agar)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Berat Basah Panen (Kg):</label>
                    <input
                      type="number"
                      min="100"
                      value={newBeratBasah}
                      onChange={(e) => setNewBeratBasah(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estimasi Kering (Kg):</label>
                    <input
                      type="number"
                      min="50"
                      value={newBeratKeringEst}
                      onChange={(e) => setNewBeratKeringEst(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Layanan Penjemputan Hub Petani:</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Armada perahu/pickup hub akan menjemput ke lokasi penjemuran petani, melakukan timbang digital di tempat, dan menerbitkan nota timbang.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                  >
                    Simpan & Ajukan Pickup
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Modal: Input QC & Digital Scale Results */}
        {isQCModalOpen && selectedBatchForQC && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Uji QC Digital & Timbang Hub</h3>
                    <p className="text-[11px] text-slate-500 font-mono">{selectedBatchForQC.batchNumber} - {selectedBatchForQC.petaniName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsQCModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveQC} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Berat Timbangan Digital Bersih (Kg):
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="50"
                    value={qcWeightKg}
                    onChange={(e) => setQcWeightKg(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kadar Air Moisture Meter (%):
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="25"
                      max="50"
                      value={qcMoisture}
                      onChange={(e) => setQcMoisture(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-800 focus:bg-white focus:outline-none"
                      required
                    />
                    <div className="text-[10px] text-slate-400 mt-0.5">Target Industri: 35-37%</div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Impuritas / Pasir / Sampah (%):
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="10"
                      value={qcImpurity}
                      onChange={(e) => setQcImpurity(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none"
                      required
                    />
                    <div className="text-[10px] text-slate-400 mt-0.5">Maksimum: 3%</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inspector / QC Officer Hub:</label>
                  <input
                    type="text"
                    value={qcInspector}
                    onChange={(e) => setQcInspector(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                {/* Calculation preview */}
                {(() => {
                  const { grade, price } = calculateGradeAndPrice(qcMoisture, selectedBatchForQC.jenisRumputLaut);
                  const total = qcWeightKg * price;
                  const p1 = Math.round(total * 0.80);
                  const p2 = total - p1;
                  return (
                    <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Hasil Penentuan Mutu:</span>
                        <span className="font-bold text-emerald-400">{grade}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Harga per Kg:</span>
                        <span className="font-bold text-white">{formatIDR(price)}/Kg</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Total Nilai Batch:</span>
                        <span className="font-black text-white text-sm">{formatIDR(total)}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-emerald-300 font-semibold">Payout Awal Tahap 1 (80%):</span>
                        <span className="font-black text-emerald-400 text-base">{formatIDR(p1)}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        * Dana Tahap 1 langsung cair ke petani begitu QC disimpan. Sisa 20% ({formatIDR(p2)}) cair saat tiba di pabrik.
                      </div>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQCModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/30 flex items-center space-x-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Simpan & Cairkan Payout Tahap 1</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

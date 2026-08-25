import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Ship, 
  Truck, 
  DollarSign, 
  Scale, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Plus, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Clock, 
  FileSpreadsheet, 
  AlertCircle,
  ExternalLink,
  Search,
  Check
} from 'lucide-react';
import { 
  SeaweedType, 
  FactoryPriceOffer, 
  FarmerOriginRegion, 
  RegionalShippingRouteCost 
} from '../types';
import { 
  INITIAL_FACTORY_OFFERS, 
  FARMER_ORIGIN_REGIONS, 
  SHIPPING_ROUTE_COSTS 
} from '../data/mockData';

interface RegionalFactoryPriceBoardProps {
  onOpenRegister?: (role?: string) => void;
}

export const RegionalFactoryPriceBoard: React.FC<RegionalFactoryPriceBoardProps> = ({ 
  onOpenRegister 
}) => {
  // Master state for factory price offers (allows live updates)
  const [factoryOffers, setFactoryOffers] = useState<FactoryPriceOffer[]>(INITIAL_FACTORY_OFFERS);
  
  // Active Filter state for Factory Price Board
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<SeaweedType | 'ALL'>('ALL');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Farmer Route Simulator State
  const [selectedOriginId, setSelectedOriginId] = useState<string>('ORIGIN-KALTARA-01');
  const [selectedSimSeaweedType, setSelectedSimSeaweedType] = useState<SeaweedType>('Eucheuma Cottonii');
  const [volumeKg, setVolumeKg] = useState<number>(15000); // 15 Ton standard container
  const [moisturePercent, setMoisturePercent] = useState<number>(35.0);
  const [selectedDestinationFactoryId, setSelectedDestinationFactoryId] = useState<string>('ALL'); // 'ALL' = compare all, or specific ID

  // Modal State for Updating/Adding Factory Price
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'update' | 'add'>('add');
  const [targetFactoryId, setTargetFactoryId] = useState<string>('');
  
  // Form input fields for modal
  const [formFactoryName, setFormFactoryName] = useState<string>('');
  const [formRegion, setFormRegion] = useState<string>('Sulawesi Selatan');
  const [formCity, setFormCity] = useState<string>('');
  const [formSeaweedType, setFormSeaweedType] = useState<SeaweedType>('Eucheuma Cottonii');
  const [formBuyingPrice, setFormBuyingPrice] = useState<number>(20500);
  const [formMaxMoisture, setFormMaxMoisture] = useState<number>(36.0);
  const [formMinVolumeTon, setFormMinVolumeTon] = useState<number>(15);
  const [formPaymentTerm, setFormPaymentTerm] = useState<string>('Escrow Talisea: DP 85% Timbang + 15% Tiba');
  const [formPicContact, setFormPicContact] = useState<string>('+6285249402129');
  const [formNotes, setFormNotes] = useState<string>('');
  const [showUpdateSuccess, setShowUpdateSuccess] = useState<boolean>(false);

  // Selected Farmer Origin details
  const selectedOrigin = useMemo(() => {
    return FARMER_ORIGIN_REGIONS.find(r => r.id === selectedOriginId) || FARMER_ORIGIN_REGIONS[0];
  }, [selectedOriginId]);

  // Format IDR Helper
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Filtered factories list for the Board
  const filteredFactories = useMemo(() => {
    return factoryOffers.filter(factory => {
      const matchType = selectedTypeFilter === 'ALL' || factory.seaweedType === selectedTypeFilter;
      const matchRegion = selectedRegionFilter === 'ALL' || factory.region === selectedRegionFilter;
      const matchSearch = searchQuery === '' || 
        factory.factoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        factory.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        factory.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchRegion && matchSearch;
    });
  }, [factoryOffers, selectedTypeFilter, selectedRegionFilter, searchQuery]);

  // Unique regions list
  const uniqueRegions = useMemo(() => {
    const set = new Set(factoryOffers.map(f => f.region));
    return Array.from(set);
  }, [factoryOffers]);

  // Calculate Route Comparison for the selected origin & seaweed type
  const routeCalculations = useMemo(() => {
    // Matching factories for this seaweed type
    const matchingFactories = factoryOffers.filter(f => f.seaweedType === selectedSimSeaweedType && f.status === 'active');

    return matchingFactories.map(factory => {
      // Find shipping route cost
      const routeCost = SHIPPING_ROUTE_COSTS.find(
        r => r.originId === selectedOriginId && r.destinationFactoryId === factory.id
      ) || {
        id: `DEFAULT-${selectedOriginId}-${factory.id}`,
        originId: selectedOriginId,
        destinationFactoryId: factory.id,
        seaFreightPerKg: 1300,
        portHandlingPerKg: 200,
        truckingLastMilePerKg: 300,
        quarantineInsurancePerKg: 100,
        transitDays: 4,
        transportMode: 'Kapal Laut + Trucking' as const,
        routeNotes: 'Estimasi rute logistik standar antarpulau.'
      };

      const firstMileHandling = selectedOrigin.firstMileCostPerKg + selectedOrigin.hubHandlingCostPerKg;
      const totalShippingCostPerKg = 
        firstMileHandling + 
        routeCost.seaFreightPerKg + 
        routeCost.portHandlingPerKg + 
        routeCost.truckingLastMilePerKg + 
        routeCost.quarantineInsurancePerKg;

      // Net farmgate payout received by farmer at Hub
      const netPayoutPerKg = factory.buyingPricePerKg - totalShippingCostPerKg;
      const localTraderPrice = selectedOrigin.localTraderBasePrice[selectedSimSeaweedType] || 15000;
      const marginGainPerKg = netPayoutPerKg - localTraderPrice;
      const marginPercent = ((marginGainPerKg / localTraderPrice) * 100).toFixed(1);

      const totalGrossRevenue = factory.buyingPricePerKg * volumeKg;
      const totalShippingCost = totalShippingCostPerKg * volumeKg;
      const totalNetPayout = netPayoutPerKg * volumeKg;
      const totalLocalTraderValue = localTraderPrice * volumeKg;
      const totalAdditionalProfit = marginGainPerKg * volumeKg;

      const payoutTahap1 = totalNetPayout * 0.85;
      const payoutTahap2 = totalNetPayout * 0.15;

      return {
        factory,
        routeCost,
        firstMileHandling,
        totalShippingCostPerKg,
        netPayoutPerKg,
        localTraderPrice,
        marginGainPerKg,
        marginPercent,
        totalGrossRevenue,
        totalShippingCost,
        totalNetPayout,
        totalLocalTraderValue,
        totalAdditionalProfit,
        payoutTahap1,
        payoutTahap2,
        transitDays: routeCost.transitDays,
        transportMode: routeCost.transportMode,
        routeNotes: routeCost.routeNotes
      };
    }).sort((a, b) => b.netPayoutPerKg - a.netPayoutPerKg);
  }, [factoryOffers, selectedOriginId, selectedSimSeaweedType, volumeKg, selectedOrigin]);

  // Best recommended factory
  const bestRoute = routeCalculations[0];

  // Specific selected factory route if single chosen
  const specificRoute = useMemo(() => {
    if (selectedDestinationFactoryId === 'ALL') return null;
    return routeCalculations.find(r => r.factory.id === selectedDestinationFactoryId) || routeCalculations[0];
  }, [routeCalculations, selectedDestinationFactoryId]);

  // Open modal to update existing factory
  const handleOpenEdit = (factory: FactoryPriceOffer) => {
    setModalMode('update');
    setTargetFactoryId(factory.id);
    setFormFactoryName(factory.factoryName);
    setFormRegion(factory.region);
    setFormCity(factory.city);
    setFormSeaweedType(factory.seaweedType);
    setFormBuyingPrice(factory.buyingPricePerKg);
    setFormMaxMoisture(factory.maxMoisturePercent);
    setFormMinVolumeTon(factory.minVolumeTon);
    setFormPaymentTerm(factory.paymentTerm);
    setFormPicContact(factory.picContact);
    setFormNotes(factory.notes || '');
    setIsUpdateModalOpen(true);
  };

  // Open modal to add new factory
  const handleOpenAdd = () => {
    setModalMode('add');
    setTargetFactoryId('');
    setFormFactoryName('');
    setFormRegion('Sulawesi Selatan');
    setFormCity('');
    setFormSeaweedType('Eucheuma Cottonii');
    setFormBuyingPrice(20500);
    setFormMaxMoisture(36.0);
    setFormMinVolumeTon(15);
    setFormPaymentTerm('Escrow Talisea: DP 85% Timbang Sentra + 15% Bongkar');
    setFormPicContact('+6285249402129');
    setFormNotes('');
    setIsUpdateModalOpen(true);
  };

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timestampStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (modalMode === 'update' && targetFactoryId) {
      setFactoryOffers(prev => prev.map(f => {
        if (f.id === targetFactoryId) {
          const prevPrice = f.buyingPricePerKg;
          const change = formBuyingPrice - prevPrice;
          const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
          return {
            ...f,
            factoryName: formFactoryName,
            region: formRegion,
            city: formCity,
            seaweedType: formSeaweedType,
            buyingPricePerKg: formBuyingPrice,
            previousPricePerKg: prevPrice,
            priceTrend: trend,
            priceChangeAmount: change,
            maxMoisturePercent: formMaxMoisture,
            minVolumeTon: formMinVolumeTon,
            paymentTerm: formPaymentTerm,
            picContact: formPicContact,
            notes: formNotes,
            lastUpdated: `${timestampStr} (Baru Saja)`
          };
        }
        return f;
      }));
    } else {
      // Add new
      const newId = `FAC-CUSTOM-${Date.now()}`;
      const newOffer: FactoryPriceOffer = {
        id: newId,
        factoryName: formFactoryName || 'Pabrik Pengolahan Baru',
        region: formRegion,
        city: formCity || 'Kota Industri',
        seaweedType: formSeaweedType,
        gradeRequirement: 'Grade A (KA 35-37%)',
        maxMoisturePercent: formMaxMoisture,
        buyingPricePerKg: formBuyingPrice,
        previousPricePerKg: formBuyingPrice,
        minVolumeTon: formMinVolumeTon,
        maxVolumeTon: formMinVolumeTon * 10,
        paymentTerm: formPaymentTerm,
        verifiedFactory: true,
        lastUpdated: `${timestampStr} (Baru Saja)`,
        priceTrend: 'up',
        priceChangeAmount: 0,
        picContact: formPicContact,
        notes: formNotes || 'Penawaran baru via platform Talisea.',
        status: 'active'
      };
      setFactoryOffers(prev => [newOffer, ...prev]);
    }

    setIsUpdateModalOpen(false);
    setShowUpdateSuccess(true);
    setTimeout(() => setShowUpdateSuccess(false), 4000);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Success Notification Banner */}
      {showUpdateSuccess && (
        <div className="bg-emerald-500 text-slate-950 px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 font-bold" />
            <span className="font-bold text-xs sm:text-sm">
              Data harga beli pabrik berhasil diperbarui secara langsung ke sistem dan simulator rute!
            </span>
          </div>
          <button 
            onClick={() => setShowUpdateSuccess(false)}
            className="text-slate-950 hover:opacity-75 font-bold text-xs px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-teal-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>RADAR HARGA PABRIK & SIMULATOR LOGISTIK TERPADU</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Papan Update Harga Pabrik & <span className="text-emerald-400">Estimasi Ongkir Antar-Daerah</span>
          </h1>

          <p className="mt-4 text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
            Pantau penawaran harga beli pabrik (*Franco*) di berbagai kawasan industri di Indonesia, ketahui harga acuan bersih di sentra petani sebelum ongkir, serta simulasikan pilihan rute pabrik tujuan dengan kalkulasi margin keuntungan tertinggi.
          </p>

          {/* Quick Stats Header */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 font-medium">Pabrik Terdaftar</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">{factoryOffers.length} Industri</div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-semibold">✓ 100% Terverifikasi</div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 font-medium">Harga Tertinggi Cottonii</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">
                {formatIDR(Math.max(...factoryOffers.filter(f => f.seaweedType === 'Eucheuma Cottonii').map(f => f.buyingPricePerKg)))}/Kg
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Franco Jawa Timur</div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 font-medium">Sentra Hulu Petani</div>
              <div className="text-xl sm:text-2xl font-black text-cyan-300 mt-0.5">{FARMER_ORIGIN_REGIONS.length} Wilayah</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Kaltara, Sulsel, NTB, NTT, Jatim</div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 font-medium">Rata-rata Margin Petani</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">+22.4%</div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-semibold">vs Tengkulak Konvensional</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Update / Pasang Harga Pabrik Baru</span>
            </button>
            <a
              href="#simulator-rute"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center space-x-2 transition-all"
            >
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>Buka Simulator Rute & Ongkir Petani</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: SIMULATOR RUTE & ESTIMASI ONGKIR ANTAR-DAERAH UNTUK PETANI    */}
      {/* ========================================================================= */}
      <div id="simulator-rute" className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 mb-2">
              <Scale className="w-3.5 h-3.5 text-teal-600" />
              <span>SIMULATOR TRANSAKSI & LOGISTIK PETANI</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Kalkulator Pilihan Pabrik Tujuan & Selisih Bersih Petani
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pilih daerah asal sentra budidaya Anda, tentukan jenis & volume panen, lalu bandingkan keuntungan bersih setelah dipotong ongkos kirim.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900">Jaminan Transparansi Rantai</div>
              <div className="text-slate-500 text-[11px]">85% cair di Hub Sentra saat timbang digital</div>
            </div>
          </div>
        </div>

        {/* 3 Step Interactive Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8">
          
          {/* Step 1: Pilih Asal Daerah Petani */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Daerah Sentra Petani (Asal)</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {selectedOrigin.province}
              </span>
            </label>
            <select
              value={selectedOriginId}
              onChange={(e) => setSelectedOriginId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              {FARMER_ORIGIN_REGIONS.map((origin) => (
                <option key={origin.id} value={origin.id}>
                  {origin.regionName} ({origin.province})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Hub Penimbangan:</span>
              <span className="font-medium text-slate-700 text-right truncate max-w-[180px]">{selectedOrigin.hubCenter}</span>
            </div>
          </div>

          {/* Step 2: Jenis & Volume Rumput Laut */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Komoditas & Volume Panen</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {(volumeKg / 1000).toFixed(1)} Ton
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedSimSeaweedType}
                onChange={(e) => setSelectedSimSeaweedType(e.target.value as SeaweedType)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              >
                <option value="Eucheuma Cottonii">Cottonii</option>
                <option value="Eucheuma Spinosum">Spinosum</option>
                <option value="Gracilaria">Gracilaria</option>
              </select>

              <select
                value={volumeKg}
                onChange={(e) => setVolumeKg(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              >
                <option value={2000}>2.000 Kg (2 Ton)</option>
                <option value={5000}>5.000 Kg (5 Ton)</option>
                <option value={10000}>10.000 Kg (10 Ton)</option>
                <option value={15000}>15.000 Kg (1 Kontainer 20ft)</option>
                <option value={25000}>25.000 Kg (1 Kontainer 40ft)</option>
                <option value={50000}>50.000 Kg (50 Ton)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Uji Kadar Air (KA):</span>
              <div className="flex items-center space-x-1.5">
                <input
                  type="range"
                  min="32"
                  max="40"
                  step="0.5"
                  value={moisturePercent}
                  onChange={(e) => setMoisturePercent(Number(e.target.value))}
                  className="w-20 h-1.5 bg-slate-300 rounded-lg accent-emerald-600"
                />
                <span className="font-bold text-slate-800 font-mono">{moisturePercent}%</span>
              </div>
            </div>
          </div>

          {/* Step 3: Pilihan Tujuan Pabrik */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Pilihan Pabrik Tujuan</span>
              </span>
              <span className="text-[10px] text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                {routeCalculations.length} Pabrik Tersedia
              </span>
            </label>

            <select
              value={selectedDestinationFactoryId}
              onChange={(e) => setSelectedDestinationFactoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="ALL">⭐ Bandingkan Semua Pabrik (Cari Margin Tertinggi)</option>
              {routeCalculations.map((item) => (
                <option key={item.factory.id} value={item.factory.id}>
                  {item.factory.factoryName} - {item.factory.city} ({formatIDR(item.factory.buyingPricePerKg)}/Kg)
                </option>
              ))}
            </select>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Status Pasar:</span>
              <span className="text-emerald-700 font-bold">Terhubung Langsung Off-Taker</span>
            </div>
          </div>

        </div>

        {/* Price Baseline at Farmer Origin (Harga Sebelum Ongkir) Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Harga Acuan Bersih di {selectedOrigin.regionName} (Sebelum Estimasi Ongkir):
              </div>
              <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-emerald-800">
                  {formatIDR(selectedOrigin.hubBasePriceBeforeShipping[selectedSimSeaweedType])}
                  <span className="text-xs font-normal text-emerald-700"> / Kg</span>
                </span>
                <span className="text-xs text-slate-500 line-through">
                  Tengkulak Lokal: {formatIDR(selectedOrigin.localTraderBasePrice[selectedSimSeaweedType])}/Kg
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                  Selisih +{formatIDR(selectedOrigin.hubBasePriceBeforeShipping[selectedSimSeaweedType] - selectedOrigin.localTraderBasePrice[selectedSimSeaweedType])}/Kg
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                *Petani menerima timbang digital bersih di Hub tanpa potongan sepihak. Biaya jemput first-mile ({formatIDR(selectedOrigin.firstMileCostPerKg)}/kg) & handling QC ({formatIDR(selectedOrigin.hubHandlingCostPerKg)}/kg) sudah dikalkulasikan transparan.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => onOpenRegister && onOpenRegister('petani')}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <span>Daftar Setor Panen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Detailed Breakdown Card if 1 Factory Selected, or Ranking Matrix if 'ALL' */}
        {specificRoute ? (
          /* Single Destination Breakdown View */
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                  RUTE TERPILIH: {selectedOrigin.regionName} ➔ {specificRoute.factory.city}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  {specificRoute.factory.factoryName}
                </h3>
                <div className="text-xs text-slate-400 flex items-center space-x-3 mt-1">
                  <span>📍 {specificRoute.factory.city}, {specificRoute.factory.region}</span>
                  <span>•</span>
                  <span>🚢 Estimasi Pengiriman: {specificRoute.transitDays} Hari ({specificRoute.transportMode})</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Harga Beli Franco Pabrik:</div>
                <div className="text-2xl font-black text-emerald-400">
                  {formatIDR(specificRoute.factory.buyingPricePerKg)}<span className="text-xs font-normal text-slate-300">/Kg</span>
                </div>
              </div>
            </div>

            {/* Logistics Cost Breakdown Grid */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
                <Ship className="w-4 h-4 text-cyan-400" />
                <span>Rincian Biaya Kirim / Ongkir Antar-Daerah (Per Kg):</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">1. First-Mile & Handling:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatIDR(specificRoute.firstMileHandling)}/Kg</div>
                  <div className="text-[9px] text-slate-400 mt-1">Pickup + Karung 50kg + QC</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">2. Kargo Laut / Tol Laut:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatIDR(specificRoute.routeCost.seaFreightPerKg)}/Kg</div>
                  <div className="text-[9px] text-slate-400 mt-1">Kapal Antarpulau Reguler</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">3. Port THC & Bongkar:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatIDR(specificRoute.routeCost.portHandlingPerKg)}/Kg</div>
                  <div className="text-[9px] text-slate-400 mt-1">Handling Pelabuhan Tujuan</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">4. Trucking Last-Mile:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatIDR(specificRoute.routeCost.truckingLastMilePerKg)}/Kg</div>
                  <div className="text-[9px] text-slate-400 mt-1">Pelabuhan ke Pintu Pabrik</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">5. Asuransi & Karantina:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{formatIDR(specificRoute.routeCost.quarantineInsurancePerKg)}/Kg</div>
                  <div className="text-[9px] text-slate-400 mt-1">Resmi & Sertifikasi Mutu</div>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center bg-slate-800/90 px-4 py-2.5 rounded-xl border border-slate-700 text-xs">
                <span className="font-bold text-slate-300">Total Seluruh Biaya Logistik (Ongkir):</span>
                <span className="font-extrabold text-amber-300 text-sm">
                  {formatIDR(specificRoute.totalShippingCostPerKg)} / Kg 
                  <span className="text-[11px] font-normal text-slate-400 ml-2">
                    (Total: {formatIDR(specificRoute.totalShippingCost)} untuk {volumeKg.toLocaleString()} Kg)
                  </span>
                </span>
              </div>
            </div>

            {/* Payout & Margin Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-700/50">
                <div className="text-xs text-emerald-300 font-semibold">Harga Bersih Diterima Petani di Hub:</div>
                <div className="text-2xl font-black text-emerald-300 mt-1">
                  {formatIDR(specificRoute.netPayoutPerKg)} <span className="text-xs font-normal text-emerald-200">/ Kg</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  (Harga Pabrik {formatIDR(specificRoute.factory.buyingPricePerKg)} - Ongkir {formatIDR(specificRoute.totalShippingCostPerKg)})
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400 font-semibold">Total Pendapatan Bersih Petani:</div>
                <div className="text-2xl font-black text-white mt-1">
                  {formatIDR(specificRoute.totalNetPayout)}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
                  + {formatIDR(specificRoute.totalAdditionalProfit)} (+{specificRoute.marginPercent}%) lebih tinggi dari tengkulak
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Skema Pencairan Bertahap:</div>
                  <div className="text-xs text-slate-200 mt-1.5 space-y-1">
                    <div className="flex justify-between">
                      <span>✓ Tahap 1 (85% di Hub Asal):</span>
                      <strong className="text-emerald-400">{formatIDR(specificRoute.payoutTahap1)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>• Tahap 2 (15% di Pabrik):</span>
                      <span>{formatIDR(specificRoute.payoutTahap2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenRegister && onOpenRegister('petani')}
                  className="mt-3 w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all"
                >
                  Kunci Kuota & Kirim ke Pabrik Ini
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Matrix Ranking Table of All Factory Destinations */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Peringkat Pabrik Tujuan Berdasarkan Margin Bersih Petani ({selectedOrigin.regionName}):</span>
              </h3>
              <span className="text-xs text-slate-500">Urutkan: Keuntungan Tertinggi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {routeCalculations.map((item, index) => {
                const isBest = index === 0;
                return (
                  <div 
                    key={item.factory.id}
                    className={`rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                      isBest 
                        ? 'bg-gradient-to-b from-emerald-50/80 to-white border-emerald-400 shadow-md ring-2 ring-emerald-400/30' 
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {isBest && (
                      <span className="absolute -top-3 left-4 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-sm flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>REKOMENDASI CUAN TERTINGGI</span>
                      </span>
                    )}

                    <div>
                      <div className="flex items-start justify-between gap-2 mt-1">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            {item.factory.region}
                          </span>
                          <h4 className="font-black text-slate-900 text-sm mt-0.5 line-clamp-1">
                            {item.factory.factoryName}
                          </h4>
                          <div className="text-xs text-slate-500">📍 {item.factory.city}</div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Franco Pabrik</span>
                          <span className="font-black text-emerald-700 text-base">
                            {formatIDR(item.factory.buyingPricePerKg)}
                          </span>
                        </div>
                      </div>

                      {/* Shipping Cost & Net Payout Comparison */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Total Ongkir & Handling:</span>
                          <span className="font-semibold text-rose-600">- {formatIDR(item.totalShippingCostPerKg)}/Kg</span>
                        </div>

                        <div className="flex justify-between text-slate-600">
                          <span>Estimasi Lead Time:</span>
                          <span className="font-medium text-slate-700">{item.transitDays} Hari ({item.transportMode})</span>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2">
                          <div className="flex justify-between items-baseline">
                            <span className="text-[11px] font-bold text-slate-700">Harga Bersih Petani:</span>
                            <span className="text-base font-black text-emerald-700">
                              {formatIDR(item.netPayoutPerKg)} <span className="text-[10px] font-normal text-slate-500">/Kg</span>
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center text-[10px] text-emerald-800 font-semibold mt-1">
                            <span>Ekstra Profit vs Tengkulak:</span>
                            <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                              +{item.marginPercent}% (+{formatIDR(item.marginGainPerKg)}/kg)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedDestinationFactoryId(item.factory.id)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <span>Lihat Rincian Rute</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <a
                        href={`https://wa.me/6285249402129?text=Halo%20Talisea.id,%20saya%20petani%20dari%20${encodeURIComponent(selectedOrigin.regionName)}%20ingin%20menjual%20${volumeKg}%20kg%20${encodeURIComponent(selectedSimSeaweedType)}%20ke%20${encodeURIComponent(item.factory.factoryName)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl transition-colors shrink-0"
                        title="Chat WhatsApp Purchasing"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: PAPAN LIVE UPDATE HARGA PABRIK BERBAGAI DAERAH                */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>LIVE PRICE BOARD PABRIK & OFF-TAKER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Papan Update Harga Beli Pabrik Pengolahan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Data harga beli (*Franco Pabrik*) terverifikasi harian dari berbagai pabrik carrageenan & agar-agar di seluruh Indonesia.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>+ Pasang Harga Baru</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Seaweed Type */}
            <div className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value as SeaweedType | 'ALL')}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Jenis Komoditas</option>
                <option value="Eucheuma Cottonii">Eucheuma Cottonii</option>
                <option value="Eucheuma Spinosum">Eucheuma Spinosum</option>
                <option value="Gracilaria">Gracilaria</option>
              </select>
            </div>

            {/* Filter Region */}
            <div className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedRegionFilter}
                onChange={(e) => setSelectedRegionFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Wilayah Pabrik</option>
                {uniqueRegions.map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama pabrik / kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* Factory Offers Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Pabrik & Lokasi Industri</th>
                <th className="py-3.5 px-4">Komoditas & Standar QC</th>
                <th className="py-3.5 px-4 text-right">Harga Franco Pabrik</th>
                <th className="py-3.5 px-4">Tren Harga</th>
                <th className="py-3.5 px-4">Kapasitas PO</th>
                <th className="py-3.5 px-4">Skema Pembayaran</th>
                <th className="py-3.5 px-4 text-center">Aksi / Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFactories.length > 0 ? (
                filteredFactories.map((factory) => {
                  const isCottonii = factory.seaweedType === 'Eucheuma Cottonii';
                  const isSpinosum = factory.seaweedType === 'Eucheuma Spinosum';

                  return (
                    <tr key={factory.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Pabrik & Lokasi */}
                      <td className="py-4 px-4">
                        <div className="flex items-start space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold shrink-0 mt-0.5">
                            <Building2 className="w-4 h-4 text-emerald-700" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                              <span>{factory.factoryName}</span>
                              {factory.verifiedFactory && (
                                <span className="inline-flex items-center text-emerald-600" title="Pabrik Terverifikasi Talisea">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{factory.city}, {factory.region}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Update: {factory.lastUpdated}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Komoditas & QC */}
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isCottonii 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : isSpinosum 
                            ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {factory.seaweedType}
                        </span>
                        <div className="text-[11px] text-slate-700 font-medium mt-1">
                          Max KA: <strong>{factory.maxMoisturePercent}%</strong> ({factory.gradeRequirement.split('(')[0]})
                        </div>
                      </td>

                      {/* Harga Franco Pabrik */}
                      <td className="py-4 px-4 text-right">
                        <div className="font-black text-slate-900 text-sm">
                          {formatIDR(factory.buyingPricePerKg)}
                        </div>
                        <div className="text-[10px] text-slate-400">per Kilogram Kering</div>
                      </td>

                      {/* Tren */}
                      <td className="py-4 px-4">
                        {factory.priceTrend === 'up' ? (
                          <div className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span>+{formatIDR(factory.priceChangeAmount)}</span>
                          </div>
                        ) : factory.priceTrend === 'down' ? (
                          <div className="inline-flex items-center space-x-1 text-rose-700 font-bold bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                            <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                            <span>{formatIDR(factory.priceChangeAmount)}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-1 text-slate-600 font-semibold bg-slate-100 px-2 py-1 rounded-lg">
                            <Minus className="w-3.5 h-3.5 text-slate-400" />
                            <span>Stabil</span>
                          </div>
                        )}
                      </td>

                      {/* Kapasitas PO */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800 text-xs">
                          {factory.minVolumeTon} - {factory.maxVolumeTon} Ton
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold flex items-center space-x-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>PO Terbuka</span>
                        </div>
                      </td>

                      {/* Skema Pembayaran */}
                      <td className="py-4 px-4">
                        <div className="text-[11px] font-medium text-slate-700 max-w-[220px] leading-tight">
                          {factory.paymentTerm}
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            onClick={() => handleOpenEdit(factory)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                            title="Edit / Update harga beli pabrik ini"
                          >
                            Update
                          </button>
                          <a
                            href={`https://wa.me/6285249402129?text=Halo%20Talisea.id,%20saya%20ingin%20menghubungi%20purchasing%20${encodeURIComponent(factory.factoryName)}%20di%20${encodeURIComponent(factory.city)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                            title="Hubungi Purchasing"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ditemukan data pabrik yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Notes on Regional Factory Pricing */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              <strong>Ketentuan Harga Franco Pabrik:</strong> Harga sudah mencakup penerimaan barang sampai di gudang pabrik. Pemotongan ongkir disesuaikan otomatis pada saat timbang di Hub Sentra Hulu Petani.
            </span>
          </div>
          <button
            onClick={handleOpenAdd}
            className="text-emerald-700 hover:text-emerald-800 font-bold text-xs shrink-0 underline"
          >
            Daftarkan Pabrik Anda di Papan Ini →
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: UPDATE / TAMBAH HARGA PABRIK                                      */}
      {/* ========================================================================= */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {modalMode === 'update' ? 'PERBARUI DATA HARGA' : 'INPUT HARGA PABRIK BARU'}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {modalMode === 'update' ? `Update Harga: ${formFactoryName}` : 'Tambah Penawaran Beli Pabrik'}
                </h3>
              </div>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Pabrik / Perusahaan:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PT Celebes Seaweed Industries"
                    value={formFactoryName}
                    onChange={(e) => setFormFactoryName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kota / Kawasan Industri:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pinrang / Surabaya"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Wilayah / Provinsi Pabrik:</label>
                  <select
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                    <option value="Jawa Timur">Jawa Timur</option>
                    <option value="Jawa Tengah & Barat">Jawa Tengah & Barat</option>
                    <option value="Bali & Nusa Tenggara">Bali & Nusa Tenggara</option>
                    <option value="Kalimantan">Kalimantan</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Komoditas Rumput Laut:</label>
                  <select
                    value={formSeaweedType}
                    onChange={(e) => setFormSeaweedType(e.target.value as SeaweedType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Eucheuma Cottonii">Eucheuma Cottonii</option>
                    <option value="Eucheuma Spinosum">Eucheuma Spinosum</option>
                    <option value="Gracilaria">Gracilaria</option>
                    <option value="Sargassum">Sargassum</option>
                    <option value="Halymenia">Halymenia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Harga Franco (Rp/Kg):</label>
                  <input
                    type="number"
                    required
                    step="100"
                    value={formBuyingPrice}
                    onChange={(e) => setFormBuyingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Maks. Kadar Air (%):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formMaxMoisture}
                    onChange={(e) => setFormMaxMoisture(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Min. Volume (Ton):</label>
                  <input
                    type="number"
                    value={formMinVolumeTon}
                    onChange={(e) => setFormMinVolumeTon(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Skema & Syarat Pembayaran:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Escrow Talisea: DP 85% Timbang Sentra + 15% Tiba Pabrik"
                  value={formPaymentTerm}
                  onChange={(e) => setFormPaymentTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Kontak WhatsApp Purchasing / PIC:</label>
                <input
                  type="text"
                  required
                  value={formPicContact}
                  onChange={(e) => setFormPicContact(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Catatan Khusus Pabrik (Opsional):</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Kebutuhan rutin 10 kontainer per bulan, prioritas warna cerah & garam minim."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Simpan & Perbarui Live Board</span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

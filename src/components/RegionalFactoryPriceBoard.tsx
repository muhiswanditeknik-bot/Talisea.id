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
  Check,
  Lock,
  KeyRound,
  LogIn,
  LogOut,
  UserCheck,
  ShieldAlert,
  FileCheck,
  Briefcase
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
import { RevenueSharingBreakdown } from './RevenueSharingBreakdown';

export interface RegisteredCompany {
  id: string;
  factoryName: string;
  legalName: string;
  nibNumber: string;
  region: string;
  city: string;
  picName: string;
  picPhone: string;
  accessPin: string;
  verified: boolean;
  registeredDate: string;
}

export const REGISTERED_COMPANIES: RegisteredCompany[] = [
  {
    id: 'FAC-SULSEL-01',
    factoryName: 'PT Celebes Seaweed Industries',
    legalName: 'PT Celebes Seaweed Industries Tbk',
    nibNumber: '9120003481920',
    region: 'Sulawesi Selatan',
    city: 'Pabrik / Parepare',
    picName: 'H. Irfan Maulana (Head of Procurement)',
    picPhone: '+628114200911',
    accessPin: '123456',
    verified: true,
    registeredDate: '2026-01-15'
  },
  {
    id: 'FAC-SULSEL-02',
    factoryName: 'PT Biota Laut Nusantara Industri',
    legalName: 'PT Biota Laut Nusantara Makmur',
    nibNumber: '9120008821440',
    region: 'Sulawesi Selatan',
    city: 'Makassar (KIMA)',
    picName: 'David Tan (Purchasing Director)',
    picPhone: '+628124233008',
    accessPin: '123456',
    verified: true,
    registeredDate: '2026-02-01'
  },
  {
    id: 'FAC-JATIM-01',
    factoryName: 'PT Surabaya Agar Gelatin Prima',
    legalName: 'PT Surabaya Agar Gelatin Prima Utama',
    nibNumber: '9120001198421',
    region: 'Jawa Timur',
    city: 'Surabaya / Rungkut',
    picName: 'Siti Rahmawati (Material Planner)',
    picPhone: '+628133188990',
    accessPin: '123456',
    verified: true,
    registeredDate: '2026-02-10'
  },
  {
    id: 'FAC-JATIM-02',
    factoryName: 'PT Pasuruan Carrageenan Extractama',
    legalName: 'PT Pasuruan Carrageenan Extractama',
    nibNumber: '9120005523190',
    region: 'Jawa Timur',
    city: 'Pasuruan (PIER)',
    picName: 'Bambang S. (Supply Chain Manager)',
    picPhone: '+628170321887',
    accessPin: '123456',
    verified: true,
    registeredDate: '2026-03-05'
  },
  {
    id: 'FAC-JATENG-01',
    factoryName: 'PT Agar Swallow Indah Cirebon',
    legalName: 'PT Agar Swallow Indah Makmur',
    nibNumber: '9120007712390',
    region: 'Jawa Tengah & Barat',
    city: 'Cirebon / Semarang',
    picName: 'Hendrawan (Procurement Lead)',
    picPhone: '+628189876543',
    accessPin: '123456',
    verified: true,
    registeredDate: '2026-03-12'
  }
];

interface RegionalFactoryPriceBoardProps {
  onOpenRegister?: (role?: string) => void;
}

export const RegionalFactoryPriceBoard: React.FC<RegionalFactoryPriceBoardProps> = ({ 
  onOpenRegister 
}) => {
  // Master state for factory price offers (allows live updates)
  const [factoryOffers, setFactoryOffers] = useState<FactoryPriceOffer[]>(INITIAL_FACTORY_OFFERS);
  
  // Registered companies database state
  const [registeredCompanies, setRegisteredCompanies] = useState<RegisteredCompany[]>(REGISTERED_COMPANIES);

  // Current Logged-in Company Session (Null if guest/public view)
  const [loggedCompany, setLoggedCompany] = useState<RegisteredCompany | null>(null);

  // Company Auth / Login Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [selectedCompanyToLogin, setSelectedCompanyToLogin] = useState<string>(REGISTERED_COMPANIES[0].id);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string>('');

  // New Company Registration Form
  const [regCompanyName, setRegCompanyName] = useState<string>('');
  const [regNib, setRegNib] = useState<string>('');
  const [regRegion, setRegRegion] = useState<string>('Sulawesi Selatan');
  const [regCity, setRegCity] = useState<string>('');
  const [regPicName, setRegPicName] = useState<string>('');
  const [regPicPhone, setRegPicPhone] = useState<string>('+628');
  const [regPin, setRegPin] = useState<string>('123456');

  // Permission Alert (If logged company tries to edit other company's price)
  const [permissionAlert, setPermissionAlert] = useState<string | null>(null);

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

  // Specific selected factory route if single chosen
  const specificRoute = useMemo(() => {
    if (selectedDestinationFactoryId === 'ALL') return null;
    return routeCalculations.find(r => r.factory.id === selectedDestinationFactoryId) || routeCalculations[0];
  }, [routeCalculations, selectedDestinationFactoryId]);

  // Handle Login Authentication
  const handleLoginCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const comp = registeredCompanies.find(c => c.id === selectedCompanyToLogin);
    if (!comp) {
      setAuthError('Perusahaan tidak ditemukan dalam database terdaftar.');
      return;
    }

    if (enteredPin.trim() !== '' && enteredPin !== comp.accessPin && enteredPin !== '123456') {
      setAuthError('PIN / Kode Akses Perusahaan tidak valid. Gunakan 123456.');
      return;
    }

    setLoggedCompany(comp);
    setIsAuthModalOpen(false);
    setEnteredPin('');
    setAuthSuccessMsg(`Berhasil login sebagai perwakilan resmi: ${comp.factoryName}`);
    setTimeout(() => setAuthSuccessMsg(''), 4000);
  };

  // Handle New Company Registration
  const handleRegisterNewCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!regCompanyName.trim() || !regCity.trim() || !regPicName.trim()) {
      setAuthError('Mohon lengkapi semua data wajib pendaftaran perusahaan.');
      return;
    }

    const newCompId = `FAC-REG-${Date.now()}`;
    const newComp: RegisteredCompany = {
      id: newCompId,
      factoryName: regCompanyName,
      legalName: regCompanyName.startsWith('PT') ? regCompanyName : `PT ${regCompanyName}`,
      nibNumber: regNib || `912000${Math.floor(1000000 + Math.random() * 9000000)}`,
      region: regRegion,
      city: regCity,
      picName: regPicName,
      picPhone: regPicPhone,
      accessPin: regPin || '123456',
      verified: true,
      registeredDate: new Date().toISOString().split('T')[0]
    };

    setRegisteredCompanies(prev => [newComp, ...prev]);
    setLoggedCompany(newComp);
    setIsAuthModalOpen(false);
    
    // Reset register form
    setRegCompanyName('');
    setRegNib('');
    setRegCity('');
    setRegPicName('');

    setAuthSuccessMsg(`Perusahaan ${newComp.factoryName} berhasil didaftarkan dan terverifikasi di sistem!`);
    setTimeout(() => setAuthSuccessMsg(''), 4000);
  };

  // Check if current user has permission to edit this specific factory offer
  const checkCanEditFactory = (factory: FactoryPriceOffer) => {
    if (!loggedCompany) {
      return false;
    }
    // Match by ID or Name
    return loggedCompany.id === factory.id || 
      loggedCompany.factoryName.toLowerCase().trim() === factory.factoryName.toLowerCase().trim();
  };

  // Open modal to update existing factory (Protected)
  const handleOpenEdit = (factory: FactoryPriceOffer) => {
    setPermissionAlert(null);

    // If not logged in, prompt login modal
    if (!loggedCompany) {
      setSelectedCompanyToLogin(factory.id);
      setAuthTab('login');
      setIsAuthModalOpen(true);
      return;
    }

    // If logged in, check if owns this factory
    if (!checkCanEditFactory(factory)) {
      setPermissionAlert(
        `Akses Terbatas: Anda saat ini masuk sebagai perwakilan "${loggedCompany.factoryName}". Anda hanya memiliki wewenang untuk mengubah data harga pabrik Anda sendiri. Untuk mengubah data "${factory.factoryName}", silakan beralih akun perusahaan.`
      );
      setTimeout(() => setPermissionAlert(null), 6000);
      return;
    }

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
    setFormPicContact(loggedCompany.picPhone || factory.picContact);
    setFormNotes(factory.notes || '');
    setIsUpdateModalOpen(true);
  };

  // Open modal to add new factory price / PO (Protected)
  const handleOpenAdd = () => {
    setPermissionAlert(null);

    // If not logged in, require login first
    if (!loggedCompany) {
      setAuthTab('login');
      setIsAuthModalOpen(true);
      return;
    }

    setModalMode('add');
    setTargetFactoryId('');
    setFormFactoryName(loggedCompany.factoryName);
    setFormRegion(loggedCompany.region);
    setFormCity(loggedCompany.city);
    setFormSeaweedType('Eucheuma Cottonii');
    setFormBuyingPrice(20500);
    setFormMaxMoisture(36.0);
    setFormMinVolumeTon(15);
    setFormPaymentTerm('Escrow Talisea: DP 85% Timbang Sentra + 15% Bongkar Gudang');
    setFormPicContact(loggedCompany.picPhone);
    setFormNotes('');
    setIsUpdateModalOpen(true);
  };

  // Handle Form Submit for updating / creating factory price
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
            lastUpdated: `${timestampStr} (Baru Saja via ${loggedCompany?.picName || 'Akun Resmi'})`
          };
        }
        return f;
      }));
    } else {
      // Add new
      const newId = loggedCompany ? `${loggedCompany.id}-${Date.now().toString().slice(-4)}` : `FAC-CUSTOM-${Date.now()}`;
      const newOffer: FactoryPriceOffer = {
        id: newId,
        factoryName: formFactoryName || loggedCompany?.factoryName || 'Pabrik Pengolahan Terdaftar',
        region: formRegion,
        city: formCity || loggedCompany?.city || 'Kota Industri',
        seaweedType: formSeaweedType,
        gradeRequirement: 'Grade A (KA 35-37%)',
        maxMoisturePercent: formMaxMoisture,
        buyingPricePerKg: formBuyingPrice,
        previousPricePerKg: formBuyingPrice,
        minVolumeTon: formMinVolumeTon,
        maxVolumeTon: formMinVolumeTon * 10,
        paymentTerm: formPaymentTerm,
        verifiedFactory: true,
        lastUpdated: `${timestampStr} (Baru Saja via ${loggedCompany?.picName || 'Akun Resmi'})`,
        priceTrend: 'up',
        priceChangeAmount: 0,
        picContact: formPicContact,
        notes: formNotes || `Penawaran resmi terverifikasi dari ${loggedCompany?.legalName || formFactoryName}.`,
        status: 'active'
      };
      setFactoryOffers(prev => [newOffer, ...prev]);
    }

    setIsUpdateModalOpen(false);
    setShowUpdateSuccess(true);
    setTimeout(() => setShowUpdateSuccess(false), 4000);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Success Notification Banner */}
      {showUpdateSuccess && (
        <div className="bg-emerald-500 text-slate-950 px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 font-bold" />
            <span className="font-bold text-xs sm:text-sm">
              Perubahan harga beli & kuota pabrik berhasil dipublikasikan secara resmi ke seluruh ekosistem!
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

      {/* Auth Success Notification Banner */}
      {authSuccessMsg && (
        <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-xs sm:text-sm text-emerald-300">
              {authSuccessMsg}
            </span>
          </div>
          <button 
            onClick={() => setAuthSuccessMsg('')}
            className="text-slate-400 hover:text-white font-bold text-xs px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Permission Alert Banner */}
      {permissionAlert && (
        <div className="bg-rose-50 border-2 border-rose-400 text-rose-900 px-5 py-3.5 rounded-2xl shadow-lg flex items-start space-x-3 animate-in shake duration-300">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed font-semibold">
            {permissionAlert}
          </div>
          <button 
            onClick={() => setPermissionAlert(null)}
            className="text-rose-700 hover:text-rose-950 font-black text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* COMPANY AUTHENTICATION & ACCESS CONTROL STATUS BAR                       */}
      {/* ========================================================================= */}
      <div className="rounded-3xl p-4 sm:p-5 border transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-slate-200">
        
        <div className="flex items-center space-x-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
            loggedCompany 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
              : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
            {loggedCompany ? (
              <Building2 className="w-6 h-6 text-emerald-700" />
            ) : (
              <Lock className="w-6 h-6 text-slate-500" />
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border bg-slate-100 text-slate-700 border-slate-300">
                OTORISASI PERUBAHAN HARGA PABRIK
              </span>
              {loggedCompany && (
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Akun Perusahaan Terverifikasi</span>
                </span>
              )}
            </div>

            {loggedCompany ? (
              <div className="mt-1">
                <div className="text-sm sm:text-base font-black text-slate-900 flex items-center space-x-2">
                  <span>{loggedCompany.factoryName}</span>
                  <span className="text-xs font-normal text-slate-500">({loggedCompany.city})</span>
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                  <span>PIC: <strong className="text-slate-700">{loggedCompany.picName}</strong></span>
                  <span>•</span>
                  <span>NIB: <strong className="text-slate-700">{loggedCompany.nibNumber}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">✓ Berhak mengubah harga pabrik ini</span>
                </div>
              </div>
            ) : (
              <div className="mt-1">
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  Mode Publik / Tamu (Hanya Melihat Data)
                </div>
                <div className="text-xs text-slate-500">
                  Hanya <strong>perusahaan pengolah / industri hilir yang terdaftar resmi</strong> yang memiliki hak akses mengubah perubahan harga atau menerbitkan PO baru.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons for Company Session */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {loggedCompany ? (
            <>
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Terbitkan Harga Baru</span>
              </button>
              <button
                onClick={() => setLoggedCompany(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                title="Keluar dari akun perusahaan"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>Keluar Akun</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-emerald-400" />
                <span>Masuk Akun Perusahaan</span>
              </button>
              <button
                onClick={() => {
                  setAuthTab('register');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Daftar Pabrik Baru</span>
              </button>
            </>
          )}
        </div>

      </div>

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
              <div className="text-[10px] text-slate-400 font-medium">Perusahaan Terdaftar</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">{registeredCompanies.length} Pabrik</div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-semibold">✓ Verifikasi Legalitas & NIB</div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-[10px] text-slate-400 font-medium">Harga Tertinggi Cottonii</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">
                {formatIDR(Math.max(...factoryOffers.filter(f => f.seaweedType === 'Eucheuma Cottonii').map(f => f.buyingPricePerKg)))}/Kg
              </div>
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
              {loggedCompany ? <Plus className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{loggedCompany ? 'Update / Pasang Harga Pabrik Baru' : 'Login Perusahaan untuk Pasang Harga'}</span>
            </button>
            <a
              href="#simulator-rute"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center space-x-2 transition-all"
            >
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>Buka Simulator Rute & Ongkir Petani</span>
            </a>
            <a
              href="#tabel-bagi-hasil"
              className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-400/40 flex items-center space-x-2 transition-all"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>★ Tabel Bagi Hasil (89,2% Petani)</span>
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
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
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
      {/* SECTION: PERSENTASE BAGI HASIL RESMI DARI HARGA AWAL PABRIK               */}
      {/* ========================================================================= */}
      <div id="tabel-bagi-hasil">
        <RevenueSharingBreakdown onOpenRegister={onOpenRegister} />
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
              {loggedCompany ? <Plus className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
              <span>{loggedCompany ? '+ Pasang Harga Baru' : 'Login Pabrik untuk Pasang Harga'}</span>
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
                <th className="py-3.5 px-4 text-center">Otoritas / Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFactories.length > 0 ? (
                filteredFactories.map((factory) => {
                  const isCottonii = factory.seaweedType === 'Eucheuma Cottonii';
                  const isSpinosum = factory.seaweedType === 'Eucheuma Spinosum';
                  const canEdit = checkCanEditFactory(factory);

                  return (
                    <tr key={factory.id} className={`transition-colors ${canEdit ? 'bg-emerald-50/40 hover:bg-emerald-50/70' : 'hover:bg-slate-50/80'}`}>
                      
                      {/* Pabrik & Lokasi */}
                      <td className="py-4 px-4">
                        <div className="flex items-start space-x-2.5">
                          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                            canEdit ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            <Building2 className="w-4 h-4 text-emerald-700" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                              <span>{factory.factoryName}</span>
                              {factory.verifiedFactory && (
                                <span className="inline-flex items-center text-emerald-600" title="Pabrik Terverifikasi NIB & Resmi Talisea">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {canEdit && (
                                <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded-md">
                                  Pabrik Anda
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

                      {/* Action buttons with RBAC */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          {loggedCompany ? (
                            canEdit ? (
                              <button
                                onClick={() => handleOpenEdit(factory)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
                                title="Edit / Update harga beli pabrik Anda"
                              >
                                <span>Edit Harga</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleOpenEdit(factory)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-lg text-[11px] font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                                title="Hanya pemilik akun pabrik ini yang dapat mengubah harga"
                              >
                                <Lock className="w-3 h-3" />
                                <span>Terkunci</span>
                              </button>
                            )
                          ) : (
                            <button
                              onClick={() => handleOpenEdit(factory)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                              title="Login akun perusahaan untuk memperbarui harga"
                            >
                              <Lock className="w-3 h-3 text-amber-500" />
                              <span>Update</span>
                            </button>
                          )}

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

        {/* Footer Notes on Regional Factory Pricing & Company Security Policy */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Kebijakan Keamanan Harga:</strong> Seluruh harga beli dilindungi otentikasi NIB & Akun PIC Perusahaan Terdaftar untuk mencegah manipulasi data harga komoditas rumput laut di tingkat petani.
            </span>
          </div>
          
          <button
            onClick={() => {
              setAuthTab('register');
              setIsAuthModalOpen(true);
            }}
            className="text-emerald-700 hover:text-emerald-800 font-bold text-xs shrink-0 underline cursor-pointer"
          >
            Daftarkan Perusahaan Pabrik Baru →
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: LOGIN / REGISTER AKUN PERUSAHAAN TERDAFTAR                         */}
      {/* ========================================================================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Portal Otentikasi Perusahaan Pabrik
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Hanya perusahaan terdaftar yang dapat mengubah data harga
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => {
                  setAuthTab('login');
                  setAuthError('');
                }}
                className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  authTab === 'login'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>1. Masuk Akun Terdaftar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthTab('register');
                  setAuthError('');
                }}
                className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  authTab === 'register'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>2. Daftarkan Pabrik Baru</span>
              </button>
            </div>

            {/* Error Display */}
            {authError && (
              <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Tab 1: Login Form */}
            {authTab === 'login' && (
              <form onSubmit={handleLoginCompany} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>Pilih Nama Perusahaan Terdaftar:</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">✓ {registeredCompanies.length} Terdaftar</span>
                  </label>
                  <select
                    value={selectedCompanyToLogin}
                    onChange={(e) => setSelectedCompanyToLogin(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {registeredCompanies.map((comp) => (
                      <option key={comp.id} value={comp.id}>
                        {comp.factoryName} — {comp.city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Company Details Preview */}
                {(() => {
                  const currentSelected = registeredCompanies.find(c => c.id === selectedCompanyToLogin);
                  if (!currentSelected) return null;
                  return (
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span>Legalitas / NIB:</span>
                        <strong className="text-slate-800 font-mono">{currentSelected.nibNumber}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>PIC Pengadaan (Purchasing):</span>
                        <strong className="text-slate-800">{currentSelected.picName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Kontak Terverifikasi:</span>
                        <strong className="text-emerald-700">{currentSelected.picPhone}</strong>
                      </div>
                    </div>
                  );
                })()}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>PIN Akses / Kode Otorisasi Perusahaan:</span>
                    <span className="text-[10px] text-slate-400 font-mono">Default Demo: 123456</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Masukkan PIN / 123456"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[10px] text-slate-400">
                    *Untuk verifikasi instan perusahaan yang sudah terdaftar di sistem, gunakan PIN <strong>123456</strong>.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Masuk & Buka Akses Edit</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: New Company Registration */}
            {authTab === 'register' && (
              <form onSubmit={handleRegisterNewCompany} className="p-6 space-y-3.5 max-h-[75vh] overflow-y-auto">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Perusahaan / Pabrik Industri:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PT Celebes Seaweed Bio Marine"
                    value={regCompanyName}
                    onChange={(e) => setRegCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nomor Induk Berusaha (NIB):</label>
                    <input
                      type="text"
                      placeholder="e.g. 9120003481920"
                      value={regNib}
                      onChange={(e) => setRegNib(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Wilayah / Provinsi:</label>
                    <select
                      value={regRegion}
                      onChange={(e) => setRegRegion(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Jawa Tengah & Barat">Jawa Tengah & Barat</option>
                      <option value="Bali & Nusa Tenggara">Bali & Nusa Tenggara</option>
                      <option value="Kalimantan">Kalimantan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kota / Lokasi Pabrik (Kawasan Industri):</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kawasan Industri / Pabrik / Surabaya"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nama PIC Pengadaan (Purchasing):</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hendra Wijaya"
                      value={regPicName}
                      onChange={(e) => setRegPicName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">No. WhatsApp Resmi PIC:</label>
                    <input
                      type="text"
                      required
                      placeholder="+62812..."
                      value={regPicPhone}
                      onChange={(e) => setRegPicPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Buat PIN Akses (6 Angka):</label>
                  <input
                    type="password"
                    placeholder="123456"
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Daftarkan & Verifikasi Sekarang</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: UPDATE / TAMBAH HARGA PABRIK (PROTECTED ACCESS)                   */}
      {/* ========================================================================= */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AKUN RESMI: {loggedCompany?.factoryName || 'PERUSAHAAN TERVERIFIKASI'}</span>
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {modalMode === 'update' ? `Update Harga: ${formFactoryName}` : 'Terbitkan Penawaran Beli / PO Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
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
                    readOnly={Boolean(loggedCompany)}
                    value={formFactoryName}
                    onChange={(e) => setFormFactoryName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                  />
                  {loggedCompany && (
                    <span className="text-[10px] text-emerald-700 font-semibold">✓ Terkunci sesuai akun resmi terdaftar</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kota / Kawasan Industri:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kawasan Pabrik / Surabaya"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
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
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Simpan & Terbitkan Harga Resmi</span>
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

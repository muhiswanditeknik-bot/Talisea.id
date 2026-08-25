import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  Scale, 
  Droplets, 
  ShieldCheck, 
  Building, 
  Coins, 
  ArrowRight, 
  Star, 
  FileText, 
  Truck, 
  Lock,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MARKETPLACE_PRODUCTS, FACTORY_DEMANDS } from '../data/mockData';
import { MarketplaceProduct, SeaweedType, FactoryDemand } from '../types';

interface MarketplaceViewProps {
  onOpenRegister: (role?: string) => void;
  onOpenReceipt?: (data: any) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onOpenRegister }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [orderQuantityKg, setOrderQuantityKg] = useState<number>(2000);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'katalog' | 'demand_pabrik'>('katalog');

  // Filtered Products
  const filteredProducts = MARKETPLACE_PRODUCTS.filter((prod) => {
    const matchesType = selectedType === 'all' || prod.jenis === selectedType;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.asal.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleOpenOrderModal = (prod: MarketplaceProduct) => {
    setSelectedProduct(prod);
    setOrderQuantityKg(prod.minOrderKg);
    setOrderSuccess(false);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>MARKETPLACE B2B RUMPUT LAUT TERKONSOLIDASI</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Katalog Pasokan Petani Nunukan & Kebutuhan Pabrik Pinrang
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Beli langsung dari kelompok tani dan hub terverifikasi dengan data kadar air (moisture) terukur dan jaminan pembayaran smart escrow.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveSubTab('katalog')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSubTab === 'katalog'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Katalog Stok Siap Kirim
              </button>
              <button
                onClick={() => setActiveSubTab('demand_pabrik')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSubTab === 'demand_pabrik'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Kebutuhan (PO) Pabrik Pinrang
              </button>
            </div>
          </div>
        </div>

        {activeSubTab === 'katalog' ? (
          <>
            {/* Filters and Search */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari jenis, lokasi hub, atau kelompok tani..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                  {[
                    { id: 'all', label: 'Semua Komoditas' },
                    { id: 'Eucheuma Cottonii', label: 'Cottonii' },
                    { id: 'Eucheuma Spinosum', label: 'Spinosum' },
                    { id: 'Gracilaria', label: 'Gracilaria' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedType(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedType === cat.id
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Thumbnail with Badges */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-slate-900/80 text-white backdrop-blur-xs border border-white/20">
                          {product.grade}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                          {product.jenis}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-800 shadow-xs flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{product.asal}</span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-sm leading-snug mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs mb-3">
                        <div>
                          <div className="text-[10px] text-slate-400 font-medium">Kadar Air (QC)</div>
                          <div className="font-extrabold text-emerald-700">{product.kadarAir}% Moisture</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-medium">Kotoran/Impuritas</div>
                          <div className="font-extrabold text-slate-700">&lt; {product.impuritas}%</div>
                        </div>
                      </div>

                      {/* Supplier & Hub info */}
                      <div className="text-[11px] text-slate-600 mb-3 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Hub Konsolidasi:</span>
                          <span className="font-semibold text-slate-800">{product.hubAsal}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Kelompok Pemasok:</span>
                          <span className="font-semibold text-slate-800 line-clamp-1">{product.supplier}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Total Stok Tersedia:</span>
                          <span className="font-bold text-emerald-700">{product.stokKg.toLocaleString('id-ID')} Kg</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold">Harga Spot per Kg:</div>
                        <div className="text-lg font-black text-slate-900">
                          {formatIDR(product.hargaPerKg)}
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenOrderModal(product)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition-transform active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Pesan PO</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </>
        ) : (
          /* Factory Demands View */
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Permintaan Kontrak Aktif Pabrik Pengolahan (Pinrang & Sekitarnya)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pabrik telah mengalokasikan budget escrow dan siap menyerap pasokan batch dari Nunukan
                  </p>
                </div>
                <button
                  onClick={() => onOpenRegister('pabrik')}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center space-x-2"
                >
                  <Building className="w-4 h-4" />
                  <span>Buka PO Baru (Pabrik)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FACTORY_DEMANDS.map((demand) => {
                  const percentFilled = Math.round((demand.volumeTerkumpulKg / demand.volumeTargetKg) * 100);
                  return (
                    <div key={demand.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                            {demand.kontrakId}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            {formatIDR(demand.hargaBeliPerKg)}/Kg
                          </span>
                        </div>

                        <h4 className="font-extrabold text-slate-900 text-sm mb-1">{demand.factoryName}</h4>
                        <div className="text-xs text-slate-500 flex items-center space-x-1 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{demand.lokasi}</span>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1 mb-4">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500">Terkumpul:</span>
                            <span className="font-bold text-slate-800">
                              {(demand.volumeTerkumpulKg / 1000).toFixed(1)} / {(demand.volumeTargetKg / 1000).toFixed(1)} Ton ({percentFilled}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentFilled}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1 mb-4">
                          <div className="flex justify-between text-slate-600">
                            <span>Komoditas:</span>
                            <span className="font-bold text-slate-900">{demand.kebutuhanJenis}</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Batas Kadar Air:</span>
                            <span className="font-bold text-emerald-700">Maks. {demand.maxKadarAir}%</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Tenggat Pasok:</span>
                            <span className="font-bold text-slate-900">{demand.deadline}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenRegister('hub_nunukan')}
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>Supply Pasokan Batch Nunukan</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Order Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
              
              {!orderSuccess ? (
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Pemesanan Kontrak / PO Pembeli
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">
                        {selectedProduct.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex justify-between text-slate-600">
                        <span>Asal Pasokan:</span>
                        <span className="font-bold text-slate-900">{selectedProduct.asal}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Hub Konsolidasi:</span>
                        <span className="font-bold text-slate-900">{selectedProduct.hubAsal}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Kadar Air Rata-rata:</span>
                        <span className="font-bold text-emerald-700">{selectedProduct.kadarAir}% (QC Digital Teruji)</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Harga per Kg:</span>
                        <span className="font-black text-slate-900 text-sm">{formatIDR(selectedProduct.hargaPerKg)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Volume Pemesanan (Kg):
                      </label>
                      <input
                        type="number"
                        min={selectedProduct.minOrderKg}
                        max={selectedProduct.stokKg}
                        step="100"
                        value={orderQuantityKg}
                        onChange={(e) => setOrderQuantityKg(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                      <div className="text-[11px] text-slate-500 mt-1">
                        Minimal order: {selectedProduct.minOrderKg.toLocaleString('id-ID')} Kg (Tersedia: {selectedProduct.stokKg.toLocaleString('id-ID')} Kg)
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nama Pabrik / Perusahaan:
                        </label>
                        <input
                          type="text"
                          defaultValue="PT Celebes Seaweed Industries"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Lokasi Pengantaran:
                        </label>
                        <input
                          type="text"
                          defaultValue="Gudang Pinrang, Sulsel"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                          required
                        />
                      </div>
                    </div>

                    {/* Escrow summary calculation */}
                    <div className="bg-emerald-900 text-white p-4 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs text-emerald-200">
                        <span>Subtotal ({orderQuantityKg.toLocaleString('id-ID')} Kg):</span>
                        <span className="font-bold text-white">{formatIDR(orderQuantityKg * selectedProduct.hargaPerKg)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-emerald-200">
                        <span>Deposit Escrow Pabrik (100%):</span>
                        <span className="font-black text-emerald-300 text-sm">
                          {formatIDR(orderQuantityKg * selectedProduct.hargaPerKg)}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-200 pt-1 border-t border-emerald-800">
                        🔒 Dana dikunci di Talisea.id Smart Escrow. 85% dicairkan ke petani saat Hub Nunukan serah kargo, 15% dilunasi saat barang tiba di Pinrang.
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(null)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center space-x-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Kunci Deposit & Buat PO Kontrak</span>
                      </button>
                    </div>

                  </form>
                </div>
              ) : (
                /* Success State */
                <div className="text-center py-6 space-y-4 animate-in zoom-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Purchase Order Berhasil Dibuat!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Kontrak digital PO-TALI-{Math.floor(1000 + Math.random() * 9000)} telah dikirim ke Hub Konsolidasi Nunukan. Notifikasi WhatsApp & invoice resmi telah dikirim ke tim logistik.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-1 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Volume:</span>
                      <span className="font-bold text-slate-900">{orderQuantityKg.toLocaleString('id-ID')} Kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nilai Escrow:</span>
                      <span className="font-black text-emerald-700">{formatIDR(orderQuantityKg * selectedProduct.hargaPerKg)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Jadwal Muat Kapal:</span>
                      <span className="font-bold text-slate-900">28 Agt 2026 (Pelabuhan Tunon Taka)</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                    >
                      Kembali ke Marketplace
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

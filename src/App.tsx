import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FarmerToFactoryFlowSection } from './components/FarmerToFactoryFlowSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { RoleBreakdownSection } from './components/RoleBreakdownSection';
import { StagedPaymentSection } from './components/StagedPaymentSection';
import { PilotMetricsSection } from './components/PilotMetricsSection';
import { MarketplaceView } from './components/MarketplaceView';
import { InventoryManager } from './components/InventoryManager';
import { QCTestingSimulator } from './components/QCTestingSimulator';
import { LogisticsTracker } from './components/LogisticsTracker';
import { MarginCalculator } from './components/MarginCalculator';
import { RegionalFactoryPriceBoard } from './components/RegionalFactoryPriceBoard';
import { RegistrationModal } from './components/RegistrationModal';
import { ReceiptModal } from './components/ReceiptModal';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Footer } from './components/Footer';
import { SeaweedBatch } from './types';
import { INITIAL_BATCHES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerRole, setRegisterRole] = useState<string>('petani');
  const [selectedReceiptBatch, setSelectedReceiptBatch] = useState<SeaweedBatch | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);
  const [selectedWABatch, setSelectedWABatch] = useState<SeaweedBatch | null>(null);
  const [isWAOpen, setIsWAOpen] = useState<boolean>(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenRegister = (role: string = 'petani') => {
    setRegisterRole(role);
    setIsRegisterOpen(true);
  };

  const handleOpenReceipt = (batch: SeaweedBatch) => {
    setSelectedReceiptBatch(batch);
    setIsReceiptOpen(true);
  };

  const handleOpenWhatsApp = (batch?: SeaweedBatch) => {
    setSelectedWABatch(batch || INITIAL_BATCHES[0]);
    setIsWAOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Dynamic Tab Content */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <div className="space-y-0 animate-in fade-in duration-200">
            <HeroSection 
              setActiveTab={setActiveTab} 
              onOpenRegister={handleOpenRegister} 
            />
            <FarmerToFactoryFlowSection 
              onOpenRegister={handleOpenRegister}
              onOpenQCSimulator={() => setActiveTab('qc-tester')}
            />
            <ProblemSolutionSection 
              onOpenRegister={handleOpenRegister} 
            />
            <RoleBreakdownSection 
              onOpenRegister={handleOpenRegister} 
            />
            <StagedPaymentSection />
            <PilotMetricsSection 
              onOpenRegister={handleOpenRegister}
              onOpenWhatsAppPreview={handleOpenWhatsApp}
            />
          </div>
        )}

        {activeTab === 'factory-prices' && (
          <div className="animate-in fade-in duration-200">
            <RegionalFactoryPriceBoard onOpenRegister={handleOpenRegister} />
          </div>
        )}

        {activeTab === 'scheme' && (
          <div className="animate-in fade-in duration-200">
            <FarmerToFactoryFlowSection 
              onOpenRegister={handleOpenRegister}
              onOpenQCSimulator={() => setActiveTab('qc-tester')}
            />
            <StagedPaymentSection />
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="animate-in fade-in duration-200">
            <MarketplaceView 
              onOpenRegister={handleOpenRegister} 
              onOpenReceipt={handleOpenReceipt}
            />
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="animate-in fade-in duration-200">
            <InventoryManager 
              onOpenReceipt={handleOpenReceipt}
              onOpenWhatsAppPreview={handleOpenWhatsApp}
            />
          </div>
        )}

        {activeTab === 'qc-tester' && (
          <div className="animate-in fade-in duration-200">
            <QCTestingSimulator />
          </div>
        )}

        {activeTab === 'logistics' && (
          <div className="animate-in fade-in duration-200">
            <LogisticsTracker />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="animate-in fade-in duration-200">
            <MarginCalculator />
          </div>
        )}
      </main>

      {/* App Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenRegister={handleOpenRegister} 
      />

      {/* Global Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialRole={registerRole}
      />

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        batch={selectedReceiptBatch}
      />

      <WhatsAppPreviewModal
        isOpen={isWAOpen}
        onClose={() => setIsWAOpen(false)}
        batch={selectedWABatch}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsAppButton />

    </div>
  );
}

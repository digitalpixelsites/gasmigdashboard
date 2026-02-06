import { Header } from "@/components/dashboard/Header";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { MentionsSection } from "@/components/dashboard/MentionsSection";
import { DomainsSection } from "@/components/dashboard/DomainsSection";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ReportsSection } from "@/components/dashboard/ReportsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 space-y-8">
        {/* Overview Section */}
        <OverviewCards />
        
        {/* Mentions Monitoring */}
        <MentionsSection />
        
        {/* Fraudulent Domains */}
        <DomainsSection />
        
        {/* Insights & Analysis */}
        <InsightsSection />
        
        {/* Reports */}
        <ReportsSection />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Gasmig - Monitoramento de Marca & Segurança Digital</p>
          <p>Versão 1.0.0 • Ambiente de Demonstração</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

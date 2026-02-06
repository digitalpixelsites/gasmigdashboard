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
      
      <main className="container px-3 md:px-6 py-4 md:py-6 space-y-6 md:space-y-8">
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
      <footer className="border-t border-border/50 py-4 md:py-6 mt-6 md:mt-8">
        <div className="container px-3 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground text-center sm:text-left">
          <p>© 2025 Gasmig - Monitoramento de Marca</p>
          <p>v1.0.0 • Demo</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

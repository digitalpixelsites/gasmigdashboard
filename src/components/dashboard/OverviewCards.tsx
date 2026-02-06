import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Minus,
  Globe, 
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface CardData {
  title: string;
  value: string | number;
  subValue?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  variant: 'default' | 'positive' | 'negative' | 'warning' | 'neutral';
}

const cards: CardData[] = [
  {
    title: "Total de Menções",
    value: "1.247",
    subValue: "Hoje: 42",
    change: 12.5,
    changeLabel: "vs. mês anterior",
    icon: MessageSquare,
    variant: 'default',
  },
  {
    title: "Menções Positivas",
    value: "834",
    subValue: "66.9%",
    change: 8.2,
    changeLabel: "vs. mês anterior",
    icon: ThumbsUp,
    variant: 'positive',
  },
  {
    title: "Menções Neutras",
    value: "298",
    subValue: "23.9%",
    change: -2.1,
    changeLabel: "vs. mês anterior",
    icon: Minus,
    variant: 'neutral',
  },
  {
    title: "Menções Negativas",
    value: "115",
    subValue: "9.2%",
    change: -15.3,
    changeLabel: "vs. mês anterior",
    icon: ThumbsDown,
    variant: 'negative',
  },
  {
    title: "Domínios Suspeitos",
    value: "7",
    subValue: "Este mês",
    change: 2,
    changeLabel: "novos detectados",
    icon: Globe,
    variant: 'warning',
  },
  {
    title: "Alertas Críticos",
    value: "3",
    subValue: "Requerem ação",
    icon: AlertTriangle,
    variant: 'warning',
  },
];

function getVariantStyles(variant: CardData['variant']) {
  switch (variant) {
    case 'positive':
      return {
        iconBg: 'bg-success/10',
        iconColor: 'text-success',
      };
    case 'negative':
      return {
        iconBg: 'bg-destructive/10',
        iconColor: 'text-destructive',
      };
    case 'warning':
      return {
        iconBg: 'bg-warning/20',
        iconColor: 'text-amber-600',
      };
    case 'neutral':
      return {
        iconBg: 'bg-muted',
        iconColor: 'text-muted-foreground',
      };
    default:
      return {
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
      };
  }
}

export function OverviewCards() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Visão Geral</h2>
        <span className="text-sm text-muted-foreground">Período: Últimos 30 dias</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card, index) => {
          const styles = getVariantStyles(card.variant);
          const Icon = card.icon;
          
          return (
            <div 
              key={card.title}
              className="glass-card p-5 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${styles.iconBg}`}>
                  <Icon className={`h-5 w-5 ${styles.iconColor}`} />
                </div>
                {card.change !== undefined && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    card.change >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {card.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(card.change)}%
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
                {card.subValue && (
                  <p className="text-xs text-muted-foreground/70">{card.subValue}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

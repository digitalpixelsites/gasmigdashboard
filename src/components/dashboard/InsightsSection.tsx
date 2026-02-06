import { TrendingUp, Hash, BarChart3, Link2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";

const topicsData = [
  { name: 'Expansão rede', value: 156, sentiment: 'positive' },
  { name: 'Atendimento', value: 89, sentiment: 'negative' },
  { name: 'Preços', value: 72, sentiment: 'neutral' },
  { name: 'Sustentabilidade', value: 65, sentiment: 'positive' },
  { name: 'Vagas emprego', value: 48, sentiment: 'positive' },
];

const keywords = [
  { word: 'gás natural', count: 342 },
  { word: 'energia', count: 189 },
  { word: 'Minas Gerais', count: 156 },
  { word: 'investimento', count: 124 },
  { word: 'expansão', count: 98 },
  { word: 'sustentável', count: 87 },
  { word: 'industrial', count: 76 },
  { word: 'atendimento', count: 65 },
];

const correlations = [
  {
    event: "Notícia sobre expansão em Betim",
    date: "04/02",
    domains: 2,
    description: "2 novos domínios suspeitos registrados 48h após publicação"
  },
  {
    event: "Campanha de 2ª via de boletos",
    date: "02/02",
    domains: 1,
    description: "1 domínio de phishing detectado com página de boletos"
  },
];

function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case 'positive': return '#22c55e';
    case 'negative': return '#ef4444';
    default: return '#94a3b8';
  }
}

export function InsightsSection() {
  return (
    <section className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-foreground">Insights & Análises</h2>
        <span className="text-sm text-muted-foreground">Últimos 7 dias</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Topics Chart */}
        <div className="glass-card p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Tópicos Mais Citados</h3>
          </div>
          <div className="h-40 md:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicsData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(220 10% 45%)' }} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'hsl(220 10% 45%)' }}
                  width={70}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0 0% 100%)', 
                    border: '1px solid hsl(220 15% 90%)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {topicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSentimentColor(entry.sentiment)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Keywords */}
        <div className="glass-card p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Palavras-chave Recorrentes</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {keywords.map((keyword, index) => (
              <Badge 
                key={keyword.word}
                variant="secondary"
                className="px-2 md:px-3 py-1 md:py-1.5 text-xs animate-fade-in"
                style={{ 
                  animationDelay: `${index * 30}ms`,
                  fontSize: `${Math.max(10, Math.min(13, 8 + keyword.count / 30))}px`
                }}
              >
                {keyword.word}
                <span className="ml-1 md:ml-1.5 text-muted-foreground font-normal">
                  {keyword.count}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Correlations */}
        <div className="glass-card p-4 md:p-5 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Correlações Detectadas</h3>
          </div>
          <div className="space-y-2 md:space-y-3">
            {correlations.map((item, index) => (
              <div 
                key={index}
                className="p-2.5 md:p-3 bg-muted/50 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground line-clamp-2">{item.event}</span>
                  <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20 shrink-0">
                    +{item.domains}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <span className="text-xs text-muted-foreground/70">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Mentions */}
      <div className="glass-card p-4 md:p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Picos de Menções</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 bg-muted/50 rounded-lg">
            <p className="text-xl md:text-2xl font-bold text-primary">04/02</p>
            <p className="text-xs md:text-sm text-muted-foreground">Maior volume</p>
            <p className="text-xs text-muted-foreground/70 mt-1">187 menções (+45%)</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-muted/50 rounded-lg">
            <p className="text-xl md:text-2xl font-bold text-success">06/02</p>
            <p className="text-xs md:text-sm text-muted-foreground">Mais positivo</p>
            <p className="text-xs text-muted-foreground/70 mt-1">78% sentimento positivo</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-muted/50 rounded-lg">
            <p className="text-xl md:text-2xl font-bold text-destructive">05/02</p>
            <p className="text-xs md:text-sm text-muted-foreground">Alerta crítico</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Domínio phishing detectado</p>
          </div>
        </div>
      </div>
    </section>
  );
}

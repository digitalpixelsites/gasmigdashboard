import { useState } from "react";
import { 
  Filter, 
  ExternalLink, 
  Star, 
  AlertCircle, 
  XCircle,
  Globe,
  Newspaper,
  Share2,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MentionsChart } from "./MentionsChart";

interface Mention {
  id: string;
  title: string;
  source: string;
  sourceType: 'news' | 'blog' | 'social' | 'web';
  sentiment: 'positive' | 'neutral' | 'negative';
  date: Date;
  url: string;
  excerpt: string;
  apiSource: string;
}

const mockMentions: Mention[] = [
  {
    id: "1",
    title: "Gasmig anuncia expansão de rede de gás natural em Minas Gerais",
    source: "Estado de Minas",
    sourceType: "news",
    sentiment: "positive",
    date: new Date(2025, 1, 6, 9, 30),
    url: "#",
    excerpt: "A Companhia de Gás de Minas Gerais anunciou investimentos de R$ 200 milhões para expansão da rede de distribuição...",
    apiSource: "Google News"
  },
  {
    id: "2",
    title: "Nova parceria entre Gasmig e setor industrial movimenta economia local",
    source: "Hoje em Dia",
    sourceType: "news",
    sentiment: "positive",
    date: new Date(2025, 1, 6, 8, 15),
    url: "#",
    excerpt: "Acordo firmado entre a Gasmig e o polo industrial de Betim promete gerar novos empregos e reduzir custos de produção...",
    apiSource: "Talkwalker"
  },
  {
    id: "3",
    title: "Usuários reclamam de demora no atendimento da Gasmig",
    source: "Reclame Aqui",
    sourceType: "web",
    sentiment: "negative",
    date: new Date(2025, 1, 5, 16, 45),
    url: "#",
    excerpt: "Consumidores relatam dificuldades para conseguir atendimento telefônico e agendar visitas técnicas...",
    apiSource: "Awario"
  },
  {
    id: "4",
    title: "Gasmig participa de feira de energia sustentável",
    source: "LinkedIn",
    sourceType: "social",
    sentiment: "positive",
    date: new Date(2025, 1, 5, 14, 20),
    url: "#",
    excerpt: "A empresa apresentou suas iniciativas de sustentabilidade e metas de redução de emissões para 2030...",
    apiSource: "Talkwalker"
  },
  {
    id: "5",
    title: "Análise: Mercado de gás natural em Minas Gerais",
    source: "Blog Energia Brasil",
    sourceType: "blog",
    sentiment: "neutral",
    date: new Date(2025, 1, 5, 10, 0),
    url: "#",
    excerpt: "Especialistas avaliam o cenário do mercado de gás natural no estado e as perspectivas para os próximos anos...",
    apiSource: "SerpAPI"
  },
  {
    id: "6",
    title: "Gasmig contrata novos colaboradores para projeto de expansão",
    source: "O Tempo",
    sourceType: "news",
    sentiment: "positive",
    date: new Date(2025, 1, 4, 11, 30),
    url: "#",
    excerpt: "Empresa abre 150 vagas para técnicos e engenheiros como parte do plano de crescimento regional...",
    apiSource: "Google News"
  },
];

function getSourceIcon(type: Mention['sourceType']) {
  switch (type) {
    case 'news': return Newspaper;
    case 'blog': return Globe;
    case 'social': return Share2;
    case 'web': return MessageCircle;
    default: return Globe;
  }
}

function getSentimentStyles(sentiment: Mention['sentiment']) {
  switch (sentiment) {
    case 'positive':
      return { bg: 'bg-success/10', text: 'text-success', label: 'Positivo' };
    case 'negative':
      return { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Negativo' };
    default:
      return { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Neutro' };
  }
}

function formatDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 1) return 'Agora há pouco';
  if (hours < 24) return `${hours}h atrás`;
  
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function MentionsSection() {
  const [selectedMention, setSelectedMention] = useState<Mention | null>(null);
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMentions = mockMentions.filter(mention => {
    if (channelFilter !== "all" && mention.sourceType !== channelFilter) return false;
    if (sentimentFilter !== "all" && mention.sentiment !== sentimentFilter) return false;
    if (searchQuery && !mention.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground">Monitoramento de Menções</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Input
              placeholder="Buscar menções..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 h-9 pl-3 text-sm"
            />
          </div>
          
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Canal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="news">Notícias</SelectItem>
              <SelectItem value="blog">Blogs</SelectItem>
              <SelectItem value="social">Redes Sociais</SelectItem>
              <SelectItem value="web">Web</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue placeholder="Sentimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="positive">Positivo</SelectItem>
              <SelectItem value="neutral">Neutro</SelectItem>
              <SelectItem value="negative">Negativo</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="gap-2 h-9">
            <Filter className="h-4 w-4" />
            Mais Filtros
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Mentions Timeline */}
        <div className="lg:col-span-3 space-y-3">
          <div className="glass-card divide-y divide-border/50">
            {filteredMentions.map((mention, index) => {
              const SourceIcon = getSourceIcon(mention.sourceType);
              const sentimentStyles = getSentimentStyles(mention.sentiment);
              
              return (
                <div
                  key={mention.id}
                  className="p-4 hover:bg-muted/30 transition-colors cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedMention(mention)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted shrink-0">
                      <SourceIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-medium text-sm text-foreground line-clamp-2 leading-snug">
                          {mention.title}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={`shrink-0 text-xs ${sentimentStyles.bg} ${sentimentStyles.text} border-0`}
                        >
                          {sentimentStyles.label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{mention.source}</span>
                        <span>•</span>
                        <span>{formatDate(mention.date)}</span>
                        <span>•</span>
                        <span className="text-primary/70">{mention.apiSource}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredMentions.length === 0 && (
            <div className="glass-card p-12 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma menção encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <MentionsChart />
        </div>
      </div>

      {/* Mention Detail Sheet */}
      <Sheet open={!!selectedMention} onOpenChange={() => setSelectedMention(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedMention && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="secondary" 
                    className={`${getSentimentStyles(selectedMention.sentiment).bg} ${getSentimentStyles(selectedMention.sentiment).text} border-0`}
                  >
                    {getSentimentStyles(selectedMention.sentiment).label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(selectedMention.date)}
                  </span>
                </div>
                <SheetTitle className="text-left leading-snug">
                  {selectedMention.title}
                </SheetTitle>
                <SheetDescription className="text-left">
                  Fonte: {selectedMention.source} via {selectedMention.apiSource}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Resumo</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMention.excerpt}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Ver Original
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Star className="h-4 w-4" />
                    Marcar Relevante
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    Marcar Crítica
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <XCircle className="h-4 w-4" />
                    Ignorar
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

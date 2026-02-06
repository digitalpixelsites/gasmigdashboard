import { useState } from "react";
import { 
  Shield, 
  AlertTriangle, 
  ExternalLink, 
  Info,
  Lock,
  Unlock,
  Globe,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuspiciousDomain {
  id: string;
  domain: string;
  riskType: 'phishing' | 'typosquatting' | 'fake_boleto' | 'impersonation';
  creationDate: Date;
  country: string;
  server: string;
  hasSSL: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  evidence?: string;
  whoisInfo?: string;
}

const mockDomains: SuspiciousDomain[] = [
  {
    id: "1",
    domain: "gasmiig.com.br",
    riskType: "typosquatting",
    creationDate: new Date(2025, 0, 28),
    country: "Brasil",
    server: "Cloudflare",
    hasSSL: true,
    riskLevel: "high",
    evidence: "Domínio registrado com erro de digitação intencional. Página clonada detectada.",
    whoisInfo: "Registrado em 28/01/2025 via Registro.br. Registrante: Pessoa física não identificada."
  },
  {
    id: "2",
    domain: "gasmig-boletos.net",
    riskType: "fake_boleto",
    creationDate: new Date(2025, 1, 2),
    country: "Estados Unidos",
    server: "DigitalOcean",
    hasSSL: false,
    riskLevel: "high",
    evidence: "Site oferece emissão de segunda via de boletos. Possível fraude financeira.",
    whoisInfo: "Registrado em 02/02/2025 via Namecheap. Dados de registrante protegidos por privacidade."
  },
  {
    id: "3",
    domain: "gasmig.online",
    riskType: "impersonation",
    creationDate: new Date(2025, 0, 15),
    country: "Holanda",
    server: "Hostinger",
    hasSSL: true,
    riskLevel: "medium",
    evidence: "Site com conteúdo institucional copiado. Não contém formulários de captação de dados.",
    whoisInfo: "Registrado em 15/01/2025. Registrante: Empresa com sede na Europa."
  },
  {
    id: "4",
    domain: "atendimento-gasmig.com",
    riskType: "phishing",
    creationDate: new Date(2025, 1, 5),
    country: "Rússia",
    server: "Desconhecido",
    hasSSL: false,
    riskLevel: "high",
    evidence: "Formulário de login falso detectado. Possível coleta de credenciais.",
    whoisInfo: "Registrado em 05/02/2025. Dados de registrante ocultos."
  },
  {
    id: "5",
    domain: "gasmig-energia.com.br",
    riskType: "impersonation",
    creationDate: new Date(2024, 11, 20),
    country: "Brasil",
    server: "AWS",
    hasSSL: true,
    riskLevel: "low",
    evidence: "Site parece ser de terceiros oferecendo serviços relacionados. Monitorar evolução.",
    whoisInfo: "Registrado em 20/12/2024. Registrante: Empresa de consultoria energética."
  },
];

function getRiskTypeLabel(type: SuspiciousDomain['riskType']) {
  switch (type) {
    case 'phishing': return 'Phishing';
    case 'typosquatting': return 'Typosquatting';
    case 'fake_boleto': return 'Boleto Falso';
    case 'impersonation': return 'Personificação';
    default: return type;
  }
}

function getRiskLevelStyles(level: SuspiciousDomain['riskLevel']) {
  switch (level) {
    case 'high':
      return { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20', label: 'Alto' };
    case 'medium':
      return { bg: 'bg-warning/20', text: 'text-amber-700', border: 'border-warning/30', label: 'Médio' };
    case 'low':
      return { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', label: 'Baixo' };
    default:
      return { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border', label: level };
  }
}

export function DomainsSection() {
  const [selectedDomain, setSelectedDomain] = useState<SuspiciousDomain | null>(null);

  const highRiskCount = mockDomains.filter(d => d.riskLevel === 'high').length;

  return (
    <section className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg font-semibold text-foreground">Domínios Fraudulentos</h2>
          {highRiskCount > 0 && (
            <Badge variant="destructive" className="gap-1 animate-pulse-soft">
              <AlertTriangle className="h-3 w-3" />
              {highRiskCount} alto risco
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
          <Shield className="h-4 w-4" />
          Ver Histórico
        </Button>
      </div>

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-3">
        {mockDomains.map((domain, index) => {
          const riskStyles = getRiskLevelStyles(domain.riskLevel);
          
          return (
            <div 
              key={domain.id}
              className="glass-card p-4 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-mono text-sm truncate">{domain.domain}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${riskStyles.bg} ${riskStyles.text} ${riskStyles.border} border shrink-0 ml-2`}
                >
                  {riskStyles.label}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-muted-foreground">Tipo:</span>
                  <p className="font-medium">{getRiskTypeLabel(domain.riskType)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Criação:</span>
                  <p className="font-medium">{domain.creationDate.toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">País:</span>
                  <p className="font-medium">{domain.country}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">SSL:</span>
                  <div className="flex items-center gap-1">
                    {domain.hasSSL ? (
                      <>
                        <Lock className="h-3 w-3 text-success" />
                        <span className="text-success">Ativo</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Inativo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-1.5 text-xs"
                onClick={() => setSelectedDomain(domain)}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Ver evidências
              </Button>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="glass-card overflow-hidden hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Domínio</TableHead>
              <TableHead className="font-semibold">Tipo de Risco</TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1">
                  Data de Criação
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Data de registro do domínio</TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead className="font-semibold">País / Servidor</TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1">
                  SSL
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Certificado de segurança ativo</TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead className="font-semibold">Nível de Risco</TableHead>
              <TableHead className="font-semibold text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDomains.map((domain, index) => {
              const riskStyles = getRiskLevelStyles(domain.riskLevel);
              
              return (
                <TableRow 
                  key={domain.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm">{domain.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {getRiskTypeLabel(domain.riskType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {domain.creationDate.toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="text-foreground">{domain.country}</span>
                      <span className="text-muted-foreground"> / {domain.server}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {domain.hasSSL ? (
                      <div className="flex items-center gap-1.5 text-success">
                        <Lock className="h-4 w-4" />
                        <span className="text-xs">Ativo</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Unlock className="h-4 w-4" />
                        <span className="text-xs">Inativo</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${riskStyles.bg} ${riskStyles.text} ${riskStyles.border} border`}
                    >
                      {riskStyles.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1.5 text-xs"
                      onClick={() => setSelectedDomain(domain)}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Ver evidências
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Evidence Dialog */}
      <Dialog open={!!selectedDomain} onOpenChange={() => setSelectedDomain(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedDomain && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  {selectedDomain.domain}
                </DialogTitle>
                <DialogDescription>
                  Análise de segurança e evidências coletadas
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div className="flex gap-3">
                  <Badge variant="outline">{getRiskTypeLabel(selectedDomain.riskType)}</Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getRiskLevelStyles(selectedDomain.riskLevel).bg} ${getRiskLevelStyles(selectedDomain.riskLevel).text}`}
                  >
                    Risco {getRiskLevelStyles(selectedDomain.riskLevel).label}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Evidências</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                    {selectedDomain.evidence}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Informações WHOIS</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                    {selectedDomain.whoisInfo}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <span className="text-muted-foreground">País:</span>
                    <p className="font-medium">{selectedDomain.country}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <span className="text-muted-foreground">Servidor:</span>
                    <p className="font-medium">{selectedDomain.server}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Reportar Domínio
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Ver Site
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

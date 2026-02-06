import { useState } from "react";
import { 
  Download, 
  Settings, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  FileSpreadsheet,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import gasmigLogo from "@/assets/logotipo-gasmig.webp";

interface ApiStatus {
  name: string;
  active: boolean;
}

const apiStatuses: ApiStatus[] = [
  { name: "Google News", active: true },
  { name: "Talkwalker", active: true },
  { name: "Awario", active: true },
  { name: "SerpAPI", active: false },
  { name: "WHOIS", active: true },
];

export function Header() {
  const [lastUpdate] = useState(new Date());
  
  const activeApis = apiStatuses.filter(api => api.active).length;
  const totalApis = apiStatuses.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-14 md:h-16 items-center justify-between px-3 md:px-6">
        {/* Left section - Logo and Title */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <img 
            src={gasmigLogo} 
            alt="Gasmig" 
            className="h-6 md:h-8 w-auto shrink-0"
          />
          <div className="hidden sm:block min-w-0">
            <h1 className="text-xs md:text-sm font-semibold text-foreground truncate">
              Monitoramento de Marca & Segurança Digital
            </h1>
            <p className="text-xs text-muted-foreground hidden md:block">
              Painel de Governança Digital
            </p>
          </div>
        </div>

        {/* Center section - Status */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Last Update */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Atualizado:</span>
            <span className="font-medium text-foreground">
              {lastUpdate.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>

          {/* API Status */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                {activeApis === totalApis ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-warning" />
                )}
                <span className="text-sm">
                  <span className="font-medium text-foreground">{activeApis}</span>
                  <span className="text-muted-foreground">/{totalApis} APIs</span>
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="w-48">
              <div className="space-y-1.5">
                {apiStatuses.map((api) => (
                  <div key={api.name} className="flex items-center justify-between text-xs">
                    <span>{api.name}</span>
                    <span className={api.active ? "text-success" : "text-destructive"}>
                      {api.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FileText className="h-4 w-4" />
                Exportar PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                Exportar Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configurações</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ajuda</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

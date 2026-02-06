import { 
  FileText, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2,
  Clock,
  Calendar,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  title: string;
  type: 'monthly' | 'biweekly' | 'alert';
  date: Date;
  status: 'sent' | 'pending' | 'draft';
  format: 'pdf' | 'xlsx';
}

const reports: Report[] = [
  {
    id: "1",
    title: "Relatório Mensal - Janeiro 2025",
    type: "monthly",
    date: new Date(2025, 1, 1),
    status: "sent",
    format: "pdf"
  },
  {
    id: "2",
    title: "Domínios Suspeitos - Quinzena 2",
    type: "biweekly",
    date: new Date(2025, 0, 31),
    status: "sent",
    format: "xlsx"
  },
  {
    id: "3",
    title: "Relatório Mensal - Fevereiro 2025",
    type: "monthly",
    date: new Date(2025, 1, 6),
    status: "draft",
    format: "pdf"
  },
  {
    id: "4",
    title: "Domínios Suspeitos - Quinzena 1",
    type: "biweekly",
    date: new Date(2025, 0, 15),
    status: "sent",
    format: "xlsx"
  },
  {
    id: "5",
    title: "Alerta Crítico - Phishing",
    type: "alert",
    date: new Date(2025, 1, 5),
    status: "sent",
    format: "pdf"
  },
];

function getStatusStyles(status: Report['status']) {
  switch (status) {
    case 'sent':
      return { icon: CheckCircle2, text: 'Enviado', className: 'text-success' };
    case 'pending':
      return { icon: Clock, text: 'Pendente', className: 'text-warning' };
    case 'draft':
      return { icon: FileText, text: 'Rascunho', className: 'text-muted-foreground' };
    default:
      return { icon: FileText, text: status, className: 'text-muted-foreground' };
  }
}

function getTypeLabel(type: Report['type']) {
  switch (type) {
    case 'monthly': return 'Mensal';
    case 'biweekly': return 'Quinzenal';
    case 'alert': return 'Alerta';
    default: return type;
  }
}

export function ReportsSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Relatórios & Entregáveis</h2>
        <Button size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      <div className="glass-card divide-y divide-border/50">
        {reports.map((report, index) => {
          const statusInfo = getStatusStyles(report.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div 
              key={report.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${
                  report.format === 'pdf' ? 'bg-destructive/10' : 'bg-success/10'
                }`}>
                  {report.format === 'pdf' ? (
                    <FileText className={`h-5 w-5 ${
                      report.format === 'pdf' ? 'text-destructive' : 'text-success'
                    }`} />
                  ) : (
                    <FileSpreadsheet className="h-5 w-5 text-success" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-foreground">{report.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getTypeLabel(report.type)}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {report.date.toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-1.5 text-sm ${statusInfo.className}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{statusInfo.text}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {report.status === 'sent' && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {reports.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum relatório disponível.</p>
            <Button variant="outline" className="mt-4 gap-2">
              <FileText className="h-4 w-4" />
              Criar Primeiro Relatório
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

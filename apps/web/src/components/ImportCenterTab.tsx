'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { formatBRL } from '../lib/formatters';

export function ImportCenterTab() {
  const [hasFile, setHasFile] = useState<boolean>(true); // Demo mode shows loaded spreadsheet

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
              Central de Importação & Migração Excel / OFX
            </h2>
            <p className="text-xs text-muted-foreground">
              Importe planilhas financeiras da sua família ou extratos bancários com auto-mapeamento inteligente e verificação de duplicidades
            </p>
          </div>
          <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            Pipeline Idempotente
          </span>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="rounded-xl border-2 border-dashed border-border bg-card p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
        <h3 className="mt-2 text-xs font-bold text-foreground">
          Arraste sua planilha Excel (.xlsx), extrato (.ofx), (.csv) ou fatura PDF
        </h3>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Formatos suportados: Itaú, Bradesco, Banco do Brasil, Nubank, XP, Inter, Caixa e planilhas personalizadas
        </p>
        <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover shadow-sm">
          Selecionar Arquivo do Computador
        </button>
      </div>

      {/* Active Import Review Preview */}
      {hasFile && (
        <div className="space-y-4">
          {/* Active File Summary Card */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-emerald-100 dark:bg-emerald-950 p-2.5 text-emerald-600">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Financas_Familia_Silva_2026.xlsx
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Aba: &quot;Agosto_2026&quot; • 87 linhas detectadas • Tamanho: 48 KB
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="rounded-md bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
                Aguardando Revisão (4 Mapeamentos)
              </span>
            </div>
          </div>

          {/* AI Column Auto-Detection Mapping Table */}
          <div className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  1. Mapeamento de Colunas da Planilha
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  O Finora analisou os cabeçalhos da sua planilha e sugeriu os campos equivalentes:
                </p>
              </div>
              <span className="text-xs text-emerald-600 font-medium">
                Confiança Média: 91%
              </span>
            </div>

            <div className="space-y-2">
              {/* Row 1 */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-muted-foreground">Col A:</span>
                  <span className="font-bold text-foreground">&quot;Data Pgto&quot;</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    transaction.occurredAt
                  </span>
                </div>
                <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                  99% Confiança
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-muted-foreground">Col B:</span>
                  <span className="font-bold text-foreground">&quot;Descrição do Gasto&quot;</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    transaction.description
                  </span>
                </div>
                <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                  98% Confiança
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-muted-foreground">Col C:</span>
                  <span className="font-bold text-foreground">&quot;Valor R$&quot;</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    transaction.amount (BRL)
                  </span>
                </div>
                <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                  95% Confiança
                </span>
              </div>

              {/* Row 4 (Medium confidence) */}
              <div className="flex items-center justify-between rounded-lg border border-amber-300/60 bg-amber-500/10 p-3 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-muted-foreground">Col D:</span>
                  <span className="font-bold text-foreground">&quot;Cartão M.&quot;</span>
                  <ArrowRight className="h-4 w-4 text-amber-600" />
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    account.creditCard (Nubank Cartão)
                  </span>
                </div>
                <span className="rounded bg-amber-100 dark:bg-amber-950 px-2 py-0.5 text-[11px] font-mono text-amber-800 dark:text-amber-300">
                  61% Requer Confirmação
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-border">
              <button className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted">
                Descartar Importação
              </button>
              <button className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Confirmar Mapeamento & Efetuar Importação (87 Registros)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Database,
  Activity,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { formatBRL } from '../lib/formatters';

export function AiExplorerTab() {
  const [query, setQuery] = useState<string>(
    'Por que nossa fatura do cartão Nubank veio mais alta este mês?'
  );
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* Query Bar */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">
            Finora AI — Consultas Financeiras em Linguagem Natural
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Pergunte sobre seus gastos, faturas, assinaturas ou tendências. O Finora AI utiliza ferramentas determinísticas e validação de esquemas (nunca SQL arbitrário direto).
        </p>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Quanto gastamos em supermercado nos últimos 6 meses?"
            className="flex-1 rounded-lg border border-border bg-muted/40 p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
          />
          <button
            onClick={() => setHasSearched(true)}
            className="rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-white hover:bg-primary-hover shadow-sm flex items-center gap-1.5"
          >
            <Send className="h-4 w-4" />
            <span>Perguntar</span>
          </button>
        </div>
      </div>

      {/* AI Response Card with Evidence Links */}
      {hasSearched && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center space-x-2">
              <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Ferramenta Utilizada: query_transactions + compare_periods
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Latência: 310ms • Confiança: 98%
              </span>
            </div>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" /> Auditado pelo Livro-Razão
            </span>
          </div>

          <div className="text-xs text-foreground space-y-3 leading-relaxed">
            <p>
              A sua fatura do cartão <strong className="font-semibold">Nubank (Agosto/2026)</strong> está <strong className="text-amber-600 font-bold">{formatBRL(81200)} (R$ 812,00) mais alta</strong> que a fatura de Julho/2026 (R$ 3.030,00 vs R$ 3.842,00).
            </p>

            <p className="font-semibold text-foreground">As 3 principais variações observadas foram:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <strong className="text-foreground">Supermercado Horizonte:</strong> +{formatBRL(27300)} (R$ 1.280,00 vs R$ 1.007,00 de média).
              </li>
              <li>
                <strong className="text-foreground">Notebook Dell (Parcela 3/10):</strong> +{formatBRL(45000)} (nova parcela mensal iniciada recentemente).
              </li>
              <li>
                <strong className="text-foreground">Energia Residencial Enel:</strong> +{formatBRL(8900)} (R$ 380,00 vs R$ 291,00 no mês anterior).
              </li>
            </ul>
          </div>

          {/* Evidence verification links */}
          <div className="pt-3 border-t border-border flex items-center space-x-3">
            <span className="text-xs font-semibold text-muted-foreground">Verificar Evidências:</span>
            <button className="rounded bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-muted/80 flex items-center gap-1">
              Ver 14 transações da fatura <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Financial Event Explorer (Developer / Portfolio Feature) */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600" />
              Explorador de Eventos Financeiros (Outbox / Bus Timeline)
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Visualização em tempo real das mensagens assíncronas duráveis processadas pelo NATS JetStream
            </p>
          </div>
          <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
            JetStream Status: Operational
          </span>
        </div>

        <div className="font-mono text-xs space-y-2">
          <div className="flex items-center justify-between rounded bg-muted/40 p-2.5 border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">20:14:01</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">statement.uploaded</span>
              <span className="text-muted-foreground text-[11px]">filename: Nubank_Ago_2026.pdf</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">✓ Processado (12ms)</span>
          </div>

          <div className="flex items-center justify-between rounded bg-muted/40 p-2.5 border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">20:14:03</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">document.parsed</span>
              <span className="text-muted-foreground text-[11px]">14 transações extraídas</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">✓ Processado (140ms)</span>
          </div>

          <div className="flex items-center justify-between rounded bg-muted/40 p-2.5 border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">20:14:04</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">reconciliation.completed</span>
              <span className="text-muted-foreground text-[11px]">score: 98% match</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">✓ Processado (45ms)</span>
          </div>

          <div className="flex items-center justify-between rounded bg-muted/40 p-2.5 border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">20:14:05</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">forecast.updated</span>
              <span className="text-muted-foreground text-[11px]">gêmeo digital recarregado</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">✓ Processado (18ms)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

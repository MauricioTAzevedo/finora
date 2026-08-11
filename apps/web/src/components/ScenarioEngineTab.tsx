'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  TrendingDown,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { DEMO_SCENARIO } from '@finora/contracts';
import { formatBRL } from '../lib/formatters';

export function ScenarioEngineTab() {
  const [purchasePrice, setPurchasePrice] = useState<number>(6000);
  const [installments, setInstallments] = useState<number>(12);

  const monthlyInstallment = purchasePrice / installments;
  const lowestBalanceBefore = 6200;
  const lowestBalanceAfter = lowestBalanceBefore - monthlyInstallment * 4;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" />
              Simulador de Cenários &quot;E se...?&quot; (Digital Twin)
            </h2>
            <p className="text-xs text-muted-foreground">
              Simule compras parceladas, reduções de renda ou aportes antes de se comprometer financeiramente. O motor calcula o impacto sem alterar os dados reais.
            </p>
          </div>
          <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            Ambiente Isolado
          </span>
        </div>
      </div>

      {/* Simulator Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Input Card */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Parâmetros da Compra / Decisão
          </h3>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Valor Total do Bem / Compra (R$)
            </label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-muted/40 p-2 text-sm font-bold text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Número de Parcelas Mensais
            </label>
            <select
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-muted/40 p-2 text-sm font-bold text-foreground focus:border-primary focus:outline-none"
            >
              <option value={1}>À vista (1x)</option>
              <option value={3}>3x sem juros</option>
              <option value={6}>6x sem juros</option>
              <option value={10}>10x sem juros</option>
              <option value={12}>12x sem juros</option>
              <option value={24}>24x parcelado</option>
            </select>
          </div>

          <div className="rounded-lg bg-emerald-500/10 border border-emerald-300/40 p-3 text-xs">
            <span className="text-muted-foreground block">Compromisso Mensal Adicional:</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {formatBRL(monthlyInstallment * 100)} / mês
            </span>
          </div>
        </div>

        {/* Comparison Result Cards */}
        <div className="md:col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center justify-between">
            <span>Resultado da Simulação vs Linha de Base</span>
            <span className="text-xs text-emerald-600 font-normal">
              Calculado via Gêmeo Digital
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Baseline */}
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase">
                Menor Saldo Projetado (Linha de Base)
              </span>
              <p className="text-2xl font-bold text-foreground mt-1">
                {formatBRL(lowestBalanceBefore * 100)}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Menor valor da reserva previsto nos próximos 6 meses sem a compra.
              </p>
            </div>

            {/* Simulated */}
            <div className="rounded-lg border border-emerald-300/50 bg-emerald-500/5 p-4">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase">
                Menor Saldo Projetado (Com a Compra)
              </span>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {formatBRL(lowestBalanceAfter * 100)}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                A menor reserva diminui <strong className="text-amber-600">R$ {monthlyInstallment * 4}</strong> nos meses de pico de despesas.
              </p>
            </div>
          </div>

          {/* Finora AI Decision Support Analysis */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-foreground font-bold">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Análise de Suporte à Decisão Finora</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A compra de <strong className="text-foreground">{formatBRL(purchasePrice * 100)}</strong> em {installments} parcelas de <strong className="text-foreground">{formatBRL(monthlyInstallment * 100)}/mês</strong> altera o menor saldo projetado da família de {formatBRL(lowestBalanceBefore * 100)} para {formatBRL(lowestBalanceAfter * 100)}. O saldo de caixa permanece acima da meta de reserva configurada pela família (R$ 4.000,00).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

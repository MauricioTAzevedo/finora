'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap,
  CalendarCheck,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { formatBRL, formatDateBR } from '../lib/formatters';
import { DEMO_ACCOUNTS, DEMO_STATEMENTS } from '@finora/contracts';

export function OverviewTab() {
  const netAvailableCash = 842000 + 1500000; // Itaú + Reserva
  const monthlyIncome = 1450000; // R$ 14.500,00
  const monthlyExpense = 216500;  // R$ 2.165,00
  const upcomingCardBill = 384200; // R$ 3.842,00
  const projectedMonthEnd = netAvailableCash + monthlyIncome - monthlyExpense - upcomingCardBill;

  return (
    <div className="space-y-6">
      {/* Financial Health Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Net Available Cash */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Saldo Líquido Disponível
            </span>
            <div className="rounded-lg bg-emerald-100 dark:bg-emerald-950 p-2 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {formatBRL(netAvailableCash)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Itaú (R$ 8.420) + Reserva (R$ 15.000)
            </p>
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Entradas no Mês
            </span>
            <div className="rounded-lg bg-blue-100 dark:bg-blue-950 p-2 text-blue-600 dark:text-blue-400">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              {formatBRL(monthlyIncome)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Despesas consolidadas: {formatBRL(monthlyExpense)}
            </p>
          </div>
        </div>

        {/* Upcoming Obligations */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Fatura Nubank (Vence 22/08)
            </span>
            <div className="rounded-lg bg-amber-100 dark:bg-amber-950 p-2 text-amber-600 dark:text-amber-400">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
              {formatBRL(upcomingCardBill)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Fecha em 4 dias (15/08) • 14 compras
            </p>
          </div>
        </div>

        {/* Projected Month-End */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Saldo Projetado (Fim do Mês)
            </span>
            <div className="rounded-lg bg-emerald-100 dark:bg-emerald-950 p-2 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {formatBRL(projectedMonthEnd)}
            </p>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              + R$ 7.913,00 de superávit projetado
            </p>
          </div>
        </div>
      </div>

      {/* AI Financial Anomaly Insight Banner */}
      <div className="rounded-xl border border-amber-300/60 bg-amber-500/10 p-4 dark:border-amber-500/30">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Alerta de Anomalia Financeira Detectado pelo Finora Engine
              </h3>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-mono">
                Confiança: 96%
              </span>
            </div>
            <p className="mt-1 text-xs text-foreground/90">
              Os gastos na categoria <strong className="font-semibold">Alimentação / Supermercado</strong> em Agosto (R$ 1.280,00 no Supermercado Horizonte) estão <span className="font-bold text-amber-700 dark:text-amber-300">27% acima da média móvel dos últimos 6 meses</span> (R$ 1.007,00/mês).
            </p>
          </div>
        </div>
      </div>

      {/* Digital Financial Twin - Projection Matrix */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" />
              Gêmeo Digital Financeiro — Projeções de Fluxo de Caixa
            </h2>
            <p className="text-xs text-muted-foreground">
              Projeções determinísticas com base em saldos atuais, contas recorrentes e faturas parceladas
            </p>
          </div>
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-mono text-muted-foreground">
            Modelo: Invariante Determinístico
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
              <span>Projeção +7 Dias</span>
              <CalendarCheck className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">{formatBRL(2315000)}</p>
            <p className="text-xs text-muted-foreground mt-1">Vencimentos: Internet (R$ 149,90)</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
              <span>Projeção +30 Dias</span>
              <CalendarCheck className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">{formatBRL(1851300)}</p>
            <p className="text-xs text-muted-foreground mt-1">Inclui Fatura Nubank + Parcela Notebook</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
              <span>Projeção +90 Dias</span>
              <CalendarCheck className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">{formatBRL(3410000)}</p>
            <p className="text-xs text-muted-foreground mt-1">Acúmulo de superávit contínuo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

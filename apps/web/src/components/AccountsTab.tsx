'use client';

import React from 'react';
import {
  CreditCard,
  Building2,
  PiggyBank,
  Calendar,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { DEMO_ACCOUNTS, DEMO_STATEMENTS } from '@finora/contracts';
import { formatBRL, formatDateBR } from '../lib/formatters';

export function AccountsTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">
            Contas bancárias e Cartões de Crédito
          </h2>
          <p className="text-xs text-muted-foreground">
            Gerencie saldos, faturas abertas, limites e compromissos parcelados
          </p>
        </div>
        <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-hover flex items-center gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" />
          <span>Nova Conta / Cartão</span>
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Checking Account */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xs">
                ITAÚ
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground">Itaú Conta Corrente</h3>
                <p className="text-[11px] text-muted-foreground">Ag 1834 • CC 4821-0</p>
              </div>
            </div>
            <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
              Ativa
            </span>
          </div>

          <div className="pt-2">
            <span className="text-[11px] text-muted-foreground uppercase font-semibold">
              Saldo em Conta
            </span>
            <p className="text-2xl font-bold text-foreground mt-0.5">
              {formatBRL(842000)}
            </p>
          </div>
        </div>

        {/* Savings / Investments */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                RICO
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground">Reserva de Emergência</h3>
                <p className="text-[11px] text-muted-foreground">Tesouro Selic • Rico</p>
              </div>
            </div>
            <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
              Rendimento 100% CDI
            </span>
          </div>

          <div className="pt-2">
            <span className="text-[11px] text-muted-foreground uppercase font-semibold">
              Saldo Total Guardado
            </span>
            <p className="text-2xl font-bold text-foreground mt-0.5">
              {formatBRL(1500000)}
            </p>
          </div>
        </div>

        {/* Credit Card Card */}
        <div className="rounded-xl border border-purple-300/60 bg-purple-950/10 dark:border-purple-500/30 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                NU
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground">Nubank Credit Card</h3>
                <p className="text-[11px] text-muted-foreground">Visa Infinite • Final 7731</p>
              </div>
            </div>
            <span className="rounded bg-purple-100 dark:bg-purple-950 px-2 py-0.5 text-[11px] font-semibold text-purple-800 dark:text-purple-300">
              Fecha em 15/08
            </span>
          </div>

          <div className="pt-2">
            <span className="text-[11px] text-muted-foreground uppercase font-semibold">
              Fatura Atual (Vence 22/08)
            </span>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-0.5">
              {formatBRL(384200)}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Limite disponível: {formatBRL(1115800)} / R$ 15.000
            </p>
          </div>
        </div>
      </div>

      {/* Active Installments Table */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
          Compromissos Parcelados Ativos (Parcelamentos)
        </h3>

        <div className="rounded-lg border border-border bg-muted/30 p-4 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-foreground">Notebook Dell Workstation</span>
            <p className="text-[11px] text-muted-foreground">
              Comprado em Maio/2026 • Dell Computadores
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
              Parcela 3 de 10 (R$ 450,00/mês)
            </span>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Restante a pagar: {formatBRL(315000)} de R$ 4.500,00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

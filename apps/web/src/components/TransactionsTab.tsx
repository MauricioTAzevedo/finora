'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  CreditCard,
  Layers,
  CheckCircle2,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { DEMO_TRANSACTIONS } from '@finora/contracts';
import { formatBRL, formatDateBR } from '../lib/formatters';

export function TransactionsTab() {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTransactions = DEMO_TRANSACTIONS.filter((tx) => {
    if (filterType !== 'ALL' && tx.type !== filterType) return false;
    if (
      searchTerm &&
      !tx.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !tx.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por descrição, comerciante ou categoria..."
            className="w-full rounded-lg border border-border bg-muted/40 py-1.5 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('ALL')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterType === 'ALL'
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Todas ({DEMO_TRANSACTIONS.length})
          </button>
          <button
            onClick={() => setFilterType('EXPENSE')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterType === 'EXPENSE'
                ? 'bg-rose-600 text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Despesas
          </button>
          <button
            onClick={() => setFilterType('INCOME')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterType === 'INCOME'
                ? 'bg-emerald-600 text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Entradas
          </button>
          <button
            onClick={() => setFilterType('TRANSFER')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filterType === 'TRANSFER'
                ? 'bg-blue-600 text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Transferências
          </button>
        </div>
      </div>

      {/* Dense Spreadsheet-Grade Data Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-muted-foreground font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Descrição</th>
                <th className="py-3 px-4">Categoria / Tag</th>
                <th className="py-3 px-4">Conta Origem</th>
                <th className="py-3 px-4 text-right">Valor</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((tx) => {
                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-muted/30 transition-colors font-medium text-foreground"
                  >
                    <td className="py-3 px-4 whitespace-nowrap text-muted-foreground font-mono">
                      {formatDateBR(tx.occurredAt)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {tx.type === 'EXPENSE' && (
                        <span className="inline-flex items-center gap-1 badge-expense px-2 py-0.5 rounded text-[11px] font-medium">
                          <ArrowDownRight className="h-3 w-3" /> Despesa
                        </span>
                      )}
                      {tx.type === 'INCOME' && (
                        <span className="inline-flex items-center gap-1 badge-income px-2 py-0.5 rounded text-[11px] font-medium">
                          <ArrowUpRight className="h-3 w-3" /> Receita
                        </span>
                      )}
                      {tx.type === 'TRANSFER' && (
                        <span className="inline-flex items-center gap-1 badge-transfer px-2 py-0.5 rounded text-[11px] font-medium">
                          <ArrowRightLeft className="h-3 w-3" /> Transferência
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-foreground">
                        {tx.description}
                      </div>
                      {tx.totalInstallments && (
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                          Parcelamento: {tx.currentInstallment}/{tx.totalInstallments} (R$ 450,00/mês)
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {tx.categoryName || (tx.type === 'TRANSFER' ? 'Transferência Interna' : 'Sem Categoria')}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-muted-foreground">
                      {tx.sourceAccountId === 'acc-itau'
                        ? 'Itaú Conta Corrente'
                        : tx.sourceAccountId === 'acc-nubank'
                        ? 'Nubank Cartão'
                        : 'Reserva'}
                    </td>
                    <td
                      className={`py-3 px-4 whitespace-nowrap text-right font-mono font-bold ${
                        tx.type === 'EXPENSE'
                          ? 'text-rose-600 dark:text-rose-400'
                          : tx.type === 'INCOME'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {tx.type === 'EXPENSE' ? '- ' : tx.type === 'INCOME' ? '+ ' : ''}
                      {formatBRL(tx.amount)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Postado
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-center">
                      <button
                        title="Ver detalhes do livro-razão / lançamentos"
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

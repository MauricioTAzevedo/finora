'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { OverviewTab } from '../components/OverviewTab';
import { TransactionsTab } from '../components/TransactionsTab';
import { AccountsTab } from '../components/AccountsTab';
import { ImportCenterTab } from '../components/ImportCenterTab';
import { ScenarioEngineTab } from '../components/ScenarioEngineTab';
import { AiExplorerTab } from '../components/AiExplorerTab';
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  FileSpreadsheet,
  Calculator,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  X,
} from 'lucide-react';

type TabType =
  | 'OVERVIEW'
  | 'TRANSACTIONS'
  | 'ACCOUNTS'
  | 'IMPORT'
  | 'SCENARIO'
  | 'AI_EXPLORER';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('OVERVIEW');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showNewTxModal, setShowNewTxModal] = useState<boolean>(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#090d16]' : 'bg-[#f8fafc]'}`}>
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNewTransaction={() => setShowNewTxModal(true)}
        onImportClick={() => setActiveTab('IMPORT')}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 border-b border-border overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'OVERVIEW'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Visão Geral</span>
          </button>

          <button
            onClick={() => setActiveTab('TRANSACTIONS')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'TRANSACTIONS'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Receipt className="h-4 w-4" />
            <span>Transações & Livro-Razão</span>
          </button>

          <button
            onClick={() => setActiveTab('ACCOUNTS')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'ACCOUNTS'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Contas & Cartões</span>
          </button>

          <button
            onClick={() => setActiveTab('IMPORT')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'IMPORT'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Importação Excel & Extratos</span>
          </button>

          <button
            onClick={() => setActiveTab('SCENARIO')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'SCENARIO'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Calculator className="h-4 w-4" />
            <span>Simulador &quot;E se...?&quot;</span>
          </button>

          <button
            onClick={() => setActiveTab('AI_EXPLORER')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'AI_EXPLORER'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Finora AI & Eventos</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === 'OVERVIEW' && <OverviewTab />}
          {activeTab === 'TRANSACTIONS' && <TransactionsTab />}
          {activeTab === 'ACCOUNTS' && <AccountsTab />}
          {activeTab === 'IMPORT' && <ImportCenterTab />}
          {activeTab === 'SCENARIO' && <ScenarioEngineTab />}
          {activeTab === 'AI_EXPLORER' && <AiExplorerTab />}
        </div>
      </main>

      {/* New Transaction Modal (Quick Action) */}
      {showNewTxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-foreground">
                + Adicionar Nova Transação (Livro-Razão)
              </h3>
              <button
                onClick={() => setShowNewTxModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowNewTxModal(false);
                alert('Transação registrada e contabilizada no livro-razão com sucesso!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Tipo de Lançamento
                </label>
                <select className="w-full rounded-lg border border-border bg-muted/40 p-2 font-medium text-foreground focus:border-primary focus:outline-none">
                  <option value="EXPENSE">Despesa (-)</option>
                  <option value="INCOME">Receita / Entrada (+)</option>
                  <option value="TRANSFER">Transferência Interna (R$ 0 despesa)</option>
                  <option value="CREDIT_CARD_PAYMENT">Pagamento de Fatura (R$ 0 despesa)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  placeholder="Ex: Supermercado Horizonte"
                  required
                  className="w-full rounded-lg border border-border bg-muted/40 p-2 font-medium text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="150,00"
                    required
                    className="w-full rounded-lg border border-border bg-muted/40 p-2 font-mono font-bold text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-08-11"
                    className="w-full rounded-lg border border-border bg-muted/40 p-2 font-medium text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Conta de Origem / Meio de Pagamento
                </label>
                <select className="w-full rounded-lg border border-border bg-muted/40 p-2 font-medium text-foreground focus:border-primary focus:outline-none">
                  <option value="acc-itau">Itaú Conta Corrente (R$ 8.420,00)</option>
                  <option value="acc-nubank">Nubank Cartão de Crédito</option>
                  <option value="acc-reserva">Reserva de Emergência</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewTxModal(false)}
                  className="rounded-lg border border-border bg-card px-4 py-2 font-semibold text-foreground hover:bg-muted"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-hover shadow-sm"
                >
                  Salvar Transação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

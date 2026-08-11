'use client';

import React from 'react';
import {
  Wallet,
  Building2,
  PlusCircle,
  FileSpreadsheet,
  Search,
  Moon,
  Sun,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onNewTransaction: () => void;
  onImportClick: () => void;
}

export function Navbar({
  darkMode,
  setDarkMode,
  onNewTransaction,
  onImportClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/95 backdrop-blur backdrop-filter">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Household Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                FINORA
              </span>
              <span className="ml-2 rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                PRO
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 border-l border-border pl-4">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <select
              aria-label="Selecionar Família / Household"
              className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
            >
              <option value="hh-silva">Família Silva (Demo)</option>
            </select>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar transação, mercado ou assinaturas... (Ctrl+K)"
              className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-9 pr-4 text-xs font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onImportClick}
            className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Importar Planilha</span>
          </button>

          <button
            onClick={onNewTransaction}
            className="flex items-center space-x-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-hover shadow-sm transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>+ Transação</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Alternar tema"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

import { Money } from '@finora/contracts';

/**
 * Formats an integer minor unit Money object into Brazilian Real currency string.
 * Example: { amountMinor: 12990, currency: 'BRL' } => "R$ 129,90"
 */
export function formatBRL(money: Money | number): string {
  const minor = typeof money === 'number' ? money : money.amountMinor;
  const major = minor / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(major);
}

/**
 * Formats ISO date string to Brazilian date format (DD/MM/YYYY)
 */
export function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats ISO date string to short date & time (DD/MM HH:mm)
 */
export function formatDateTimeBR(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

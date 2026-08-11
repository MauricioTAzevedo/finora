import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finora — Household Financial Intelligence Platform',
  description:
    'Plataforma autônoma e inteligente de gestão financeira familiar para o Brasil. Substitua planilhas Excel por um livro-razão de dupla entrada e gêmeo digital financeiro.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}

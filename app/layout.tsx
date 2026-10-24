import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth/auth-context';
import { DemoBanner } from '@/components/demo-banner';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CookieBanner } from '@/components/cookie-banner';

export const metadata: Metadata = {
  title: 'HireRoom — Collaborative Technical Interview Platform',
  description: 'AI-assisted hiring and live technical interview platform featuring live collaborative coding, objective telemetry co-pilot, practice lounge, and evidence-linked evaluations. An academic project by Sepal Sagar.',
  openGraph: {
    title: 'HireRoom — Collaborative Technical Interview Platform',
    description: 'AI-assisted hiring and live technical interview platform by Sepal Sagar.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireRoom — Collaborative Technical Interview Platform',
    description: 'AI-assisted hiring and live technical interview platform by Sepal Sagar.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            <DemoBanner />
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <CookieBanner />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

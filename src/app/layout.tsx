import type { Metadata } from 'next';
import { Geist, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
const geist = Geist({ variable: '--font-portfolio-sans', subsets: ['latin'], display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ['400', '500', '600'], variable: '--font-ibm-plex-mono', subsets: ['latin'], display: 'swap' });
export const metadata: Metadata = {
  title: 'Ray Pratidina | UI/UX Designer',
  description: 'I design digital products that make complex things feel simple.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${ibmPlexMono.variable} font-sans antialiased`}><Providers>{children}</Providers></body></html>;
}

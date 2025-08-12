import type { Metadata } from 'next';
import { Roboto_Flex as Roboto } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/application/client-providers';

export const metadata: Metadata = {
  title: 'Ifdo Browser',
  description: 'A web application for exploring and visualizing Ifdo metadata'
};

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto'
});
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head> */}
      <body className={`${roboto.variable}`}>
        <ClientProviders>
          <div className="m-0 p-0 h-[100%]">{children}</div>
        </ClientProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/Providers/theme-provider";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarafé",
  description: "Tarafé est une plateforme digitale de personnalisation des produits mode, accessoires et déco, avec une touche africaine, pour les entreprises et les particuliers. Notre mission est de valoriser les savoir-faire et le patrimoine textile local. Bienvenue !",
  openGraph: {
		title: "Tarafé",
		description: "Tarafé est une plateforme digitale de personnalisation des produits mode, accessoires et déco, avec une touche africaine, pour les entreprises et les particuliers. Notre mission est de valoriser les savoir-faire et le patrimoine textile local. Bienvenue !",
		url: "tarafe.com",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="fr" suppressHydrationWarning>
      <body className={cn(inter.variable)}>
        <Providers>
          {/* <ThemeProvider attribute="class" defaultTheme="system"  enableSystem  disableTransitionOnChange enableColorScheme  > */}
              {children}
          {/* </ThemeProvider> */}
        </Providers>
      </body>
    </html>

  );
}

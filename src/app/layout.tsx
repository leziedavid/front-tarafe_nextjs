import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import Providers from "@/components/Providers";
import { ThemeProvider } from "@/components/Providers/theme-provider";

// 👇️ Ajouté : si tu utilises clsx comme utilitaire pour combiner les classes
import { cn } from "@/lib/utils"; // Assure-toi que cette fonction existe dans ce chemin
// 👇️ Exemple d'utilisation d'une police (remplace 'geist' par 'inter' si Geist n'existe pas)
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
          <ThemeProvider attribute="class" defaultTheme="system"  enableSystem  disableTransitionOnChange enableColorScheme  >
              {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>

  );
}

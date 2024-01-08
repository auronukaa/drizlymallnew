import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import ToastProvider from "@/provider/toast-provider";
import Providers from "@/provider/providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Destinacioni ku blerësit e zgjuar gjejnë ofertat më të mira",
  description:
    "Drizlymall është një platformë e-commerce e cila ofron një gamë të gjerë të produkteve dhe shërbimeve të përzgjedhura me kujdes, të cilat janë aktraktive për ata që janë në kërkim të ofertave të shkëlqyera",
  alternates: {
    canonical: `https://drizlymall.com`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="pt-[64.8px]">
      <body className={inter.className}>
        <ToastProvider />
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}

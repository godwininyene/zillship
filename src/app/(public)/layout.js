import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css'
import PageNav from "@/ui/PageNav";
import Footer from "@/ui/Footer";
import AOSProvider from "@/ui/AOSProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  // title:"The wild oasis"
  title: {
    template: "%s / Zill Ship",
    default: "Welcome to Zill ship /  Premium Global Shipping Solutions",
  },
  // description:
  //   "Luxurious cabin hotel, located in the heart of the Italian Dolomites,\
  //   surrounded by beautiful mountains and dark forests",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageNav/>
        <AOSProvider>
          <main> {children}</main>
        </AOSProvider>
        
        <Footer/>
      </body>
    </html>
  );
}

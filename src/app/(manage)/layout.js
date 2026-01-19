import AppShell from "@/ui/AppShell";
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getCurrentUser, requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Main Layout Component
export default async function RootLayout({ children }) {
   const { authorized, message } = await requireAuth("admin");

  if (!authorized){
    if(message){
      redirect(`/login?message=${message}`);
    }else{
      redirect(`/login`);
    }
  }
  
  const user = await getCurrentUser()
  
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
       <AppShell user={user}>{children}</AppShell>
      </body>
    </html>
  )
}
import type { Metadata } from "next";
import { Arsenal, EB_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "react-hot-toast";
import StyledProgressBar from "@/components/progress-bar";
import Script from "next/script";

const arsenal = Arsenal({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arsenal",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${arsenal.className} ${garamond.variable} ${arsenal.variable}`}
      >
        <StyledProgressBar />
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}

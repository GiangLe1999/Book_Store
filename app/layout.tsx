import { Arsenal, EB_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "react-hot-toast";
import StyledProgressBar from "@/components/progress-bar";
import { websiteDescription, websiteName } from "@/constants";

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

export const generateMetadata = async () => {
  return {
    title: {
      template: `%s | ${websiteName}`,
      default: websiteName,
    },
    description: websiteDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
  };
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

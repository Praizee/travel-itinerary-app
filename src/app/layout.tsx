import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/providers";
import { ShellLayout } from "@/components/layout";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Itinerary | Plan Your Perfect Trip",
  description:
    "Build, personalize, and optimize your travel itineraries with our comprehensive trip planner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <ShellLayout>{children}</ShellLayout>
        </Providers>
      </body>
    </html>
  );
}


import { GeistSans as regularFont } from "geist/font/sans";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { MapboxMap } from "@/components/mapbox-map";
import { Navbar } from "@/components/navbar";
import { APP } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "./globals.css";

const headingFont = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: APP.name,
  description: APP.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full min-h-[100vh]">
      <body
        className={cn(
          regularFont.className,
          headingFont.variable,
          "relative h-full min-h-full bg-black text-zinc-300"
        )}
      >
        <div
          className="relative min-h-full overflow-hidden"
          vaul-drawer-wrapper=""
        >
          <div className="absolute left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-none md:border md:border-zinc-800 bg-zinc-900/60 bg-clip-padding backdrop-blur-lg backdrop-filter md:h-[90%] md:w-[90%] md:rounded-xl">
            <Navbar />
            {children}
          </div>
          <div className="full absolute -z-10">
            <MapboxMap />
          </div>
        </div>
      </body>
    </html>
  );
}

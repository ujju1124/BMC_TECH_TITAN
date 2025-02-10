import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata = {
  title: "Path Finder",
  description:
    "Find the routes and paths for public buses and services in your city",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <Suspense>
        <html lang="en">
          <body className={`${poppins.subsets} font-Poppins antialiased`}>
            {children}
          </body>
        </html>
      </Suspense>
    </ClerkProvider>
  );
}

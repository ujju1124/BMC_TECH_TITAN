import { Poppins } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={` ${poppins.subsets}  font-Poppins antialiased`}>
        {children}
      </body>
    </html>
  );
}

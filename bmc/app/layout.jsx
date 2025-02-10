import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/components/layouts/AuthAdmin";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata = {
  title: "UrbanFlow",
  description:
    "Smart Mobility for safer street",
};


// Root Layout for the application
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} antialiased`}>
        {children}
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}

import { Poppins } from "next/font/google";

export const metadata = {
  title: "Buddy Script",
  icons: {
    icon: "/assets/images/logo-copy.svg",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"],
});

import "@/public/assets/css/bootstrap.min.css";
import "@/public/assets/css/common.css";
import "@/public/assets/css/main.css";
import "@/public/assets/css/responsive.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={poppins.className}>
    	{children}
    </body>
    </html>
    )
}
import { Inter } from "next/font/google";
import "./home.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Storb.lol | Loja",
  description: "Envie presentes para seus amigos gratuitamente.",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

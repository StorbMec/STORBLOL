import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleFonts } from 'next-google-fonts'

export default function Document() {
  return (
    <Html>
      <Head>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" />
        {/* outros elementos do head */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
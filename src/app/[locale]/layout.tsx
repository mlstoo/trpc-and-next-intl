import { NextIntlClientProvider, useMessages } from "next-intl";
import { JetBrains_Mono } from "next/font/google";
import { ReactNode } from "react";
import SessionProvider from "../../utils/SessionProvider";
import ThemeProvider from "../../utils/ThemeProvider";
import { TrpcProvider } from "../../utils/trpc-provider";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const font = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <title>next-intl & next-auth</title>
      </head>
      <body
        className={`${font.className} bg-primary flex min-h-screen flex-col`}
      >
        <ThemeProvider>
          <TrpcProvider>
            <SessionProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </SessionProvider>
          </TrpcProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { StoreProvider } from "../../store/store-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

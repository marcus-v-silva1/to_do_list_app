"use client";

import React from 'react';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const theme = createTheme();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="br-pt">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

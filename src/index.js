
import React from "react";
import { createRoot } from "react-dom/client";
import BaiTest4Form from "./BaiTest4Form";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
const container = document.getElementById("root");
const root = createRoot(container);
const theme = {
  colors: {
    surface: '#FAFAFA',
    onSurface: '#1F1F1F',
    interactive: '#ed4d2d',          // Màu primary chính
    primary: '#ed4d2d',               // Thay đổi màu primary ở đây
    critical: '#D82C0D',
    warning: '#FFC453',
    highlight: '#5BC4BF',
    success: '#008060',
    decorative: '#FFC96B',
  }
};
root.render(
  <AppProvider i18n={en} theme={theme}>
    <BaiTest4Form />
  </AppProvider>
);

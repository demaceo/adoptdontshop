import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("root") as HTMLElement & { __root?: ReturnType<typeof createRoot> };
if (!container) throw new Error("Root container not found!");

if (!container.__root) {
  container.__root = createRoot(container);
}

container.__root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

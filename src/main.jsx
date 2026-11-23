import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./lib/api";
import "./styles.css";
import Layout from "./components/Layout";
import MembersGate from "./components/MembersGate";
import Home from "./pages/Home";
import { isLustrumYear } from "./lib/config";

const Leden = lazy(() => import("./pages/Leden"));
const Besturen = lazy(() => import("./pages/Besturen"));
const Dpb = lazy(() => import("./pages/Dpb"));
const Vap = lazy(() => import("./pages/Vap"));
const Gala = lazy(() => import("./pages/Gala"));
const Fotos = lazy(() => import("./pages/Fotos"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="leden"
            element={
              <MembersGate title="Leden">
                <Leden />
              </MembersGate>
            }
          />
          <Route
            path="besturen"
            element={
              <MembersGate title="Besturen">
                <Besturen />
              </MembersGate>
            }
          />
          <Route path="dpb" element={<Dpb />} />
          <Route path="vap" element={<Vap />} />
          {isLustrumYear() && <Route path="gala" element={<Gala />} />}
          <Route path="fotos" element={<Fotos />} />
          <Route path="deltaadmin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

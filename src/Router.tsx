import { Layout } from "layout";
import { lazy } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/Home"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

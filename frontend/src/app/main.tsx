import { createRoot } from "react-dom/client";
import { AppLayout } from "./AppLayout";
import { Provider } from "../shared/lib/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router";
import { RegisterForm } from "../pages/login";
import { LoginForm } from "../pages/login";
import { ProtectedRoutes } from "./providers/ProtectedRoutes";
import "./../shared/api/authInterceptor";
import { DragAndDrop } from "../features/drag-and-drop";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path="/">
          <Route index element={<LoginForm />} />
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<ProtectedRoutes />}>
            <Route element={<DragAndDrop />} path="/home" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);

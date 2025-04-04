// src/routes/index.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/shared/Loading";

// Lazy load pages for better performance
const HomePage = React.lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("../pages/HomePage")), 2000)
    )
);
const NotFoundPage = React.lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("../pages/NotFoundPage")), 2000)
    )
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading variant="withText" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

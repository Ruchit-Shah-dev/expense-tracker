import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import TransactionPage from "./components/TransactionPage/TransactionPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    {
      path: "/transactionPage",
      element: <TransactionPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

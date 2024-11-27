import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/notfound/NotFound";
import Detail from "./pages/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="detail/:imdbId" element={<Detail />} />
        <Route errorElement path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

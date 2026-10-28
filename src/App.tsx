import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import FuelSupplySolutions from "./pages/FuelSupplySolutions";
import Industries from "./pages/Industries";
import RequestAQuote from "./pages/RequestAQuote";
import SupplierEnquiries from "./pages/SupplierEnquiries";
import Contact from "./pages/Contact";
import Insights from "./pages/Insights";
import Article from "./pages/Article";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/fuel-supply-solutions" element={<FuelSupplySolutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/request-a-quote" element={<RequestAQuote />} />
        <Route path="/supplier-enquiries" element={<SupplierEnquiries />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<Article />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

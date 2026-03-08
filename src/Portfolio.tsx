import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

export const Portfolio = () => {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  );
};
export default Portfolio;

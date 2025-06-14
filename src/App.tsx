
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import Testimonials from '@/pages/Testimonials';
import Auth from '@/pages/Auth';
import Account from '@/pages/Account';
import Universities from '@/pages/Universities';
import Scholarships from '@/pages/Scholarships';
import Cities from '@/pages/Cities';
import Economy from '@/pages/Economy';
import CountryPage from '@/pages/CountryPage';
import ApplicationForm from '@/pages/ApplicationForm';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/universities" element={<Universities />} />
                    <Route path="/scholarships" element={<Scholarships />} />
                    <Route path="/cities" element={<Cities />} />
                    <Route path="/economy" element={<Economy />} />
                    <Route path="/country/:countryName" element={<CountryPage />} />
                    <Route path="/apply/:countryName" element={<ApplicationForm />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

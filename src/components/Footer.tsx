
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/c5c07b39-805a-4d37-a779-799573449d9e.png" 
                alt="EDUPASS Logo" 
                className="h-8 w-auto filter brightness-0 invert"
              />
              <span className="text-xl font-bold">EDUPASS</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('aboutDescription')}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-edu-blue-400" />
                <span className="text-sm">info@edupass.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-edu-blue-400" />
                <span className="text-sm">Global Offices</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                {t('about')}
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-white transition-colors">
                {t('services')}
              </Link>
              <Link to="/testimonials" className="block text-gray-300 hover:text-white transition-colors">
                {t('testimonials')}
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                {t('contact')}
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <div className="space-y-2">
              <div className="text-gray-300">{t('universityAdmission')}</div>
              <div className="text-gray-300">{t('scholarships')}</div>
              <div className="text-gray-300">{t('visaGuidance')}</div>
              <div className="text-gray-300">{t('accommodation')}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 EDUPASS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

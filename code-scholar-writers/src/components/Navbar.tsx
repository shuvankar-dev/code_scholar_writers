import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import logo from '/logo.png';

interface NavbarProps {
  onCalculatePrice: () => void;
}

const Navbar = ({ onCalculatePrice }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp integration function
  const handleWhatsAppClick = () => {
    const phoneNumber = "918777841275"; // International format without '+' or dashes
    const message = "Hi CodeScholar, can you send me more details for my assignment?";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Samples", href: "/samples" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const handleMobileNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#18122B]/95 backdrop-blur-md border-b border-[#A259F7]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="CodeScholar Writers Home">
              <img 
                src={logo} 
                alt="CodeScholar Writers" 
                className="h-45 w-45"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 text-white hover:text-[#a259f7]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
            <button 
              onClick={onCalculatePrice}
              className="text-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r from-purple-600 via-red-600 to-orange-500"
            >
              Calculate Price
            </button>

            <button 
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 text-green-600 border border-green-500 bg-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:bg-green-50 hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Contact us on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.148-.666.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.666-1.611-.912-2.207-.242-.579-.487-.5-.666-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.358.711.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.075-.124-.271-.198-.571-.347z"/>
              </svg>
              <span className="hidden lg:inline">Get Free Quote</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-purple-400 hover:bg-gray-800 transition-colors duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-2 pt-2 pb-4 space-y-2 bg-gray-900 border-t border-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-300 hover:text-purple-400 block px-3 py-2 text-base font-semibold transition-colors duration-300 rounded-md hover:bg-gray-800"
              onClick={handleMobileNavClick}
            >
              {item.name}
            </Link>
          ))}

          <div className="px-3 py-4 space-y-2 border-t border-gray-700 mt-4">
            <button 
              onClick={() => {
                onCalculatePrice();
                handleMobileNavClick();
              }}
              className="w-full text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg active:scale-95"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
            >
              Calculate Price
            </button>

            <button 
              onClick={() => {
                handleWhatsAppClick();
                handleMobileNavClick();
              }}
              className="flex items-center justify-center gap-2 w-full text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg active:scale-95"
              style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
              aria-label="Contact us on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.148-.666.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.666-1.611-.912-2.207-.242-.579-.487-.5-.666-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.358.711.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.075-.124-.271-.198-.571-.347z"/>
              </svg>
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

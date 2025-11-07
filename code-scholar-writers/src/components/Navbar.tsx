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
    const phoneNumber = "918274806946"; // Remove spaces and special characters for URL
  const message = "Hi CodeScholar, can you send me more details for my assignment?";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
  <nav className="fixed top-0 w-full z-50 bg-[#18122B]/95 backdrop-blur-md border-b border-[#A259F7]/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center h-16" style={{ justifyContent: 'space-between' }}>
          {/* Logo - using available left space */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="CodeScholar Writers" className="h-45 w-45" />
            </Link>
          </div>

          {/* Desktop Navigation - centered with good spacing */}
          <div className="hidden md:block flex-1">
            <div className="flex items-baseline justify-center space-x-6">
              {/* Updated text color for better visibility */}
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-base font-bold transition-all duration-300 hover:scale-105 text-white hover:text-[#FFD36E]"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-3 py-2 text-base font-bold transition-all duration-300 hover:scale-105 text-white hover:text-[#a259f7]"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* CTA Buttons - using available right space */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <button 
                onClick={onCalculatePrice}
                className="text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-purple-600 via-red-600 to-orange-500"
              >
                Calculate Price
              </button>

            <button 
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 text-green-600 border border-green-500 bg-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:bg-green-50 hover:scale-105 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.148-.666.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.666-1.611-.912-2.207-.242-.579-.487-.5-.666-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.075-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.358.711.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.075-.124-.271-.198-.571-.347z"/>
              </svg>
              Get Free Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-700">
          {navItems.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-lg font-bold transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-lg font-bold transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
          <div className="px-3 py-2 space-y-3">
            <button 
              onClick={() => {
                onCalculatePrice();
                setIsOpen(false);
              }}
              className="w-full text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
            >
              Calculate Price
            </button>
            <button 
              onClick={() => {
                handleWhatsAppClick();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
              style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
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

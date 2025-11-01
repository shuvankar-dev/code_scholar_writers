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
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Calculate Price
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Calculate Price
            </button>
            <button 
              onClick={() => {
                handleWhatsAppClick();
                setIsOpen(false);
              }}
              className="w-full bg-gray-800 text-blue-400 border-2 border-blue-400 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 shadow-lg"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

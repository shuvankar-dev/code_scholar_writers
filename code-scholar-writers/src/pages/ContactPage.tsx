import React from "react";

const whatsappNumber = "+91 98765 43210"; // Replace with your actual WhatsApp number

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-white">
        <h1 className="text-4xl font-extrabold mb-4 text-gold-500 drop-shadow-lg">Contact Us</h1>
        <p className="mb-6 text-lg font-medium text-white/80">We’re here to help you with premium academic solutions. Reach out to us for any queries or assistance.</p>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-700 p-3 rounded-full shadow-lg">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white"><path d="M17 10.5V7a5 5 0 0 0-10 0v3.5"/><rect x="5" y="10.5" width="14" height="10.5" rx="2"/><path d="M8 16h8"/></svg>
            </span>
            <div>
              <div className="font-semibold text-xl">WhatsApp</div>
              <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline text-lg">{whatsappNumber}</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-700 p-3 rounded-full shadow-lg">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
            </span>
            <div>
              <div className="font-semibold text-xl">Email</div>
              <a href="mailto:info@codescholarwriters.com" className="text-blue-300 hover:underline text-lg">info@codescholarwriters.com</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block bg-gradient-to-r from-purple-400 to-purple-700 p-3 rounded-full shadow-lg">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white"><path d="M17 20H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2z"/><path d="M7 10h10"/></svg>
            </span>
            <div>
              <div className="font-semibold text-xl">Address</div>
              <div className="text-purple-300 text-lg">West Nabanagar, Birati, Kolkata - 700051</div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-700 text-white font-bold py-2 px-6 rounded-full shadow-lg text-lg tracking-wide">Premium Support, 24/7</span>
        </div>
      </div>
    </div>
  );
}

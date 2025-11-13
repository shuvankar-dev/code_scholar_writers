const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Contact Form */}
          <div className="p-8 lg:p-12">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">Contact us</h1>
            <p className="text-lg text-gray-600 mb-8">
              Our friendly team would love to hear from you.
            </p>

            <form className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                required
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                required
              />

              {/* Message */}
              <textarea
                placeholder="Leave us a message..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                rows={4}
                required
              ></textarea>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="w-4 h-4 mt-1 accent-purple-600"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  You agree to our friendly{" "}
                  <a href="#" className="text-purple-600 underline hover:text-purple-700">
                    privacy policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg hover:shadow-xl"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Right Side - Image & Contact Details */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 lg:p-12 flex flex-col justify-between">
            {/* Contact Image */}
            <div className="mb-8">
              <img
                src="/ContactPage.png"
                alt="Contact us"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Our Location
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    99 S.t Jomblo Park<br />
                    Pekanbaru 28292,<br />
                    Indonesia
                  </p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Phone Number
                  </h3>
                  <p className="text-sm text-gray-600">
                    (+62) 81 414 257 9980
                  </p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="text-purple-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Email Address
                  </h3>
                  <p className="text-sm text-gray-600">
                    info@yourdomain.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

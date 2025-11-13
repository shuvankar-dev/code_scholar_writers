const FAQSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          <details className="border border-gray-200 rounded-lg p-4 sm:p-6 group cursor-pointer hover:bg-gray-50 transition-colors">
            <summary className="text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-between">
              What's included in the base price?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Our base price includes high-quality writing, research, proper formatting, plagiarism report, 
              and the specified number of free revisions based on your chosen tier.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4 sm:p-6 group cursor-pointer hover:bg-gray-50 transition-colors">
            <summary className="text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-between">
              How does academic level affect pricing?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Higher academic levels require more expertise and research depth. PhD-level work requires 
              specialized knowledge and carries a 2x multiplier, while high school work has no additional charge.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4 sm:p-6 group cursor-pointer hover:bg-gray-50 transition-colors">
            <summary className="text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-between">
              Can I get a discount for larger orders?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Yes! We offer volume discounts for orders over 10 pages. Contact our support team for 
              custom pricing on large projects or multiple assignments.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4 sm:p-6 group cursor-pointer hover:bg-gray-50 transition-colors">
            <summary className="text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-between">
              What payment methods do you accept?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              We accept all major credit cards, PayPal, bank transfers, and cryptocurrency payments. 
              All transactions are secured with 256-bit SSL encryption.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4 sm:p-6 group cursor-pointer hover:bg-gray-50 transition-colors">
            <summary className="text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-between">
              How do you ensure quality and originality?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              All our work is written from scratch by qualified writers with advanced degrees. We use plagiarism 
              detection software and have a quality assurance team that reviews every project before delivery.
            </p>
          </details>

          <details className="border border-gray-200 rounded-lg p-4 sm:p-6 group cursor-pointer hover:bg-gray-50 transition-colors">
            <summary className="text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-between">
              What if I'm not satisfied with the work?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              We offer free revisions based on your chosen tier and have a money-back guarantee if you're 
              not satisfied. Our customer support team is available 24/7 to address any concerns.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
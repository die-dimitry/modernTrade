import React, { useState, useEffect } from 'react'
import { getRandomStockImage } from '../utils/imageUtils'
import { BRAND_NAME } from '../config/brand'

export default function TermsAndConditions() {
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    setBgImage(getRandomStockImage())
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Background Image */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: 'brightness(0.2) contrast(1.2) saturate(1.1)'
          }}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      
      {/* Abstract Design Elements */}
      <div className="absolute inset-0 abstract-bg-1 opacity-30"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white">
              Terms and <span className="text-primary">Conditions</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-gray-400 mt-6 text-lg">
              {BRAND_NAME} – Terms and Conditions / User Agreement
            </p>
          </div>

          {/* Content */}
          <div className="bg-dark-gray/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl">
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
              <p className="text-lg leading-relaxed">
                The term <strong className="text-primary">{BRAND_NAME}</strong> (
                <a href="https://www.moderntrade.in" className="text-primary hover:text-primary-light underline" target="_blank" rel="noopener noreferrer">
                  https://www.moderntrade.in
                </a>) refers to the website and/or mobile application, its owner(s), employees, and associates. The terms <strong>"You"</strong> or <strong>"User"</strong> refer to the individual accessing, subscribing to, or using any {BRAND_NAME} service.
              </p>

              <section className="mt-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  1. Acknowledgment of Service
                </h2>
                <p className="leading-relaxed">
                  You confirm that you have evaluated our free/demo calls, are satisfied with the results, and have voluntarily chosen to subscribe to {BRAND_NAME}'s paid research and analysis services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  2. Accuracy of Information
                </h2>
                <p className="leading-relaxed">
                  You declare that all personal and contact details provided at the time of subscription are true and accurate. You agree to promptly inform {BRAND_NAME} of any updates. Providing false or misleading information may result in legal liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  3. Risk Disclosure
                </h2>
                <p className="leading-relaxed">
                  Trading and investing involve substantial risk, including the potential loss of your entire investment. <strong className="text-primary">{BRAND_NAME}</strong> provides only research and technical analysis — not investment advice or portfolio management. All trading and investment decisions are solely your responsibility.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  4. No Profit Guarantee
                </h2>
                <p className="leading-relaxed">
                  {BRAND_NAME}, its owners, employees, or affiliates do not guarantee profits or fixed returns. Any accuracy levels or performance percentages mentioned in communications, advertisements, or materials are indicative and may vary.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  5. Responsibility for Trades
                </h2>
                <p className="leading-relaxed">
                  You are solely responsible for any trading or investment activity undertaken using our research alerts or recommendations. {BRAND_NAME} bears no liability for any gain or loss resulting from your actions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  6. Nature of Services
                </h2>
                <p className="leading-relaxed">
                  {BRAND_NAME}'s services are purely research-based and for informational purposes only. They do not constitute investment advice under SEBI or any other regulatory framework. You retain full responsibility for executing trades or investments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  7. Risk Awareness and Consent
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You understand the risks involved in trading and investing.</li>
                  <li>You do not expect any assured or guaranteed return.</li>
                  <li>You are investing or trading with your own capital, not borrowed funds.</li>
                  <li>You accept full responsibility for all potential losses.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  8. Confidentiality of Account Credentials
                </h2>
                <p className="leading-relaxed">
                  {BRAND_NAME} never requests your Demat or trading account credentials. You confirm that your login details are known only to you and are not shared with anyone, including {BRAND_NAME} employees.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  9. Fees and Refund Policy
                </h2>
                <p className="leading-relaxed">
                  All fees paid to {BRAND_NAME} are solely for research services and are non-refundable under any circumstances. These payments are not investments, and {BRAND_NAME} does not trade on your behalf.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  10. Limitation of Liability
                </h2>
                <p className="leading-relaxed mb-4">
                  You agree not to hold {BRAND_NAME}, its owners, employees, or associates responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Any losses incurred from trading or investment activities.</li>
                  <li>Variations in accuracy or performance of research services.</li>
                  <li>Market fluctuations or external factors beyond our control.</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  You also agree not to initiate any legal complaint or action against {BRAND_NAME} regarding financial losses incurred from using our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  11. Acceptance of Policies
                </h2>
                <p className="leading-relaxed">
                  You confirm that you have read, understood, and accepted the Terms & Conditions, Privacy Policy, Refund Policy, and Legal Disclaimer as published on{' '}
                  <a href="https://www.moderntrade.in" className="text-primary hover:text-primary-light underline" target="_blank" rel="noopener noreferrer">
                    https://www.moderntrade.in
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 border-l-4 border-primary pl-4">
                  12. Digital Consent
                </h2>
                <p className="leading-relaxed">
                  By clicking "Yes, I Agree", you confirm your understanding of the risks involved, your voluntary acceptance of these terms, and your acknowledgment that all decisions and outcomes are your sole responsibility. {BRAND_NAME} will treat this digital acknowledgment as your final and binding acceptance of all terms and policies.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t-2 border-primary/20 text-center">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





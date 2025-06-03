import { useEffect, useState } from 'react';
import PolicySidebar from '../components/PolicySidebar';

export default function TermsOfService() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/40">
      {/* Sidebar */}
      <PolicySidebar isVisible={isVisible} />
      
      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        <div className={`max-w-4xl mx-auto px-4 pt-6 pb-12 sm:px-5 lg:px-6 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300 sm:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Last updated: March 5, 2025</p>
          
          <div className="mt-6 space-y-6">
            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-indigo-50 to-violet-50 dark:from-gray-800/90 dark:via-indigo-900/30 dark:to-violet-900/30 rounded-xl p-5 shadow-sm border border-indigo-100 dark:border-indigo-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-indigo-700 dark:from-white dark:to-indigo-400">Agreement to Terms</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-blue-50 to-sky-50 dark:from-gray-800/90 dark:via-blue-900/30 dark:to-sky-900/30 rounded-xl p-5 shadow-sm border border-blue-100 dark:border-blue-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-400">Use License</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on our website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-200">This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-teal-50 to-emerald-50 dark:from-gray-800/90 dark:via-teal-900/30 dark:to-emerald-900/30 rounded-xl p-5 shadow-sm border border-teal-100 dark:border-teal-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-teal-300 dark:hover:border-teal-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-teal-700 dark:from-white dark:to-teal-400">User Accounts</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">When you create an account with us, you guarantee that:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li>The information you provide is accurate, complete, and current at all times</li>
                    <li>You are responsible for maintaining the confidentiality of your account and password</li>
                    <li>You accept responsibility for all activities that occur under your account</li>
                    <li>You must notify us immediately of any breach of security or unauthorized use of your account</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-200">We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 dark:from-gray-800/90 dark:via-fuchsia-900/30 dark:to-pink-900/30 rounded-xl p-5 shadow-sm border border-fuchsia-100 dark:border-fuchsia-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-fuchsia-300 dark:hover:border-fuchsia-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-fuchsia-700 dark:from-white dark:to-fuchsia-400">Intellectual Property</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">The Service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of our company.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:from-gray-800/90 dark:via-amber-900/30 dark:to-orange-900/30 rounded-xl p-5 shadow-sm border border-amber-100 dark:border-amber-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-amber-300 dark:hover:border-amber-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-amber-600 dark:from-white dark:to-amber-400">Limitation of Liability</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li>Your access to or use of or inability to access or use the Service</li>
                    <li>Any conduct or content of any third party on the Service</li>
                    <li>Any content obtained from the Service</li>
                    <li>Unauthorized access, use or alteration of your transmissions or content</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-cyan-50 to-sky-50 dark:from-gray-800/90 dark:via-cyan-900/30 dark:to-sky-900/30 rounded-xl p-5 shadow-sm border border-cyan-100 dark:border-cyan-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-cyan-700 dark:from-white dark:to-cyan-400">Governing Law</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-lime-50 to-green-50 dark:from-gray-800/90 dark:via-lime-900/30 dark:to-green-900/30 rounded-xl p-5 shadow-sm border border-lime-100 dark:border-lime-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-lime-300 dark:hover:border-lime-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-lime-700 dark:from-white dark:to-lime-400">Changes to Terms</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                  <p className="text-gray-700 dark:text-gray-200">By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-violet-50 to-purple-50 dark:from-gray-800/90 dark:via-violet-900/30 dark:to-purple-900/30 rounded-xl p-5 shadow-sm border border-violet-100 dark:border-violet-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-violet-300 dark:hover:border-violet-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-violet-700 dark:from-white dark:to-violet-400">Contact Us</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">If you have any questions about these Terms, please contact us at:</p>
                  <p className="text-gray-700 dark:text-gray-200">Email: legal@RoLit.com</p>
                  <p className="text-gray-700 dark:text-gray-200">Address: 123 Innovation Way, Tech City, TC 12345, United States</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 
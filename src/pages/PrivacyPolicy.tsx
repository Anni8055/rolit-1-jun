import { useEffect, useState } from 'react';
import PolicySidebar from '../components/PolicySidebar';

export default function PrivacyPolicy() {
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
    <div className="min-h-screen flex bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/30 dark:to-purple-900/40">
      {/* Sidebar */}
      <PolicySidebar isVisible={isVisible} />
      
      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        <div className={`max-w-4xl mx-auto px-4 pt-6 pb-12 sm:px-5 lg:px-6 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-indigo-800 dark:from-white dark:to-indigo-300 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Last updated: March 5, 2025</p>
          
          <div className="mt-6 space-y-6">
            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-800/90 dark:via-purple-900/30 dark:to-pink-900/30 rounded-xl p-5 shadow-sm border border-purple-100 dark:border-purple-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-purple-700 dark:from-white dark:to-purple-400">Information We Collect</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">We collect several types of information from and about users of our website, including:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li><strong className="text-purple-700 dark:text-purple-300">Personal Information:</strong> Name, email address, phone number, billing information, and other similar contact data.</li>
                    <li><strong className="text-purple-700 dark:text-purple-300">Profile Information:</strong> Username, password, account preferences, and social media handles.</li>
                    <li><strong className="text-purple-700 dark:text-purple-300">Usage Data:</strong> Information about how you interact with our website, such as pages visited, time spent, and features used.</li>
                    <li><strong className="text-purple-700 dark:text-purple-300">Device Information:</strong> Information about your device and internet connection, including IP address, browser type, and operating system.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-800/90 dark:via-blue-900/30 dark:to-indigo-900/30 rounded-xl p-5 shadow-sm border border-blue-100 dark:border-blue-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-400">How We Use Your Information</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">We use the information we collect about you for various purposes, including:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li>Providing, operating, and maintaining our services</li>
                    <li>Improving, personalizing, and expanding our services</li>
                    <li>Understanding and analyzing how you use our services</li>
                    <li>Developing new products, services, features, and functionality</li>
                    <li>Communicating with you, either directly or through our partners</li>
                    <li>Sending you emails and updates</li>
                    <li>Finding and preventing fraud and security issues</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-cyan-50 to-teal-50 dark:from-gray-800/90 dark:via-cyan-900/30 dark:to-teal-900/30 rounded-xl p-5 shadow-sm border border-cyan-100 dark:border-cyan-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-cyan-700 dark:from-white dark:to-cyan-400">Information Sharing and Disclosure</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">We may share your information with:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li><strong className="text-cyan-700 dark:text-cyan-300">Service Providers:</strong> Companies that provide services on our behalf, such as payment processing, data analysis, email delivery, and marketing assistance.</li>
                    <li><strong className="text-cyan-700 dark:text-cyan-300">Business Partners:</strong> Trusted third parties who help us operate our business and serve you.</li>
                    <li><strong className="text-cyan-700 dark:text-cyan-300">Legal Requirements:</strong> When required by law or to protect our rights or the rights of others.</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-200">We do not sell or rent your personal information to third parties for their marketing purposes.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-emerald-50 to-green-50 dark:from-gray-800/90 dark:via-emerald-900/30 dark:to-green-900/30 rounded-xl p-5 shadow-sm border border-emerald-100 dark:border-emerald-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-emerald-700 dark:from-white dark:to-emerald-400">Data Security</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                  <p className="text-gray-700 dark:text-gray-200">We restrict access to your personal information to employees, contractors, and third-party service providers who need to know that information to process it for us and are subject to strict contractual confidentiality obligations.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-amber-50 to-yellow-50 dark:from-gray-800/90 dark:via-amber-900/30 dark:to-yellow-900/30 rounded-xl p-5 shadow-sm border border-amber-100 dark:border-amber-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-amber-300 dark:hover:border-amber-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-amber-600 dark:from-white dark:to-amber-400">Your Rights</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">Depending on your location, you may have the following rights regarding your personal information:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate or incomplete information</li>
                    <li>Deletion of your personal information</li>
                    <li>Restriction of processing of your personal information</li>
                    <li>Data portability</li>
                    <li>Objection to processing of your personal information</li>
                    <li>Withdrawal of consent</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-200">To exercise any of these rights, please contact us using the information provided below.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 dark:from-gray-800/90 dark:via-rose-900/30 dark:to-pink-900/30 rounded-xl p-5 shadow-sm border border-rose-100 dark:border-rose-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-rose-300 dark:hover:border-rose-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-rose-600 dark:from-white dark:to-rose-400">Contact Us</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">If you have any questions or concerns about our Privacy Policy or our practices regarding your personal information, please contact us at:</p>
                  <p className="text-gray-700 dark:text-gray-200">Email: privacy@RoLit.com</p>
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
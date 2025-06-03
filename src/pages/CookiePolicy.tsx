import { useEffect, useState } from 'react';
import PolicySidebar from '../components/PolicySidebar';

export default function CookiePolicy() {
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
    <div className="min-h-screen flex bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-sky-900/30 dark:to-blue-900/40">
      {/* Sidebar */}
      <PolicySidebar isVisible={isVisible} />
      
      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        <div className={`max-w-4xl mx-auto px-4 pt-6 pb-12 sm:px-5 lg:px-6 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-sky-800 dark:from-white dark:to-sky-300 sm:text-4xl">Cookie Policy</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Last updated: March 5, 2025</p>
          
          <div className="mt-6 space-y-6">
            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-sky-50 to-blue-50 dark:from-gray-800/90 dark:via-sky-900/30 dark:to-blue-900/30 rounded-xl p-5 shadow-sm border border-sky-100 dark:border-sky-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-sky-300 dark:hover:border-sky-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-sky-700 dark:from-white dark:to-sky-400">What Are Cookies</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
                  <p className="text-gray-700 dark:text-gray-200">Cookies help us improve your website experience in several ways, including remembering your preferences, understanding how you use our website, and tailoring content to your interests.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-orange-50 to-amber-50 dark:from-gray-800/90 dark:via-orange-900/30 dark:to-amber-900/30 rounded-xl p-5 shadow-sm border border-orange-100 dark:border-orange-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-orange-300 dark:hover:border-orange-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-orange-600 dark:from-white dark:to-orange-400">Types of Cookies We Use</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">We use different types of cookies for various purposes:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li><strong className="text-orange-600 dark:text-orange-300">Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be turned off in our systems. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.</li>
                    <li><strong className="text-orange-600 dark:text-orange-300">Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.</li>
                    <li><strong className="text-orange-600 dark:text-orange-300">Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
                    <li><strong className="text-orange-600 dark:text-orange-300">Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-emerald-50 to-teal-50 dark:from-gray-800/90 dark:via-emerald-900/30 dark:to-teal-900/30 rounded-xl p-5 shadow-sm border border-emerald-100 dark:border-emerald-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-emerald-700 dark:from-white dark:to-emerald-400">How to Manage Cookies</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
                  <p className="text-gray-700 dark:text-gray-200">Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" className="text-blue-600 dark:text-blue-400 hover:underline">www.allaboutcookies.org</a>.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-purple-50 to-violet-50 dark:from-gray-800/90 dark:via-purple-900/30 dark:to-violet-900/30 rounded-xl p-5 shadow-sm border border-purple-100 dark:border-purple-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-purple-700 dark:from-white dark:to-purple-400">Third-Party Cookies</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.</p>
                  <p className="text-gray-700 dark:text-gray-200">These third-party services may include:</p>
                  <ul className="text-gray-700 dark:text-gray-200">
                    <li>Google Analytics</li>
                    <li>Facebook Pixel</li>
                    <li>LinkedIn Insights</li>
                    <li>Other advertising and analytics providers</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 dark:from-gray-800/90 dark:via-fuchsia-900/30 dark:to-pink-900/30 rounded-xl p-5 shadow-sm border border-fuchsia-100 dark:border-fuchsia-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-fuchsia-300 dark:hover:border-fuchsia-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-fuchsia-700 dark:from-white dark:to-fuchsia-400">Changes to Our Cookie Policy</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this policy.</p>
                  <p className="text-gray-700 dark:text-gray-200">You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <div className="bg-gradient-to-br from-white via-cyan-50 to-indigo-50 dark:from-gray-800/90 dark:via-cyan-900/30 dark:to-indigo-900/30 rounded-xl p-5 shadow-sm border border-cyan-100 dark:border-cyan-800/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-600">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-cyan-700 dark:from-white dark:to-cyan-400">Contact Us</h2>
                <div className="mt-3 prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200">If you have any questions about our Cookie Policy, please contact us at:</p>
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
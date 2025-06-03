import { useTheme } from '../hooks/useTheme';

export default function About() {
  const { theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">
          Welcome to our platform, where we're revolutionizing the way brands and influencers connect and collaborate.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          We're on a mission to create a transparent, efficient, and fair marketplace for influencer marketing.
          Our platform bridges the gap between brands and influencers, making it easier than ever to create
          meaningful partnerships that drive results.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
        <p className="mb-6">
          Founded in 2024, we recognized the growing challenges in the influencer marketing industry.
          From finding the right influencers to managing payments and tracking performance, we saw an
          opportunity to create a comprehensive solution that benefits both brands and influencers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Transparency in all dealings</li>
          <li>Fair compensation for influencers</li>
          <li>Data-driven decision making</li>
          <li>Continuous innovation</li>
          <li>Community building</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
        <p className="mb-6">
          Whether you're a brand looking to expand your reach or an influencer seeking new opportunities,
          we invite you to join our growing community. Together, we can create a more efficient and
          rewarding influencer marketing ecosystem.
        </p>

        <div className="mt-8 text-center">
          <a
            href="/register"
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-blue-700 transition-all duration-300"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
} 
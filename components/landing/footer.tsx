import { Mail, Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export function StackedFooter() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joined && email) {
      setJoined(true);
      setEmail('');
      setTimeout(() => setJoined(false), 2000);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-black text-gray-300">
      {/* Dark Accent Strip */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 space-y-12">
        {/* 1) Newsletter + CTA */}
        {/* <div className="bg-gray-900 rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-lg">
            <h3 className="text-2xl font-semibold text-white">Join Our Community</h3>
            <p className="mt-2 text-sm">
              Subscribe for exclusive resume tips, career tools, and updates.
            </p>
          </div>
          <form onSubmit={handleJoin} className="flex w-full lg:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              disabled={joined}
              className={`px-5 py-3 rounded-r-lg font-medium transition ${
                joined
                  ? 'bg-green-600 hover:bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {joined ? 'Joined!' : 'Subscribe'}
            </button>
          </form>
        </div> */}

        {/* 2) Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column A */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              {['Features', 'Templates', 'Pricing', 'AI Tools'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column B */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Careers', 'Blog', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {['Help Center', 'Privacy Policy', 'Terms of Service'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column D: Social + Credit */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              {[Github, Linkedin, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  <Icon className="h-5 w-5 text-gray-200" />
                </a>
              ))}
            </div>
            <p className="text-xs">
              Built with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> by Resume Rocket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-xs text-gray-500">
            © {new Date().getFullYear()} Resume Rocket. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="mt-3 md:mt-0 flex items-center space-x-1 text-gray-500 hover:text-white transition"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
            <span className="text-sm">Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

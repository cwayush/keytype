import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent"
            >
              keyType
            </Link>
            <p className="text-sm text-neutral-400 mt-2">
              &copy; {new Date().getFullYear()} keyType. All rights reserved.
            </p>
          </div>
          <div>
            <nav className="flex space-x-4">
              {['Privacy Ploicy', 'Terms of Services', 'Contact Us'].map(
                (link) => (
                  <Link
                    key={link}
                    href="/"
                    className="text-sm text-neutral-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

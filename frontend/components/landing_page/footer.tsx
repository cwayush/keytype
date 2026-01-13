import { FOOTER_LINKS } from "@/constants";
import { Dot } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Link
              href="/"
              className="text-2xl font-bold bg-linear-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent"
            >
              keyType
            </Link>
            <p className="md:text-sm text-xs  text-neutral-400 mt-2">
              &copy; {new Date().getFullYear()} keyType. Designed for speed &
              accuracy.
            </p>
          </div>
          <div>
            <nav className="flex md:space-x-2  ">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="md:text-sm text-xs text-neutral-400 hover:text-blue-500 transition-colors duration-300"
                >
                  <span className="flex gap-1 items-center">
                    <Dot />
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

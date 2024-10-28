import React from "react";
import { GitHubLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-20 lg:items-start text-center lg:text-left">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center lg:items-start">
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#f83002]">Portal</span>
            </h1>
          </div>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Unlock your potential and find your dream job with ease.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-white">Contact Us</h3>
            <p className="text-gray-400 mb-2">Email: <a href="mailto:info@jobportal.com" className="hover:text-white">info@jobportal.com</a></p>
            <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
          </div>

          {/* Column 4: Social Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-bold text-lg mb-3 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" aria-label="Instagram" className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <InstagramLogoIcon className="w-6 h-6 text-white" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <TwitterLogoIcon className="w-6 h-6 text-white" />
              </a>
              <a href="https://github.com" aria-label="Github" className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <GitHubLogoIcon className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-500">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

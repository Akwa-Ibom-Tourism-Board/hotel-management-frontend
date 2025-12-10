import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative text-white py-12 min-h-[400px] bottom-0 w-full">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url(/landingPage/footer-tourism.jpg)",
        }}
      />
      {/* Dark Green Overlay */}
      <div className="absolute inset-0 bg-[#002916]/85" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Akwa Ibom</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              Akwa Ibom State was created on the 23rd of September 1987 by the
              then Military Administration of General Ibrahim Badamosi
              Babangida. The creation of the State brought to fruition years of
              prolonged struggle by the people that occupied the mainland part
              of the former Cross River State
            </p>
          </div>

          {/* Column 2: Quick Contacts */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Contacts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-200">
                  Plot 57, H-Line, Ewet Housing, Uyo, Akwa Ibom State, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm text-gray-200">+234 703 072 1184</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm text-gray-200">
                   info.akhtb@gmail.com
                </span>
              </div>
            </div>
          </div>
          {/* Column 3: Our Socials */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Socials</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-400 opacity-30 mb-6" />

        {/* Bottom Section - Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-200">
            &copy; {new Date().getFullYear()} Akwa Ibom Tourism Board. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

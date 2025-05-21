import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center group">
              <Briefcase className="h-8 w-8 text-indigo-400 transition-transform group-hover:rotate-12" />
              <span className="ml-3 text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Zyora
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing talent acquisition through AI-powered matching and seamless 
              employer-candidate connections.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: Facebook, color: 'hover:text-[#1877F2]' },
                { icon: Twitter, color: 'hover:text-[#1DA1F2]' },
                { icon: Instagram, color: 'hover:text-[#E1306C]' },
                { icon: Linkedin, color: 'hover:text-[#0A66C2]' },
              ].map(({ icon: Icon, color }, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`text-gray-400 transition-all hover:-translate-y-1 ${color} duration-300`}
                >
                  <Icon size={22} className="stroke-current" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/jobs', label: 'Find Jobs' },
                { to: '/text-generator', label: 'Resume Builder' },
                { to: '/login', label: 'Login' },
                { to: '/register', label: 'Register' },
              ].map(({ to, label }, index) => (
                <li key={index}>
                  <Link 
                    to={to} 
                    className="flex items-center text-gray-400 hover:text-indigo-300 transition-colors group text-sm"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Employers
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/register', label: 'Post a Job' },
                { label: 'Browse Candidates' },
                { label: 'Pricing Plans' },
                { label: 'Recruitment Solutions' },
              ].map((item, index) => (
                <li key={index}>
                  {item.to ? (
                    <Link 
                      to={item.to} 
                      className="flex items-center text-gray-400 hover:text-indigo-300 transition-colors group text-sm"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <a href="#" className="text-gray-400 hover:text-indigo-300 transition-colors text-sm">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start group">
                <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0 group-hover:text-indigo-300 transition-colors" />
                <a 
                  href="mailto:support@jobportal.com" 
                  className="text-gray-400 hover:text-indigo-300 transition-colors text-sm break-all"
                >
                  support@zyora.com
                </a>
              </div>
              <div className="flex items-start group">
                <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0 group-hover:text-indigo-300 transition-colors" />
                <a 
                  href="tel:+15551234567" 
                  className="text-gray-400 hover:text-indigo-300 transition-colors text-sm"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-xs text-gray-500 tracking-wide">
            &copy; {new Date().getFullYear()} Zyora Technologies. All rights reserved.
            <span className="block mt-1 text-gray-600">
              Proudly building the future of recruitment
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
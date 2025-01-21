import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
export default function Footer(){
    return (
      <div className="bg-[#07081f] text-white w-full py-10 rounded-t-3xl">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 animate_animated animate_fadeIn">
          <div>
            <h4 className="font-semibold text-lg mb-4 text-purple-300">Popular Locations</h4>
            <ul className="space-y-2">
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-purple-300">Trending Locations</h4>
            <ul className="space-y-2">
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-purple-300">About Us</h4>
            <ul className="space-y-2">
              <li>Explore</li>
              <li>About</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-purple-300">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="blank" rel="noopener noreferrer" className="hover:text-purple-400 text-purple-600 transition-colors duration-300 animate_animated animate_pulse animate_infinite">
                <FontAwesomeIcon icon={faFacebookF} className="text-2xl"  />
              </a>
              <a href="https://www.twitter.com" target="blank" rel="noopener noreferrer" className="hover:text-purple-400 text-purple-600 transition-colors duration-300 animate_animated animate_pulse animate_infinite">
                <FontAwesomeIcon icon={faTwitter} className="text-2xl"  />
              </a>
              <a href="https://www.instagram.com" target="blank" rel="noopener noreferrer" className="hover:text-purple-400 text-purple-600 transition-colors duration-300 animate_animated animate_pulse animate_infinite">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl"  />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-10 pt-4 text-center text-sm border-purple-900">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-purple-500 transition-colors duration-300 animate_animated animate_bounceIn">Help</a>
            <a href="#" className="hover:text-purple-500 transition-colors duration-300 animate_animated animate_bounceIn">Sitemap</a>
            <a href="#" className="hover:text-purple-500 transition-colors duration-300 animate_animated animate_bounceIn">Legal & Privacy information</a>
          </div>
          <div className="animate_animated animate_fadeInUp">
            <p>All rights reserved © 2024 Talentify</p>
          </div>
        </div>
      </div>
    );
  }
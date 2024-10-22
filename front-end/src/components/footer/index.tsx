'use client'

import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div>
        <div>
          <div className="container mx-auto grid grid-cols-4 gap-8 mb-8">
            <div className="space-y-6">
              <p className="text-white font-bold text-2xl mb-3">Exclusive</p>
              <p className="text-white font-bold text-xl mb-3">Subscribe</p>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4 relative">
                <input
                  type="text"
                  className="outline bg-black focus:outline-white p-2 rounded-md"
                  placeholder="Email Address"
                />
                <span className="absolute right-14 top-3">
                  <IoMdSend className="text-white" />
                </span>
              </div>
            </div>
            <div>
              <ul className="space-y-3">
                <li>
                  <p className="text-white font-bold text-2xl mb-3">
                    Exclusive
                  </p>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gray-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-gray-400">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li>
                  <p className="text-white font-bold text-2xl mb-3">
                    Exclusive
                  </p>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gray-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-gray-400">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li>
                  <p className="text-white font-bold text-2xl mb-3">
                    Exclusive
                  </p>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gray-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-gray-400">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto flex justify-start">
            <div className="mb-6 md:mb-0">
              <div className="flex space-x-8">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebook className="h-6 w-6 hover:text-gray-400" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-6 w-6 hover:text-gray-400" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-6 w-6 hover:text-gray-400" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6 hover:text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

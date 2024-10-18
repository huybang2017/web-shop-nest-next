'use client'

import { Input } from '@nextui-org/react'
import Link from 'next/link'
import { CiMail } from 'react-icons/ci'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { IoIosSend } from 'react-icons/io'

export default function Footer() {
  return (
    <footer className="bg-white text-black py-8 dark:bg-black dark:text-white">
      <div>
        <div className="w-1/2 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <CiMail className="text-gray-600 size-8 dark:text-gray-300" />
            <p className="w-full font-bold text-xl text-green-500 font-sans dark:text-green-900">
              Subscribe to Newsletter
            </p>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Name"
              className="dark:bg-black dark:text-white"
            />
            <Input
              type="email"
              label="Email"
              className="dark:black dark:text-white"
            />
            <button className="flex justify-center items-center bg-green-700 w-48 rounded-full dark:bg-green-900">
              <IoIosSend className="text-white size-6" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-green-700 text-5xl dark:text-green-800 mb-5">
            Phone
          </p>
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="col-span-2">
              <p>
                Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                vulputate velit imperdiet dolor tempor tristique. Pellentesque
                habitant
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-green-700 dark:hover:text-green-800"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="mb-6 md:mb-0">
              <div className="flex space-x-8">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebook className="h-6 w-6 hover:text-green-700 dark:hover:text-green-800" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-6 w-6 hover:text-green-700 dark:hover:text-green-800" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-6 w-6 hover:text-green-700 dark:hover:text-green-800" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6 hover:text-green-700 dark:hover:text-green-800" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

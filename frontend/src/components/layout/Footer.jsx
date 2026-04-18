import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        <div className="col-span-full lg:col-span-2">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            E-commerce <span className="text-blue-600 italic">SHOP</span>
          </a>
          <p className="mt-3 text-gray-600 dark:text-neutral-400">
            Join our newsletter to get the latest updates on new collections and
            exclusive offers.
          </p>
          <form className="mt-4 flex max-w-sm gap-x-2">
            <input
              type="email"
              className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-neutral-100">
            Shop
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                All Products
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                New Arrivals
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                Categories
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-neutral-100">
            Support
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                Returns
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-neutral-100">
            Company
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
                href="#"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200 dark:border-neutral-700">
        <div className="sm:flex sm:justify-between sm:items-center">
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            © 2026 E-commerce Shop. All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0 flex gap-x-4">
            {/* Social Icons Placeholder */}
            <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-700 inline-flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
              <FaFacebookF />
            </span>

            <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-700 inline-flex items-center justify-center hover:bg-pink-500 hover:text-white transition">
              <FaInstagram />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

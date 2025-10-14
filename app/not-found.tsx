"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      console.error("404 Error: User attempted to access non-existent route:", pathname);
    }
  }, [pathname]);

  return (
    <div>
        <Header />
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-600">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <p className="mb-8 text-gray-600">Could not find the requested resource</p>
        <Link href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </Link>
      </div>
        </div>
        <Footer />
    </div>
  );
};

export default NotFound;
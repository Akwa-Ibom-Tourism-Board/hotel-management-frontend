"use client";

import { useState } from "react";
import WelcomeModal from "./components/WelcomeModal";
import Header from "@/components/Header";
import RegistrationFlow from "./components/RegistrationFlow";

const Home = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-[#fff7ec]">
      <WelcomeModal
        open={showModal}
        onContinue={() => setShowModal(false)}
        onClose={() => setShowModal(false)}
      />

      <Header />

      <main className="container mx-auto py-12 px-2">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl text-[#2a2523] font-bold mb-4">
            Register Your Business
          </h2>
          <p className="text-lg text-[#78716e] max-w-2xl mx-auto">
            Please complete the registration form below. All fields are required
            for proper documentation.
          </p>
        </div>

        <RegistrationFlow />
      </main>
    </div>
  );
};

export default Home;

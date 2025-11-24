// import { Building2 } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full bg-[#ffff] border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-30 h-20 rounded-xl shadow-glow">
            {/* <Building2 className="w-8 h-8 text-[#ffffff]" /> */}
            <Image
              src="/board-new-logo-2.png"
              alt="Akwa Ibom Logo"
              width={200}
              height={200}
              className="p-0 object-fill"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#2a2523]">
              Akwa Ibom State Hotels and Tourism Board
            </h1>
            <p className="text-sm text-[#78716e]">
              Hospitality Registration Portal
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

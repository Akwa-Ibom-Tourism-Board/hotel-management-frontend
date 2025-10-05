import { Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-[#ffff] border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#00563b] shadow-glow">
            <Building2 className="w-8 h-8 text-[#ffffff]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#2a2523]">
              Akwa Ibom State Hotel and Tourism Board
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

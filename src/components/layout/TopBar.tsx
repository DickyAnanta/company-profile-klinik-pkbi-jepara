import { Phone, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-[#102a6e] text-white text-xs py-2 px-4 md:px-12 flex flex-col md:flex-row gap-2 md:gap-8 items-center justify-start relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>+62 82289985675</span>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>pkbijepara12@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

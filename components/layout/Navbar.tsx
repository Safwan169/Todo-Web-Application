import { Bell, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="bg-tertiary  border-b w-full h-[88px]  border-gray-100">
            <div className="flex items-center w-full border h-[88px] justify-between px-[50.5px] py-7">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <Image src={'/logo.png'} height={100} width={100} alt='Dreamy Software' />
                </div>

                {/* Right Section - Icons and Date */}
                <div className="flex items-center gap-6">
                    {/* Bell Icon */}
                    <button className="w-[34px] h-[34px] flex items-center justify-center bg-primary hover:bg-blue-700 rounded-lg transition-colors">
                        <Bell className="w-4 h-4 text-white" />
                    </button>

                    {/* Calendar Icon with Date */}
                    <div className="flex items-center gap-6">
                        <button className="w-[34px] h-[34px] flex items-center justify-center bg-primary hover:bg-blue-700 rounded-lg transition-colors">
                            <Calendar className="w-4 h-4 text-white" />
                        </button>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[#0D224A] font-medium text-[15px">Friday</span>
                            <span className="text-[#0D224A] text-sm">07/11/2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
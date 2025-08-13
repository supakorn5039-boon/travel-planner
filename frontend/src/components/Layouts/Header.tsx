import { ROUTES } from '@/constants/RouteConst';
import { useUserStore } from '@/store/features/user/useUserStore';
import { useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown';

const Header = () => {
    const location = useLocation();

    const { username, role } = useUserStore();

    useEffect(() => {
        const selector = document.querySelector('ul.nav-links a[href="' + window.location.pathname + '"]');
        if (selector) {
            document.querySelectorAll('ul.nav-links .active').forEach((el) => el.classList.remove('active'));
            selector.classList.add('active');
        }
    }, [location]);

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Destinations', path: '/destinations' },
        { label: 'Trips', path: '/trips' },
        { label: 'About', path: '/about' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Travel Logo" className="w-10 h-10 object-contain" />
                    <span className="font-bold text-xl text-gray-900 tracking-wide">TravelMate</span>
                </Link>

                {/* Navigation */}
                <ul className="hidden md:flex nav-links space-x-8 font-medium">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link to={item.path} className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                {item.label}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* User Profile */}
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className="font-semibold capitalize">{username}</p>
                        <p className="text-sm text-gray-500 capitalize">{role}</p>
                    </div>
                    <Dropdown
                        offset={[0, 8]}
                        btnClassName="relative group block"
                        button={
                            <img
                                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-md"
                                src="/assets/images/profile-34.jpeg"
                                alt="userProfile"
                            />
                        }
                    >
                        <ul className="text-dark py-2 flex flex-col items-center justify-center w-[160px] font-semibold bg-white rounded-lg shadow-lg">
                            <Link to={ROUTES.PROFILE} className="flex items-center py-3 text-black">
                                Profile
                            </Link>

                            <Link to={ROUTES.LOGIN} className="flex items-center py-3 text-red-500">
                                <CiLogout className="size-4 mr-2" />
                                Sign Out
                            </Link>
                        </ul>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;

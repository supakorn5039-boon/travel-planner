import { NavItems, ROUTES } from '@/constants/RouteConst';
import { useUserStore } from '@/store/features/user/useUserStore';
import Cookies from 'js-cookie';
import { CiLogout } from 'react-icons/ci';
import { FaPlaneDeparture, FaRegUser } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdown';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { username, role } = useUserStore();

    const handleClickLogout = () => {
        useUserStore.getState().clearUser();
        navigate(ROUTES.LOGIN);
        Cookies.remove('token');
        window.location.reload();
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/airplane.png" alt="Travel Logo" className="w-10 h-10 object-contain" />
                    <span className="font-bold text-xl text-gray-900 tracking-wide">Travel Planner</span>
                </Link>

                <ul className="hidden md:flex nav-links space-x-8 font-medium">
                    {NavItems.map((item) => {
                        const isActive =
                            (item.path === '/' && location.pathname === '/') || (item.path !== '/' && location.pathname.startsWith(item.path));
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`relative transition-colors duration-200
                                    ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
                                `}
                                >
                                    {item.label}

                                    <span
                                        className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300
                                        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                                    `}
                                    ></span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

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
                        <ul className="py-2 w-[180px] bg-white rounded-lg shadow-lg text-sm text-gray-700">
                            <li className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                                <Link to={ROUTES.MYTRIP} className="flex items-center space-x-2">
                                    <FaPlaneDeparture className="size-4 text-gray-500" />
                                    <span>My Trip</span>
                                </Link>
                            </li>
                            <li className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                                <Link to={ROUTES.PROFILE} className="flex items-center space-x-2">
                                    <FaRegUser className="size-4 text-gray-500" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                                <a onClick={handleClickLogout} className="flex items-center space-x-2 text-red-500 cursor-pointer">
                                    <CiLogout className="size-4" />
                                    <span>Sign Out</span>
                                </a>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;

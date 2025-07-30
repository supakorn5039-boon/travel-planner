import { useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown';

import { ROUTES } from '@/constants/RouteConst';
import { MockUserHeader } from '@/mocks/User';

const Header = () => {
    const location = useLocation();

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    return (
        <header className={`z-40`}>
            <div>
                <div className="relative bg-white flex w-full items-center px-5 py-2.5">
                    <div className="flex space-x-4 items-center ltr:mr-2 rtl:ml-2">
                        <p className="text-base font-semibold">Title Header</p>
                    </div>
                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto" />

                        <div className="flex flex-col pr-[1rem]">
                            <p className="font-semibold">{MockUserHeader.username}</p>
                            <p className="flex justify-end text-gray-60">{MockUserHeader.role}</p>
                        </div>
                        <div className="dropdown shrink-0 flex">
                            <Dropdown
                                offset={[0, 8]}
                                btnClassName="relative group block"
                                button={
                                    <img
                                        className="size-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        src="/assets/images/profile-34.jpeg"
                                        alt="userProfile"
                                    />
                                }
                            >
                                <ul className="text-dark !py-0 w-[230px] font-semibold ">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img
                                                className="rounded-md size-10 object-cover"
                                                src="/assets/images/profile-34.jpeg"
                                                alt="userProfile"
                                            />
                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">John Doe</h4>
                                                <button type="button" className="text-black/60 hover:text-primary ">
                                                    johndoe@gmail.com
                                                </button>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="border-t border-white-light">
                                        <Link to={ROUTES.LOGIN} className="text-danger !py-3">
                                            <CiLogout className="size-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

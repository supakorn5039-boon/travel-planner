import { PropsWithChildren, Suspense } from 'react';

import App from '../../App';
import Portals from '../../components/Portals';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <div className="relative">
                <div className={` main-container text-black dark:text-white-dark min-h-screen`}>
                    <div className={`flex flex-col min-h-screen `}>
                        <Header />
                        <Suspense>
                            <div className={` p-6 animate__animated`}>{children}</div>
                        </Suspense>
                        <Footer />
                        <Portals />
                    </div>
                </div>
            </div>
        </App>
    );
};

export default DefaultLayout;

const SpinnerLoadingPulse = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
                <div className="size-12 rounded-full border-4 border-t-red-500 border-r-green-500 border-b-yellow-500 border-l-blue-500 animate-spin absolute top-0"></div>
            </div>
        </div>
    );
};

const SpinnerLoadingRemoveButton = () => (
    <span className="animate-spin border-2 border-red-main border-l-transparent rounded-full w-4 h-4 mr-2"></span>
);

const SpinnerLoadingCreateButton = () => <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-4 h-4 mr-2"></span>;

const SpinnerTravelPlanner = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-200 to-purple-300 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <style>{`
                    @keyframes planeFly {
                        0% {
                            transform: translate(-30px, 30px) rotate(0deg);
                        }
                        25% {
                            transform: translate(30px, -30px) rotate(20deg);
                        }
                        50% {
                            transform: translate(0, 0) rotate(0deg);
                        }
                        75% {
                            transform: translate(-30px, 30px) rotate(-20deg);
                        }
                        100% {
                            transform: translate(-30px, 30px) rotate(0deg);
                        }
                    }

                    @keyframes cloudMove {
                        0% {
                            transform: translateX(0);
                        }
                        50% {
                            transform: translateX(15px);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }

                    @keyframes dashAnimation {
                        0% {
                            stroke-dashoffset: 0;
                        }
                        100% {
                            stroke-dashoffset: -200;
                        }
                    }

                    .animate-plane-fly {
                        animation: planeFly 3s ease-in-out infinite;
                        transform-origin: center center;
                    }

                    .animate-cloud-move-1 {
                        animation: cloudMove 2.5s ease-in-out infinite;
                    }
                    .animate-cloud-move-2 {
                        animation: cloudMove 3s ease-in-out infinite 0.5s; /* Delayed start */
                    }

                    .animate-dash {
                        animation: dashAnimation 4s linear infinite;
                    }
                `}</style>

                <div className="relative w-32 h-32 mb-6">
                    <svg className="absolute inset-0 opacity-40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#93C5FD" strokeWidth="1.5" />

                        <path d="M50 2 A48 48 0 0 0 50 98 M2 50 H98" stroke="#93C5FD" strokeWidth="0.8" />

                        <path d="M20 5 L20 95 M80 5 L80 95 M5 20 L95 20 M5 80 L95 80" stroke="#93C5FD" strokeWidth="0.4" />
                    </svg>

                    <svg className="absolute inset-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 70 Q50 20, 80 70"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="2"
                            strokeDasharray="10 5"
                            className="animate-dash"
                            strokeLinecap="round"
                        />
                    </svg>

                    <svg
                        className="absolute inset-0 animate-plane-fly drop-shadow-md"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#4F46E5"
                    >
                        <path d="M25 50 L75 50 L85 45 L85 55 L75 50 Z" />

                        <path d="M40 45 L55 30 L70 45 Z" />
                        <path d="M40 55 L55 70 L70 55 Z" />

                        <path d="M30 48 L25 40 L25 50 Z" />
                    </svg>

                    <svg
                        className="absolute top-10 left-8 w-10 h-10 animate-cloud-move-1 drop-shadow-sm"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#DBEAFE"
                    >
                        <path d="M18 10h-1.26A8 8 0 1 0 3 10a4 4 0 0 0 0 8h12a5 5 0 0 0 1-9.9V10z" />
                    </svg>
                    <svg
                        className="absolute bottom-8 right-10 w-8 h-8 animate-cloud-move-2 drop-shadow-sm"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#DBEAFE"
                    >
                        <path d="M18 10h-1.26A8 8 0 1 0 3 10a4 4 0 0 0 0 8h12a5 5 0 0 0 1-9.9V10z" />
                    </svg>
                </div>
                <p className="text-xl font-bold text-indigo-700 animate-pulse">Planning your adventure...</p>
            </div>
        </div>
    );
};

export { SpinnerLoadingCreateButton, SpinnerLoadingPulse, SpinnerLoadingRemoveButton, SpinnerTravelPlanner };

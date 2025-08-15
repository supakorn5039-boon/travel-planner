import { AnimatePresence, motion } from 'framer-motion';

function useLocation() {
    const mockState = {
        destination: {
            title: 'Tokyo, Japan',
            image: 'https://images.squarespace-cdn.com/content/v1/64203d9600825f68e2488772/1716816992846-66PLMU3JHPHYP0O5CB3V/199A6070.jpg',
            city: 'Tokyo',
            country: 'Japan',
        },
        bookingDetails: {
            startDate: '2024-10-20',
            endDate: '2024-10-27',
            guests: 2,
        },
    };
    return { state: mockState };
}

export default function BookingConfirmation() {
    const { state } = useLocation();

    if (!state || !state.destination || !state.bookingDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900">
                <h1 className="text-2xl font-bold">Booking information not found.</h1>
            </div>
        );
    }

    const { destination, bookingDetails } = state;

    return (
        <AnimatePresence>
            <motion.div
                className="min-h-screen bg-gray-50 p-6 flex items-center justify-center text-gray-900 font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
                >
                    <div className="flex flex-col items-center text-center">
                        <svg
                            className="w-16 h-16 text-green-500 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                        <p className="text-gray-600 mb-6">Your adventure to {destination.title} is all set.</p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Destination image and title */}
                        <div className="relative rounded-2xl overflow-hidden h-48 w-full">
                            <img src={destination.image} alt={destination.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                                <h3 className="text-lg font-bold text-white drop-shadow-md">{destination.title}</h3>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="font-semibold text-gray-700">Check-in:</span>
                                <span className="text-gray-600">{bookingDetails.startDate}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="font-semibold text-gray-700">Check-out:</span>
                                <span className="text-gray-600">{bookingDetails.endDate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Guests:</span>
                                <span className="text-gray-600">{bookingDetails.guests}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => console.log('View Trips clicked!')}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
                        >
                            View My Trips
                        </button>
                        <button
                            onClick={() => console.log('Explore More clicked!')}
                            className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-xl shadow-md hover:bg-gray-300 transition-colors"
                        >
                            Explore More Destinations
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

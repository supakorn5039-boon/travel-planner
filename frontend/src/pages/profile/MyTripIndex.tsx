import { SpinnerLoadingPulse } from '@/components/Loading/SpinLoading';
import { BookingService } from '@/services/BookingService';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

export default function MyTripIndex() {
    const { data: myBooking, isLoading } = useQuery({
        queryKey: [BookingService.QUERY_KEY],
        queryFn: BookingService.getMyBooking,
    });

    if (isLoading) {
        return <SpinnerLoadingPulse />;
    }

    if (!myBooking || myBooking.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans">
                <motion.div
                    className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 150 }}
                >
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">No trips planned yet!</h1>
                    <p className="text-gray-600">Start exploring to find your next adventure.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans antialiased text-gray-900">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-sm">My Trips</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {myBooking.map((trip) => (
                            <motion.div
                                key={trip.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-2 text-blue-600">{trip.destinationTitle}</h2>

                                    <div className="flex justify-between items-center text-sm text-gray-500 font-semibold border-t pt-4">
                                        <div className="flex flex-col">
                                            <span>Start:</span>
                                            <span className="text-gray-800">{new Date(trip.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>End:</span>
                                            <span className="text-gray-800">{new Date(trip.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

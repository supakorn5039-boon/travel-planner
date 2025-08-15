import { SpinnerLoadingPulse } from '@/components/Loading/SpinLoading';
import { ROUTES } from '@/constants/RouteConst';
import { DestinationService } from '@/services/DestinationService';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function DestinationDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [bookingDetails, setBookingDetails] = useState({
        startDate: '',
        endDate: '',
        guests: 1,
    });

    const { data: destination, isLoading } = useQuery({
        queryKey: [DestinationService.QUERY_KEY, id],
        queryFn: () => DestinationService.getDestinationById(Number(id)),
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBookingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookNow = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(ROUTES.BOOKING);
    };

    if (isLoading || !destination) {
        return <SpinnerLoadingPulse />;
    }

    return (
        <AnimatePresence>
            <motion.div
                className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Hero Section with Destination Image and Title */}
                <motion.div
                    className="relative h-[70vh] flex items-end bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.image})` }}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>
                    <div className="relative z-10 p-8 md:p-16 text-white w-full">
                        <motion.h1
                            className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {destination.title}
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-gray-200 drop-shadow-sm font-light"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {destination.city}, {destination.country}
                        </motion.p>
                    </div>
                </motion.div>

                <div className="container mx-auto px-6 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Destination Details */}
                        <motion.div
                            className="md:col-span-2"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">About {destination.city}</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">{destination.description}</p>
                            <div className="bg-gray-100 p-6 rounded-2xl shadow-sm">
                                <h3 className="text-xl font-bold mb-2">Key Details</h3>
                                <ul className="text-gray-700 space-y-2">
                                    <li>
                                        <span className="font-semibold">Country:</span> {destination.country}
                                    </li>
                                    <li>
                                        <span className="font-semibold">City:</span> {destination.city}
                                    </li>
                                    <li>
                                        <span className="font-semibold">Starting Price:</span> ${destination.price}
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Booking Form */}
                        <motion.div
                            className="md:col-span-1"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <form onSubmit={handleBookNow} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                                <h2 className="text-2xl font-bold mb-4">Book Your Trip</h2>
                                <div className="text-2xl font-bold text-blue-600 mb-6">
                                    ${destination.price}
                                    <span className="text-sm font-normal text-gray-500"> / person</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold text-gray-600 mb-1" htmlFor="startDate">
                                            Check-in
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={bookingDetails.startDate}
                                            onChange={handleInputChange}
                                            required
                                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold text-gray-600 mb-1" htmlFor="endDate">
                                            Check-out
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={bookingDetails.endDate}
                                            onChange={handleInputChange}
                                            required
                                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold text-gray-600 mb-1" htmlFor="guests">
                                            Guests
                                        </label>
                                        <input
                                            type="number"
                                            id="guests"
                                            name="guests"
                                            value={bookingDetails.guests}
                                            onChange={handleInputChange}
                                            min="1"
                                            required
                                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        />
                                    </div>
                                </div>
                                <motion.button
                                    type="button"
                                    onClick={handleBookNow}
                                    className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Book Now
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

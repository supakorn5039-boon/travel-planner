import { SpinnerLoadingPulse } from '@/components/Loading/SpinLoading';
import { showErrorToast, showSuccessToast } from '@/components/Toast/Toast';
import { ROUTES } from '@/constants/RouteConst';
import type { BookingSchemaProps } from '@/dto/BookingDTO';
import { BookingService } from '@/services/BookingService';
import { DestinationService } from '@/services/DestinationService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookingDestination() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: destination, isLoading } = useQuery({
        queryKey: [DestinationService.QUERY_KEY, id],
        queryFn: () => DestinationService.getDestinationById(Number(id)),
    });

    const form = BookingService.useBookingForm(undefined, Number(id));
    const [showModal, setShowModal] = useState(false);
    const [pendingValues, setPendingValues] = useState<BookingSchemaProps | null>(null);

    const mutation = useMutation({
        mutationFn: BookingService.createBooking,
        onSuccess: () => {
            showSuccessToast('Booking created successfully!');
            navigate(ROUTES.MYTRIP);
        },
        onError: (err: any) => {
            showErrorToast(`Failed to create booking: ${err.response?.data?.message || 'Unknown error'}`);
        },
    });

    const handleBookNow = form.handleSubmit((values) => {
        setPendingValues(values);
        setShowModal(true);
    });

    const handleConfirmBooking = () => {
        if (pendingValues) {
            mutation.mutate(pendingValues);
            setShowModal(false);
        }
    };

    if (isLoading || !destination) {
        return <SpinnerLoadingPulse />;
    }

    return (
        <AnimatePresence>
            <motion.div
                className="bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="relative h-[70vh] flex items-end bg-cover bg-center rounded-b-3xl overflow-hidden"
                    style={{ backgroundImage: `url(${destination.image})` }}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="relative z-10 p-8 md:p-16 text-white max-w-4xl">
                        <motion.h1
                            className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {destination.title}
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl text-gray-200 font-light"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {destination.city}, {destination.country}
                        </motion.p>
                        <motion.div
                            className="mt-6 inline-block bg-white/10 backdrop-blur-lg text-white text-2xl font-bold px-6 py-3 rounded-2xl shadow-xl border border-white/20"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            ${destination.price}
                        </motion.div>
                    </div>
                </motion.div>

                <div className="container mx-auto px-6 py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div
                            className="md:col-span-2"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">Explore {destination.city}</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">{destination.description}</p>

                            <motion.div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100" whileHover={{ scale: 1.01 }}>
                                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Key Details</h3>
                                <ul className="text-gray-700 space-y-3 text-lg">
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
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="md:col-span-1"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <form onSubmit={handleBookNow} className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-200">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">Book Your Trip</h2>
                                <div className="space-y-6">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold text-gray-600 mb-2" htmlFor="startDate">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            {...form.register('startDate')}
                                            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                                        />
                                        {form.formState.errors.startDate && (
                                            <span className="text-red-500 text-sm mt-1">{form.formState.errors.startDate.message as string}</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-sm font-semibold text-gray-600 mb-2" htmlFor="endDate">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            {...form.register('endDate')}
                                            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                                        />
                                        {form.formState.errors.endDate && (
                                            <span className="text-red-500 text-sm mt-1">{form.formState.errors.endDate.message as string}</span>
                                        )}
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {mutation.isPending ? 'Booking...' : 'Book Now'}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full"
                        >
                            <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>
                            <p className="mb-4 text-gray-600">
                                Destination: <strong>{destination.title}</strong>
                            </p>
                            <p className="mb-4 text-gray-600">
                                Dates:{' '}
                                <strong>
                                    {pendingValues?.startDate instanceof Date
                                        ? pendingValues.startDate.toLocaleDateString()
                                        : pendingValues?.startDate}
                                </strong>{' '}
                                to{' '}
                                <strong>
                                    {pendingValues?.endDate instanceof Date ? pendingValues.endDate.toLocaleDateString() : pendingValues?.endDate}
                                </strong>
                            </p>

                            <div className="flex justify-end space-x-4">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button onClick={handleConfirmBooking} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    {mutation.isPending ? 'Booking...' : 'Confirm'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

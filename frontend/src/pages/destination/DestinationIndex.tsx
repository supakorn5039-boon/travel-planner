import { SpinnerLoadingPulse } from '@/components/Loading/SpinLoading';
import { ROUTES } from '@/constants/RouteConst';
import { DestinationService } from '@/services/DestinationService';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaLocationArrow } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function DestinationPage() {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: [DestinationService.QUERY_KEY],
        queryFn: () => DestinationService.getAllDestinations(),
    });

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    if (isLoading || !data) {
        return <SpinnerLoadingPulse />;
    }

    return (
        <div className="bg-white text-gray-900 font-sans antialiased min-h-screen">
            <div
                className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/destination-marketing.jpg')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>
                <div className="z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-md">Find Your Next Adventure</h1>
                    <p className="text-lg sm:text-xl text-gray-200 drop-shadow-sm mb-8">
                        Search for a destination and book your unforgettable journey.
                    </p>

                    <form
                        onSubmit={handleSearch}
                        className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
                    >
                        <div className="flex items-center space-x-3 w-full md:w-2/5">
                            <FaLocationArrow color="#3b82f6" />
                            <input
                                type="text"
                                placeholder="Destination"
                                className="flex-1 p-2 outline-none rounded-lg bg-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-2/5 cursor-pointer">
                            <input type="date" placeholder="Dates" className="flex-1 p-2 outline-none rounded-lg bg-transparent" />
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-1/5 bg-blue-600 text-white py-3 rounded-2xl shadow-md font-bold hover:bg-blue-700 transition-colors duration-300"
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <CiSearch size={20} />
                                <span>Search</span>
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Popular Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {data.map((destination) => {
                            return (
                                <motion.div
                                    key={destination.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: destination.id * 0.1 }}
                                    className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <img src={destination.image} alt={destination.country} className="w-full h-64 object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                        <h3 className="text-2xl font-bold mb-1 drop-shadow-md">{destination.title}</h3>
                                        <p className="text-sm font-light text-gray-200 drop-shadow-sm">{destination.description}</p>
                                        <div className="mt-4 flex justify-between items-center">
                                            <p className="text-lg font-semibold drop-shadow-sm">$ {destination.price}</p>
                                            <button
                                                className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                                                onClick={() => navigate(`${ROUTES.DESTINATION}/${destination.id}`)}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

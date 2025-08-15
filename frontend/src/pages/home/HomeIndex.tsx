import { SpinnerLoadingPulse } from '@/components/Loading/SpinLoading';
import { ROUTES } from '@/constants/RouteConst';
import { DestinationService } from '@/services/DestinationService';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HomeIndex() {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: [DestinationService.QUERY_KEY],
        queryFn: () => DestinationService.getAllDestinations(),
    });

    if (isLoading || !data) {
        return <SpinnerLoadingPulse />;
    }

    return (
        <div className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen">
            <motion.section
                className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://ingliando.net/wp-content/uploads/2016/09/travel.jpg?w=700')`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Discover Your Next Adventure
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-2xl max-w-xl mx-auto mb-8 font-light drop-shadow-md"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Handpicked destinations to inspire your wanderlust
                    </motion.p>
                    <motion.button
                        onClick={() => navigate(ROUTES.DESTINATION)}
                        className="bg-yellow-500 hover:bg-yellow-600 px-10 py-5 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                    >
                        Explore Destinations
                    </motion.button>
                </div>
            </motion.section>

            <div className="py-20 px-6">
                <h2 className="text-4xl font-bold text-center mb-16">Popular Highlights</h2>
                <AnimatePresence>
                    {data
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                        .map((place, index) => (
                            <motion.section
                                key={index}
                                className={`flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl mb-16 ${
                                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                                }`}
                                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="md:w-1/2">
                                    <img
                                        src={place.image}
                                        alt={place.title}
                                        className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                                <div className="md:w-1/2 flex flex-col justify-center p-10 bg-white">
                                    <h3 className="text-3xl font-bold mb-4">{place.title}</h3>
                                    <p className="text-gray-700 mb-6">{place.description}</p>
                                    <button
                                        onClick={() => navigate(`${ROUTES.DESTINATION}/${place.id}`)}
                                        className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 self-start"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </motion.section>
                        ))}
                </AnimatePresence>
            </div>

            <motion.section
                className="py-20 bg-blue-600 text-center text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-extrabold mb-4 drop-shadow-md">Ready to start your journey?</h2>
                <p className="text-lg mb-8 font-light drop-shadow-sm">Plan your perfect trip with our intuitive travel planner.</p>
                <motion.button
                    onClick={() => navigate(ROUTES.DESTINATION)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start Travel Now
                </motion.button>
            </motion.section>
        </div>
    );
}

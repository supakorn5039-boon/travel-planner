import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const popularDestinations = [
    {
        id: 1,
        name: 'Paris',
        image: 'https://images.unsplash.com/photo-1502602898983-ca4a93a0279d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Explore the City of Lights, from the Eiffel Tower to the Louvre.',
        price: '$1,200',
    },
    {
        id: 2,
        name: 'Tokyo',
        image: 'https://images.unsplash.com/photo-1542051841857-5f9038479fd6?q=80&w=2752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Experience the blend of ancient traditions and modern pop culture.',
        price: '$1,500',
    },
    {
        id: 3,
        name: 'New York',
        image: 'https://images.unsplash.com/photo-1496442226666-8d45119052b6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The city that never sleeps, with iconic landmarks and vibrant energy.',
        price: '$950',
    },
    {
        id: 4,
        name: 'Rio de Janeiro',
        image: 'https://images.unsplash.com/photo-1549429548-26615b3c3b06?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Enjoy stunning beaches and the lively rhythm of samba.',
        price: '$1,100',
    },
    {
        id: 5,
        name: 'Bali',
        image: 'https://images.unsplash.com/photo-1537996194471-ff44fd1d7986?q=80&w=2538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'A tropical paradise known for its volcanic mountains and rice paddies.',
        price: '$1,350',
    },
    {
        id: 6,
        name: 'Cairo',
        image: 'https://images.unsplash.com/photo-1589578051641-a39c91629851?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Discover the ancient wonders of Egypt, including the Pyramids.',
        price: '$1,050',
    },
];

export default function DestinationPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <div className="bg-white text-gray-900 font-sans antialiased min-h-screen">
            {/* Hero Section */}
            <div
                className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1517441541014-460d3d528b12?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>
                <div className="z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-md">Find Your Next Adventure</h1>
                    <p className="text-lg sm:text-xl text-gray-200 drop-shadow-sm mb-8">
                        Search for a destination and book your unforgettable journey.
                    </p>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
                    >
                        <div className="flex items-center space-x-3 w-full md:w-2/5">
                            {/* Replaced react-icons with inline SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-blue-600 size-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Destination"
                                className="flex-1 p-2 outline-none rounded-lg bg-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-1/5">
                            {/* Replaced react-icons with inline SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-blue-600 size-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <input type="date" placeholder="Dates" className="flex-1 p-2 outline-none rounded-lg bg-transparent" />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-1/5">
                            {/* Replaced react-icons with inline SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-blue-600 size-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <input type="number" placeholder="Guests" min="1" className="flex-1 p-2 outline-none rounded-lg bg-transparent" />
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-1/5 bg-blue-600 text-white py-3 rounded-2xl shadow-md font-bold hover:bg-blue-700 transition-colors duration-300"
                        >
                            <span className="flex items-center justify-center space-x-2">
                                {/* Replaced react-icons with inline SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <span>Search</span>
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Popular Destinations Section */}
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Popular Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {popularDestinations.map((destination) => (
                            <motion.div
                                key={destination.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, delay: destination.id * 0.1 }}
                                className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                            >
                                <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                    <h3 className="text-2xl font-bold mb-1 drop-shadow-md">{destination.name}</h3>
                                    <p className="text-sm font-light text-gray-200 drop-shadow-sm">{destination.description}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-lg font-semibold drop-shadow-sm">{destination.price}</p>
                                        <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="bg-blue-600 text-white py-20 px-6 text-center">
                <h2 className="text-4xl font-extrabold mb-4">Ready to Go?</h2>
                <p className="text-lg mb-8">Discover thousands of destinations and find the perfect trip for you.</p>
                <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                    Start Planning
                </button>
            </div>
        </div>
    );
}

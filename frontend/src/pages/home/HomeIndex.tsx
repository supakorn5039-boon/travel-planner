export default function HomeIndex() {
    const highlights = [
        {
            title: 'Japan, Tokyo',
            description: 'Discover the vibrant city of Tokyo, known for its modern architecture and bustling nightlife.',
            image: '/images/tokyo.png',
        },
    ];

    return (
        <div className="bg-white text-gray-900 mb-6">
            {/* Hero Section */}
            <section
                className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('/images/hero-destination.jpg')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Discover Your Next Adventure</h1>
                    <p className="text-lg md:text-2xl max-w-xl mx-auto mb-8">Handpicked destinations to inspire your wanderlust</p>
                    <a
                        href="/destinations"
                        className="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition"
                    >
                        Explore Destinations
                    </a>
                </div>
            </section>

            {/* Destination Highlights */}
            {highlights.map((place, index) => (
                <section key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2">
                        <img src={place.image} alt={place.title} className="w-full h-[400px] object-cover" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center p-10 bg-gray-50">
                        <h2 className="text-3xl font-bold mb-4">{place.title}</h2>
                        <p className="text-gray-700 mb-6">{place.description}</p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Learn More</button>
                    </div>
                </section>
            ))}

            {/* Call to Action */}
            <section className="py-20 bg-blue-900 text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Ready to start your journey?</h2>
                <p className="text-lg mb-8">Plan your perfect trip with our intuitive travel planner.</p>
                <a href="/planner" className="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-full text-lg font-semibold transition">
                    Start Planning
                </a>
            </section>
        </div>
    );
}

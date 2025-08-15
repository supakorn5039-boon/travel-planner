import { ROUTES } from '@/constants/RouteConst';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutIndex(): React.ReactElement {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow">
                        Discover Your Next Horizon
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                        We believe that the best stories are found between the pages of a passport. Our mission is to transform your travel dreams
                        into tangible plans, making every step of your adventure seamless, exciting, and unforgettable.
                    </p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-purple-600 mb-2">Dream Bigger</h2>
                        <p className="text-gray-600">
                            Explore breathtaking destinations from around the globe, from bustling cities to serene landscapes.
                        </p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-blue-600 mb-2">Plan Smarter</h2>
                        <p className="text-gray-600">
                            Use intuitive tools to organize your itinerary, manage bookings, and stay on top of your travel plans.
                        </p>
                    </div>
                    <div className="bg-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-pink-600 mb-2">Travel Freely</h2>
                        <p className="text-gray-600">Gain confidence with every booking and discovery. We're here to be your trusted guide.</p>
                    </div>
                </section>

                <section className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800">The Heart of Our Journey</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our team is a diverse group of adventurers, storytellers, and logistics wizards. We are united by a simple idea: that travel
                        has the power to change perspectives, build connections, and create lasting memories.
                    </p>
                </section>

                <section className="text-center space-y-4 pt-4">
                    <h2 className="text-3xl font-bold text-gray-800">Join the Adventure</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">The world is waiting. What story will you tell?</p>
                    <button
                        onClick={() => navigate(ROUTES.DESTINATION)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                    >
                        Start Planning Now
                    </button>
                </section>
            </div>
        </div>
    );
}

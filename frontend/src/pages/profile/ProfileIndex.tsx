import { SpinnerLoadingPulse } from '@/components/Loading/SpinLoading';
import { ProfileService } from '@/services/ProfileService';
import { formatDate } from '@/utils/format';
import { useQuery } from '@tanstack/react-query';
import { FaPlaneDeparture } from 'react-icons/fa';

export default function ProfileIndex() {
    const { data, isLoading } = useQuery({
        queryKey: [ProfileService.QUERY_KEY],
        queryFn: () => ProfileService.getprofile(),
    });

    if (isLoading || !data) {
        return <SpinnerLoadingPulse />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative px-6 pb-6">
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold capitalize text-white">{data.username}</h2>
                        <span className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full capitalize">{data.role}</span>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                        <div className="bg-gray-100 rounded-xl p-4">
                            <FaPlaneDeparture className="mx-auto text-green-500 text-2xl mb-2" />
                            <p className="text-sm text-gray-500">Trips Taken</p>
                            <p className="font-semibold">{data.tripsCount}</p>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-4">
                            <span className="mx-auto text-purple-500 text-2xl mb-2">⭐</span>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-semibold">{formatDate(new Date(data.createdAt))}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

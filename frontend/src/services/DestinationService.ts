import { API_ROUTES } from '@/constants/ApiConst';
import type { DestinationProps } from '@/types/Destination';
import { fetchClient } from '@/utils/axios';

export const DestinationService = {
    QUERY_KEY: 'destinations',

    getAllDestinations: async (): Promise<DestinationProps[]> => {
        const res = await fetchClient.get(`${API_ROUTES.DESTINATION}`);
        return res.data;
    },

    getDestinationById: async (id: number): Promise<DestinationProps> => {
        const res = await fetchClient(`${API_ROUTES.DESTINATION}/${id}`);
        return res.data;
    },
};

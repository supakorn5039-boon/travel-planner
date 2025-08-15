import { API_ROUTES } from '@/constants/ApiConst';
import type { MyTripProps, ProfileProps } from '@/types/Profile';
import { fetchClient } from '@/utils/axios';

export const ProfileService = {
    QUERY_KEY: 'profile',

    getprofile: async (): Promise<ProfileProps> => {
        const res = await fetchClient.get(API_ROUTES.PROFILE);
        return res.data;
    },

    getMyTrip: async (): Promise<MyTripProps[]> => {
        const res = await fetchClient.get(API_ROUTES.MYTRIP);
        return res.data;
    },
};

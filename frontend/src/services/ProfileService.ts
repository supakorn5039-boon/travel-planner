import { API_ROUTES } from '@/constants/ApiConst';
import type { ProfileProps } from '@/types/Profile';
import { fetchClient } from '@/utils/axios';

export const ProfileService = {
    QUERY_KEY: 'profile',

    getprofile: async (): Promise<ProfileProps> => {
        const res = await fetchClient.get(API_ROUTES.PROFILE);
        return res.data;
    },
};

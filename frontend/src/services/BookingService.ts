import { API_ROUTES } from '@/constants/ApiConst';
import { BookingDefaultValue, BookingResolver, type BookingSchemaProps } from '@/dto/BookingDTO';
import type { BookingProps } from '@/types/Booking';

import { fetchClient } from '@/utils/axios';
import { useForm } from 'react-hook-form';

export const BookingService = {
    QUERY_KEY: 'booking',

    getMyBooking: async (): Promise<BookingProps[]> => {
        const res = await fetchClient.get(API_ROUTES.BOOKING);
        return res.data;
    },

    createBooking: async (bookingData: BookingSchemaProps): Promise<BookingProps> => {
        const res = await fetchClient.post(API_ROUTES.BOOKING, bookingData);
        return res.data;
    },

    useBookingForm: (initialFormData: BookingSchemaProps = BookingDefaultValue, destinationId: number) => {
        return useForm<BookingSchemaProps>({
            defaultValues: { ...initialFormData, destinationId },
            resolver: BookingResolver,
        });
    },
};

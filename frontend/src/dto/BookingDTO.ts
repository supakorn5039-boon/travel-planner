import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';
import * as z from 'zod';

const BookingSchema = z.object({
    startDate: z.coerce.date().refine((date) => date > new Date(), {
        message: 'Start date must be in the future',
    }),
    endDate: z.coerce.date().refine((date) => date > new Date(), {
        message: 'End date must be in the future',
    }),
    destinationId: z.number().positive(),
});

export type BookingSchemaProps = z.infer<typeof BookingSchema>;

export const BookingDefaultValue: BookingSchemaProps = {
    destinationId: 0,
    startDate: new Date(),
    endDate: new Date(),
};

export const BookingResolver: Resolver<BookingSchemaProps> = zodResolver(BookingSchema);

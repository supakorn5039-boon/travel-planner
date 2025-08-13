import { Month } from '@/constants/Month';

export const formatDate = (date: Date): string => {
    const months = Month;

    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-4);

    return `${day} ${month} ${year}`;
};

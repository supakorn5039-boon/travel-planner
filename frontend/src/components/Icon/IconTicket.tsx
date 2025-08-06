import type { IconProps } from '@/types/Components';

export default function IconTicket({ className }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`size-12 text-blue-500 dark:text-blue-400 ${className}`}
        >
            <path
                fillRule="evenodd"
                d="M11.54 22.351A2.453 2.453 0 0 0 12 22.5c.376 0 .745-.064 1.09-.189a2.44 2.44 0 0 0 1.05-.626l.21-.21 7.558-7.559a2.25 2.25 0 0 0 0-3.182L15.594 3.82a2.25 2.25 0 0 0-3.182 0L4.134 11.01a2.25 2.25 0 0 0-.626 1.05c-.125.345-.189.714-.189 1.09 0 .376.064.745.189 1.09.189.345.454.654.791.868l.21.21 7.558 7.559ZM12 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

import type React from 'react';
import { SpinnerLoadingCreateButton, SpinnerLoadingRemoveButton } from '../Loading/SpinLoading';

type ButtonCustomProps = {
    iconHead?: React.ReactNode;
    iconTail?: React.ReactNode;
    label?: string | React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    headClassName?: string;
    tailClassName?: string;
    bgColor?: string;
    labelClassName?: string;
    isLoading?: boolean;
    disabled?: boolean;
    remove?: boolean;
    BoxClass?: string;
};

export default function ButtonCustom({
    iconHead,
    iconTail,
    label,
    onClick,
    type = 'button',
    className = '',
    headClassName = '',
    tailClassName = '',
    bgColor = '',
    labelClassName = 'text-white',
    isLoading,
    disabled,
    remove,
    BoxClass,
}: ButtonCustomProps) {
    const baseClasses = [
        'flex items-center justify-center',
        'min-h-[40px] px-6',
        'text-base rounded-lg',
        'whitespace-nowrap',
        bgColor,
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const labelClasses = ['text-[14px] lg:text-[16px]', labelClassName].filter(Boolean).join(' ');

    return (
        <div className={BoxClass}>
            <button type={type} disabled={disabled || isLoading} onClick={onClick} className={baseClasses}>
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        {remove ? <SpinnerLoadingRemoveButton /> : <SpinnerLoadingCreateButton />}
                        {label && <span className={labelClasses}>{label}</span>}
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {iconHead && <span className={headClassName}>{iconHead}</span>}
                        {label && <span className={labelClasses}>{label}</span>}
                        {iconTail && <span className={tailClassName}>{iconTail}</span>}
                    </div>
                )}
            </button>
        </div>
    );
}

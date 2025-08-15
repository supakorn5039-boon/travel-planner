import ButtonCustom from '@/components/button/ButtonCustom';
import IconTicket from '@/components/Icon/IconTicket';
import FormInputField from '@/components/Input/FormInputField';
import { showErrorToast, showSuccessToast } from '@/components/Toast/Toast';
import { ROUTES } from '@/constants/RouteConst';
import { CredentialService } from '@/services/CredentialService';
import { useUserStore } from '@/store/features/user/useUserStore';
import type { CredentialProps } from '@/types/Credential';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import type React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(): React.ReactElement {
    const { register, handleSubmit, formState } = CredentialService.useCredentialForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setUser } = useUserStore();

    const mutation = useMutation({
        mutationFn: CredentialService.Login,
        onSuccess: (data) => {
            const { token } = data;
            Cookie.set('token', token!, { expires: 1 });

            setUser({
                username: data.user?.username,
                role: data.user?.role,
            });

            queryClient.invalidateQueries({ queryKey: [CredentialService.QUERY_KEY] });
            showSuccessToast('เข้าสู่ระบบสําเร็จ');
            navigate(ROUTES.HOME);
        },
        onError: (error: AxiosError<{ error: string }>) => {
            const msg = error.response?.data.error ?? 'Login Fail !';
            showErrorToast(msg);
        },
    });

    const onSubmit = (formData: CredentialProps) => {
        mutation.mutate(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative hidden md:flex items-center justify-center p-8 bg-cover bg-center fade-in-bg">
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 text-white text-center">
                        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Your Next Adventure Awaits!</h1>
                        <p className="text-lg font-medium max-w-sm drop-shadow-md">
                            Discover breathtaking destinations and plan unforgettable journeys with ease.
                        </p>
                    </div>
                </div>

                <div className="relative w-full bg-white p-8 space-y-8 md:p-12">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-xl">
                        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500 animate-spin" />
                        <IconTicket />
                    </div>

                    <h2 className="pt-8 text-3xl font-extrabold text-center text-gray-800">Start Your Journey</h2>
                    <p className="text-center text-gray-600 -mt-2">Log in to plan your next adventure!</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <FormInputField
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="Enter your username"
                            register={register('username')}
                            error={formState.errors.username}
                        />
                        <FormInputField
                            label="Password"
                            name="password"
                            type="password"
                            register={register('password')}
                            error={formState.errors.password}
                            placeholder="Enter your password"
                        />

                        <ButtonCustom
                            type="submit"
                            disabled={mutation.isPending}
                            isLoading={mutation.isPending}
                            label={mutation.isPending ? 'Logging in...' : 'Log In'}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </form>

                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400 font-medium cursor-pointer">
                            Register here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

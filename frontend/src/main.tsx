import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// TanStack
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastifyContainer } from './components/Toast/Toast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            <QueryClientProvider client={queryClient}>
                <ToastifyContainer />
                <RouterProvider router={router} future={{ v7_startTransition: true }} />
            </QueryClientProvider>
        </Suspense>
    </React.StrictMode>
);

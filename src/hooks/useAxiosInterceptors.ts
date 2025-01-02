import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import fileService from '@/lib/axiosInstance';

const useAxiosInterceptors = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = fileService.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && error.response.status === 403) {
                    console.log(error)
                    toast('Invalid token, please re-login');
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                    navigate('/signin');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            fileService.interceptors.response.eject(interceptor);
        };
    }, []);
};

export default useAxiosInterceptors;
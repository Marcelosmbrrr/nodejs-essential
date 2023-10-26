import * as React from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useAuth } from '../../context/AuthContext';

interface IForm {
    username: string,
    password: string
}

interface IError {
    username: string,
    password: string
}

export function LoginForm() {

    const [form, setForm] = React.useState<IForm>({ username: '', password: '' });
    const [error, setError] = React.useState<IError>({ username: "", password: "" });
    const { login } = useAuth();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!validation()) return;

        try {
            await login(form);
        } catch (e: any) {
            console.log(e);
            enqueueSnackbar(e.message, { variant: 'error' });
        }

    }

    function validation(): boolean {

        let isValid = true;
        let errorClone = JSON.parse(JSON.stringify(error));

        if (!form.username) {
            errorClone.username = 'Username is required';
            isValid = false;
        } else {
            errorClone.username = '';
        }

        if (!form.password) {
            errorClone.password = 'Password is required';
            isValid = false;
        } else {
            errorClone.password = '';
        }

        setError(errorClone);

        return isValid;
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <SnackbarProvider />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <i className="devicon-socketio-original mr-2"></i>
                    Socket.io
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input onChange={handleChange} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@domain.com" />
                                <span className='text-sm text-red-400'>{error.username}</span>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" />
                                <span className='text-sm text-red-400'>{error.password}</span>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}
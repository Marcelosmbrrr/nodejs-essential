import * as React from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useAuth } from '../../context/AuthContext';
import { socket } from '../../services/socket';

interface IMessage {
    username: string;
    timestamp: string;
    text: string;
}
export function Chat() {

    const [message, setMessage] = React.useState<string>("");
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const { user } = useAuth();
    const { logout } = useAuth();

    React.useEffect(() => {
        socket.emit('login', user?.username);
    }, []);

    function handleSendMessage() {
        if (!message) {
            return;
        }
        socket.emit("new-message", message);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    function onLogout() {
        setMessage("");
        setMessages([]);
        logout();
        socket.emit('logout');
    }

    // Socket listeners
    socket.on('login', (response: { username: string }) => {
        enqueueSnackbar(`${response.username} has joined the chat.`, { variant: 'info' });
    });

    socket.on('logout', (response: { username: string }) => {
        enqueueSnackbar(`${response.username} has left the chat.`, { variant: 'info' });
    });

    socket.on("new-message", (message: IMessage) => {
        setMessages((messages) => [...messages, message]);
    });

    return (
        <>
            <div className='w-screen h-screen flex flex-col justify-center items-center gap-1 bg-gray-50 dark:bg-gray-900'>
                <SnackbarProvider />
                <div className="w-80 h-96 flex flex-col border shadow-md bg-white">
                    <div className="flex items-center justify-between border-b p-2">
                        <div className="flex items-center">
                            <img className="rounded-full w-10 h-10"
                                src={user?.avatar} />
                            <div className="pl-2">
                                <div className="font-semibold">
                                    <span className="hover:underline">{user?.username}</span>
                                </div>
                                <div className="text-xs text-gray-600">Online</div>
                            </div>
                        </div>
                        <div>
                            <button onClick={onLogout} className="inline-flex rounded-full p-2" type="button">
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 px-4 py-4 overflow-y-auto">
                        {!!messages && messages.map((message, index) => (
                            <div className="flex items-center mb-4" key={index}>
                                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                                    <img className="rounded-full w-10 h-10"
                                        src={"images/" + message.username + ".png"} />
                                    <a href="#" className="block text-xs hover:underline">{message.username}</a>
                                </div>
                                <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                                    <div>{message.text}</div>
                                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className='w-80 flex gap-1'>
                    <input onChange={handleChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5" placeholder="Type your message" />
                    <button onClick={handleSendMessage} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send</button>
                </div>
            </div>
        </>
    )
}
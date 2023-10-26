import { useAuth } from "./context/AuthContext";
import { Chat } from "./components/chat/Chat";
import { LoginForm } from "./components/formulary/LoginForm";

export function App() {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <LoginForm />
    }

    return <Chat />

}
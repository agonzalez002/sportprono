import { toast } from "react-toastify";

export function status(res: Response) {
    if (!res.ok) {
        let message = '';
        if (res.url.endsWith('login')) {
            message = "Authentication failed!";
        } else {
            return res.json().then((err: {message: string}) => {
                message = err.message || 'An unknown error occurred.';
                toast.error(message);
            });
        }
        throw new Error(message);
    }
    return res.json();
}
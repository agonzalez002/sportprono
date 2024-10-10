import { toast } from "react-toastify";

export function status(res: Response) {
    if (!res.ok) {
        let message = '';
        if (res.url.endsWith('login')) {
            message = "Nom d'utilisateur ou mot de passe incorrect !";
        } else if (res.url.endsWith('users/')) {
            return res.json().then((err: {message: string}) => {
                if ('email' in err) {
                    message = "Cet email est déjà utilisé !";
                } else if ('username' in err) {
                    message = "Nom d'utilisateur déjà utilisé !"; 
                }
                toast.error(message);
            });
        } else {
            return res.json().then((err: {message: string}) => {
                message = err.message || 'Une erreur inconnue est arrivée !';
                toast.error(message);
            });
        }
        throw new Error(message);
    }
    return res.json();
}
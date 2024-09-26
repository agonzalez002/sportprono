import { toast } from "react-toastify";

function status(res: any) {
    if (!res.ok) {
        return res.json().then((err: {message: string}) => {
            toast.error(err.message);
        })
    }
    return res.json();
}

export default status;
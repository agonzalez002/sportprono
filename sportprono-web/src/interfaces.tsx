export interface UserType {
    token: string;
    user: {
        id: number;
        username: string;
        profile: {
            image: string;
        };
    };
}

export interface AuthContextType {
    authData: UserType;
    setAuth: (newUser: UserType) => void;
}

export interface EventType {
    id: number;
    team1: string;
    team2: string;
    time: string;
    score1: number;
    score2: number;
    group: number;
}

export interface MemberType {
    admin: boolean;
    points: number;
    user: UserDataType;
}

export interface GroupFullType {
    id: number;
    name: string;
    location: string;
    description: string | null;
    events: EventType[];
    members: MemberType[];
}

export interface GroupType {
    id: number,
    name: string,
    location: string,
    description: string | null,
}

export interface UserDataSignUpType {
    username: string | null;
    email: string | null;
    password: string | null;
}

export interface UserDataType {
    email: string,
    id: number,
    profile: {
        id: number,
        image: string,
        is_premium: boolean,
        bio: string,
    },
    username: string,
}

export interface ChangePasswordType {
    old_password: string | undefined,
    new_password: string | undefined,
}
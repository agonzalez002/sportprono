export interface UserType {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    profile: {
      id: number;
      image: string;
      image_url: string;
      is_premium: boolean;
      bio: string;
    };
    first_name: string;
    last_name: string;
  };
}

export interface AuthContextType {
  authData: UserType | null;
  setAuth: (newUser: UserType | null) => void;
}

export interface BetType {
  id: number;
  user: UserDataType;
  event: number;
  score1: number;
  score2: number;
}

export interface ShortEventType {
  team1: string;
  team2: string;
  time: string;
  group: number;
}

export interface EventType {
  id: number;
  team1: string;
  team2: string;
  time: string;
  score1: number;
  score2: number;
  group: number;
  bets: BetType[];
  num_bets: number;
}

export interface MemberType {
  admin: boolean;
  points: number;
  user: UserDataType;
  trophy?: "gold" | "silver" | "bronze";
}

export interface GroupFullType {
  id: number;
  name: string;
  location: string;
  description: string | null;
  events: EventType[];
  members: MemberType[];
  creator: string;
}

export interface GroupType {
  id: number;
  name: string;
  image: string;
  image_url: string;
  code: string;
  is_private: boolean;
  searchCode: string;
}

export interface PaginateType {
  count: number;
  next: null | number;
  previous: null | number;
  results: GroupType[];
}

export interface UserDataSignUpType {
  username: string | null;
  email: string | null;
  password: string | null;
}

export interface UserDataType {
  email: string;
  id: number;
  profile: {
    id: number;
    image: string;
    image_url: string;
    is_premium: boolean;
    bio: string;
  };
  username: string;
}

export interface ChangePasswordType {
  old_password: string | undefined;
  new_password: string | undefined;
}

export interface PlaceBetType {
  event_id: number;
  score1: string;
  score2: string;
}

export interface ScoresType {
  [key: number]: {
    score1: number;
    score2: number;
  };
}

export interface ChangeUserDataType {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ForgotPwdType {
  email: string;
}

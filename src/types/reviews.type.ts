export type Review = {
    id: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
};

export type User = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
};

export type UserData = {
    login: string;
    password: string;
  };

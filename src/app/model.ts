export interface Authentication{
    username: string;
    password: string;
}

export interface Contact{ 
    id?: number;
    name: string;
    email: string;
    phone: string; 
}

export interface User{
    id?: number;
    username: string;
    name: string;
    password?: string;
    admin: boolean;
}
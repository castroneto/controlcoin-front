export interface User {
}


export interface LoginInterface {
    email: string,
    password: string
}

export interface RegisterInterface {
    email: string,
    password: string,
    username: string
}

export interface TokenInterface {
    expirationTime: number,
    token: string
}
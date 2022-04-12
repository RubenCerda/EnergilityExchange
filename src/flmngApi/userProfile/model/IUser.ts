export interface IUser {
    Username: string
    FirstName: string
    LastName: string
    Email: string
    Password: string
    UserSessionId: number
}

export interface IUserNewPassword {
    Email: string 
    TemporalPassword: string
    NewPassword: string
}

export interface ILogin {
    UserId: string 
    Password: string
}
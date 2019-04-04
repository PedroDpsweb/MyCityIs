export interface Roles{
    editor?:boolean;
    admin?:boolean;
}

export interface Stars{
    userStar?:any;
    totalStars?:string;
}

export interface UserInterface {
    id?:string;
    name?:string;
    email?:string;
    password?:string;
    photoUrl?:string;
    roles?: Roles;
    stars?: Stars;
    desc?: string;
    categories?:string;


}
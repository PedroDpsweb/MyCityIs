export interface like{
  users?:any;
  count?:string;
}

export interface postInterface {
    id?:string;
    title?:string;
    user?:string;
    description?:string;
    photoUrl?:string;
    date?:number;
    like?:like;
    userUid?: string;


}

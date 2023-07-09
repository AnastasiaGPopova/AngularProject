export interface Post {
    [x: string]: any;
    _id?: string | null;
    movieName: string;
    artist: string | null;
    director: string | null;
    description: string | null;
    year: any;
    imageUrl: string | null;
    genre: string | null;
    likes: number;
    likedBy: any[];
    wishingList: any[] | null;
    _ownerId?: _ownerId;
    createdAt: string | null;
    updatedAt: string | null;
    __v?: number | null;
    raiting?:number|null;
  }
  
  export interface _ownerId {
    email: string;
    gender: string;
    password: string;
    __v: number;
    _id: string;
  }
  
  export interface Comment {
    ownerComment: string | null;
    content: string | null;
    recordId: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    __v: number | null;
    _id: number | null;
  }
  
  export interface Genre {
    id: number;
    name: string;
    isSelected: boolean;
  }
  
  export interface iMDB {
    movie: string;
    imageUrl: string;
    year: string;
    link: string;
    stars: string;
  }
  
  export interface iMDBRes {
    d: imdbD[];
    q: string;
    v: number;
  }
  
  export interface imdbD {
    i: imdbI;
    id: string;
    q: string;
    qid: string;
    rank: number;
    s: string;
    y: number;
  }
  
  export interface imdbI {
    heigth: number;
    imageUrl: string;
    width: number;
  }
  
  export interface User {
    email: string | null;
    gender: string;
    password: string;
    __v: number;
    _id: string;
  }
  
  
  export interface Option{
      id: number;
      name: string;
      isSelected: boolean;
  }
  
  
    
  export interface dataSearch {
      searchItem: string;
      genres: string;
      year: string,
    }
  
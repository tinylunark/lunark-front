export interface Review {
    rating: number;
    description: string;
    date: Date;
    authorId?: number;
    author: string;
    type: ReviewType,
    id?: number;
}

export enum ReviewType {
  HOST = 'HOST',
  PROPERTY = 'PROPERTY',
}

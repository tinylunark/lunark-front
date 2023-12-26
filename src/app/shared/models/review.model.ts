export interface Review {
    rating: number;
    description: string;
    date: Date;
    authorId: number;
    author: string;
    id?: number;
}
export interface NewsResponse {
    id: number,
    title: string,
    text: string,
    image: string,
    created_at: string
}
export interface GetAllNewsResponse {
    news: NewsResponse[];
}
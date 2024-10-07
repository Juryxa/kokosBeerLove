import newsApi from "../http/news";

export default class ContentService{
    static async getAllNews() {
        return newsApi.get('/news/');
    }

    static async createNews(title: string, text: string, image_url: string) {
        return newsApi.post(`/news/create/`, {title, text, image_url});
    }

    static async deleteNews(articleId: number) {
        return newsApi.delete(`/news/${articleId}/delete/`);
    }
    static async updateFullNews(articleId: number, title: string, text: string, image_url: string) {
        return newsApi.put(`/news/${articleId}/delete/`);
    }
    static async updatePartNews(articleId: number, title: string, text: string, image_url: string) {
        return newsApi.patch(`/news/${articleId}/delete/`);
    }
}
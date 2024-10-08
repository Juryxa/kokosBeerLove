import newsApi from "../http/news";

export default class ContentService{
    static async getAllNews() {
        return newsApi.get('/get_all/');
    }

    static async createNews(title: string, text: string, image_url: string) {
        return newsApi.post(`/create/`, {title, text, image_url});
    }

    static async deleteNews(articleId: number) {
        return newsApi.delete(`/${articleId}/delete/`);
    }
    static async updateFullNews(articleId: number, title: string, text: string, image_url: string) {
        return newsApi.put(`/${articleId}/delete/`, {title, text, image_url});
    }
    static async updatePartNews(articleId: number, title: string, text: string, image_url: string) {
        return newsApi.patch(`/${articleId}/delete/`, {title, text, image_url});
    }
}
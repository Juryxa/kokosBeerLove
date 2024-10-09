import {shopApi} from "../http/shop";
import {ShopResponse} from "../models/response/ShopResponse";

export default class ShopService {

    static async getAllProducts() {
        // @ts-ignore
        return shopApi.get<ShopResponse[]>('/get_all/');
    }


    static async getProductId(productId: number) {
        // @ts-ignore
        return shopApi.get<ShopResponse>(`/${productId}/`);
    }


    static async createProduct(name: string, description: string, price: string, url_images: string[]) {
        // @ts-ignore
        return shopApi.post<ShopResponse>('/create_product/', {name, description, price, url_images});
    }


    static async deleteProduct(productId: number) {
        return shopApi.delete(`/delete_product/${productId}/`);
    }


    static async updateFullProduct(productId: number, name: string, description: string, price: string, url_images: string[]) {
        // @ts-ignore
        return shopApi.put<ShopResponse>(`/update_product/${productId}/`, {name, description, price, url_images});
    }


    static async updatePartProduct(productId: number, name: string, description: string, price: string, url_images: string[]) {
        // @ts-ignore
        return shopApi.patch<ShopResponse>(`/update_product/${productId}/`, {name, description, price, url_images});
    }
}

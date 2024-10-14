import {basketApi} from "../http/basket";
import {ProductToAdd} from "../models/ProductToAdd";

export default class BasketService{
    static async addToBasket(product: number, quantity: number) {
        // @ts-ignore
        return basketApi.post<ProductToAdd>('/add_to_cart/', {product, quantity});
    }
    static async getAllBasket(productId: number) {
        // @ts-ignore
        return basketApi.get<ShopResponse>(`/get_all_items_from_cart/${productId}`);
    }

    static async removeItemFromBasket(productId: number) {
        // @ts-ignore
        return basketApi.delete(`/remove_item_from_cart/${productId}`);
    }

}
import {createApiInstance} from "./apiInterceptorsFactory/apiInterceptorsFactory";
import {SHOP_API_URL} from "./url/urls";

export const basketApi = createApiInstance(SHOP_API_URL, /^\/delete_product\/\d+\/$/, /^\s*$/, '/add_to_cart/');
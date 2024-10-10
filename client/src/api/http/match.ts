import {createApiInstance} from "./apiInterceptorsFactory/apiInterceptorsFactory";
import {MATCH_API_URL} from "./url/urls";

export const matchApi = createApiInstance(MATCH_API_URL, /^\/\d+\/delete\/$/, /^\/\d+\/update\/$/, '/create/');
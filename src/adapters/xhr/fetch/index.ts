// uvik isti popis metoda a ovisno o importu pribacujes jednu il drugu

import { API_BASE_URL } from "../../../helpers/constants/swapiEndpoints"

export const getResource = (url:string) => {
    return fetch(`${API_BASE_URL}${url}`);
}

export const postResource = (url:string, requestObject:Object) => {

}
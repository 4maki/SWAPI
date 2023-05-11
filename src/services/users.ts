import { getResource } from '../adapters/xhr/axios';
// mos koristit any u promisu al bolje napravit potpis user
export const getUser = async (url: string): Promise<any> => {
    // ako ne postoji url izbaci
    if(!url){
        return
    }
    try {
        const response = await getResource(url);
        return response.data.name;
    } catch (error) {
        console.error(error);
    }
};

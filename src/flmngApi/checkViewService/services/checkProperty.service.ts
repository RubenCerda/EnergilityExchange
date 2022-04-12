import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl =`${process.env.REACT_APP_API_BASE_URL}/api/`


export async function getCheckProperty(checkView: any,  page: any, limit: any) {
    const cookies = new Cookies();
    try {
        const responce = await axios.get(baseUrl + 'Reports/GetCheckProperty?FromDate='
                                +checkView.fromDate+'&CompanyId=' +checkView.companyId+ '&DocTypeId=' + 
                                checkView.docTypeId + '&UserId='+ cookies.get('userId')+ '&filters=' +checkView.filters+ '&pageNumber=' + page + '&limit=' + limit)
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function getCheckPropertyId(id: number) {
    try {
        const responce = await axios.get(baseUrl + 'Property/' + id)
        return responce.data
    } catch (error) {
        throw error
    }
}
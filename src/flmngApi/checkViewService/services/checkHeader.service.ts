import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl =`${process.env.REACT_APP_API_BASE_URL}/api/`
const cookies = new Cookies();
export async function getCheckHeaderView(checkView: any, page: any, limit: any) {
    try {
        const responce = await axios.get(baseUrl + 'Reports/GetCheckHeaderView?FromDate='
                                +checkView.fromDate+'&ToDate='+checkView.toDate+'&CompanyId=' +checkView.companyId+ '&DocTypeId=' + checkView.docTypeId + '&UserId='+ cookies.get('userId')
                                +'&filters=' +checkView.filters+ '&pageNumber=' +page+ '&limit=' +limit)
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function getCheckDetailByDocSystemNo(paramDocSys: any) {
    try {
        const responce = await axios.get(baseUrl + 'Reports/GetCheckDetailViewByDocSystemNo?DocSystemNo=' + paramDocSys.docSystemNo + '&UserId='+ cookies.get('userId'))
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function getSavePDF(paramDocSys: any) {
    try {
        const responce = await axios.get(baseUrl + 'Reports/SavePDF?DocSysNo=' + paramDocSys + '&UserId='+ cookies.get('userId'), {responseType: "blob"})
        return responce.data
    } catch (error) {
        throw error
    }
}
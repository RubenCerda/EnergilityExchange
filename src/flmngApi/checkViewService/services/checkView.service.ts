import axios from 'axios';
import { ICheckHeaderGraph } from '../model/ICheckView';
import Cookies from 'universal-cookie';

const baseUrl =`${process.env.REACT_APP_API_BASE_URL}/api/`

export async function getCheckHeaderGraph(checkView: ICheckHeaderGraph) {
    const cookies = new Cookies();
    try {
        const responce = await axios.get(baseUrl + 'Reports/GetCheckHeaderViewGraph?FromDate='
                                +checkView.fromDate+'&ToDate='+checkView.toDate+'&CompanyId=' +checkView.companyId+ 
                                '&DocTypeId=' + checkView.docTypeId + '&UserId='+ cookies.get('userId') + '&pageNumber=' +checkView.pageNumber + '&limit=' +checkView.limit)
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function getDocumentTypeById(id: number) {
    try {
        const responce = await axios.get(baseUrl + 'documentType/' + id)
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function postDocumentType(checkView: ICheckHeaderGraph) {
    try {
        const responce = await axios.post(baseUrl + 'documentType/', { ...DocumentType })
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function putDocumentType(id: number, DocumentType: ICheckHeaderGraph) {
    try {
        const responce = await axios.put(baseUrl + 'documentType/' + id, { ...DocumentType })
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function deleteDocumentType(id: number) {
    try {
        const responce = await axios.delete(baseUrl + 'documentType/' + id)
        return responce.data
    } catch (error) {
        throw error
    }
}
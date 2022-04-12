import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl =`${process.env.REACT_APP_API_BASE_URL}/api/`

export async function getDashboard(date: string) {
    const cookies = new Cookies();
    let cookiesUserId = cookies.get('userId');
    try {
        const responce = await axios.get(baseUrl + 'Reports/GetDashboardByCurrentMonth?currentDate=' + date + '&UserId='+ cookiesUserId)
        return responce.data
    } catch (error) {
        throw error
    }
}

export async function getDashboardById(id: number) {
    try {
        const responce = await axios.get(baseUrl + 'GetDashboardId/' + id)
        return responce.data
    } catch (error) {
        throw error
    }
}
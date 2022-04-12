import { useState, useEffect } from 'react'
import { IDashboard } from '../flmngApi/dashboardService/model/IDashboard'
import * as service from '../flmngApi/dashboardService/services/dashboard.service'
import { LoadingEnum } from '../layout/gallerySlice'
import moment from 'moment';
const initialState: any = {
  loading: LoadingEnum.initial,
  error: ''
}

export const useDashboard = () => {
    const [state, setState] = useState(initialState);
    const [listAllDashboard, setlistDashboard] = useState({
      listDashboards: <any>[]
    });

    const setLoading = () => {
        setState((prevState: any) => ({
          ...prevState,
          loading: LoadingEnum.loading,
        }))
    }

    useEffect(() => {
      if (state.loading === LoadingEnum.initial) {
        setLoading();

        getDocTypes();

        // SET LOCAL STATE
        setState((prevState: any) => ({
          ...prevState,
          loading: LoadingEnum.ready,
          error: '',
        }));
      }
  }, [state.loading]);
  
    //Axios-Hooks
    const getDocTypes = async() => {
      const dateNow = new Date(Date.now());
      //Current Month
      let parsedDate = moment(dateNow);
      let outputDate = parsedDate.format("YYYY-MM-DD");
        const response = await service.getDashboard(outputDate);
        //Mapping only in this case for the ID
        const listUpdate = response.map((item: IDashboard) => {
          let itemParsed = moment(item.firstDay);
          let itemDate = itemParsed.format("MM/YYYY");
          return ({
            id: item.companyId,
            docTypeId: item.docTypeId,
            companyCve: item.companyCve,
            companyName: item.companyName,
            totalChecks: item.totalChecks,
            totalAmount: item.totalAmount,
            firstDay: itemDate,
            docTypeDescription: item.docTypeDescription
          })

        });

        setlistDashboard({
          ...listAllDashboard,
          listDashboards: listUpdate
        });
    }

    return {
      listAllDashboard
    }

}
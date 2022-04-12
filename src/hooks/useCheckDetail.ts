import { useState, useEffect } from 'react'
import * as service from '../flmngApi/checkViewService/services/checkHeader.service'
import { LoadingEnum } from '../layout/gallerySlice'

const initialState: any = {
  loading: LoadingEnum.initial,
  error: ''
}

export const useCheckDetailByDocSys = (paramDocSys: any) => {
    const [state, setState] = useState(initialState);
    const [checkDetail, setCheckDetail] = useState({
      listItems: <any>[]
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

        getCheckDetails();

        // SET LOCAL STATE
        setState((prevState: any) => ({
          ...prevState,
          loading: LoadingEnum.ready,
          error: '',
        }));
      }
  }, [state.loading]);
  
    //Axios-Hooks
    const getCheckDetails = async() => {
        const response = await service.getCheckDetailByDocSystemNo(paramDocSys);
        setCheckDetail({
          ...checkDetail,
          listItems: response
        });
    }

    return {
        checkDetail
    }

}
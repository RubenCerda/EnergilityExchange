import { useState, useEffect } from 'react'
import * as service from '../flmngApi/checkViewService/services/checkProperty.service'

export const useCheckProperty = (selection: any, page: any, limitPages: any) => {
    const [checkProperty, setCheckProperty] = useState({
      listItems: <any>[]
    });
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
      if (page > 0){
        getCheckProperty();
      }
  }, [page, selection, limitPages]);
  
    //Axios-Hooks
    const getCheckProperty = async() => {
        const response = await service.getCheckProperty(selection, page, limitPages);
        setTotalPage(response.count)
        setCheckProperty({
          ...checkProperty,
          listItems: response.items
        });
    }

    return {
        checkProperty,
        totalPage
    }

}
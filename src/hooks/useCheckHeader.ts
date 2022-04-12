import moment from 'moment'
import { useState, useEffect } from 'react'
import * as service from '../flmngApi/checkViewService/services/checkHeader.service'
export const useCheckHeader = (selection: any, page: any, limitPages: any) => {
    const [checkHeader, setcheckHeader] = useState({
      listItems: <any>[]
    });
    const [totalPage, setTotalPage] = useState(0);
    

    useEffect(() => {
      if (page > 0) {

        getCheckHeader();

      }
  }, [page, selection, limitPages]);
  
    //Axios-Hooks
    const getCheckHeader = async() => {
        const response = await service.getCheckHeaderView(selection, page, limitPages);
        setTotalPage(response.count)
        //Mapping only in this case for the ID
        const listUpdate = response.items.map((item: any) => {
          let itemParsed = moment(item.checkDate);
          let itemDate = itemParsed.format("MM/YYYY");
          return ({
              id: item.checkHeaderId,
              docSystemNo: item.docSystemNo,
              checkDate: itemDate,
              checkNumber: item.checkNumber,
              ownerNumber: item.ownerNumber,
              ownerName: item.ownerName,
              grossAmount: item.grossAmount,
              taxs: item.taxs,
              deductions: item.deductions,
              totalAmount: item.totalAmount
          })

        });

        setcheckHeader({
          ...checkHeader,
          listItems: listUpdate
        });
    }

    return {
      checkHeader, 
      totalPage
    }

}
import { useState } from 'react'

export const useMenu = (page: number, history: any) => {
    const tabNameToIndex: any = {
        0: "Reports", 1: "Check_Details"
      };

    const indexToTabName: any = {
        chat: 0, dashboard: 1
      };

    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    
    
    if(selectedTab === undefined){
        history.push(`/${tabNameToIndex[0]}`);
        setSelectedTab(0);
    }

    //React.ChangeEvent<HTMLInputElement>
    const handleChange = (event: any, newValue: number) => {
        history.push(`/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
        
    };

    return {
        handleChange,
        selectedTab
      }
  }
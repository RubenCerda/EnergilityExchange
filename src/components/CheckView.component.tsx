import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { TextField, Box, IconButton, Button } from "@mui/material";
import styled from "styled-components";
import CheckHeaderComponent from "./chekView/CheckHeader.component";
import CheckPropertyComponent from "./chekView/CheckProperty.component";
import {
  ICheckHeaderGraph,
  ICheckView,
  ICheckProperty,
} from "../flmngApi/checkViewService/model/ICheckView";
import { useParams } from "react-router-dom";
import { LoadingEnum } from "../layout/gallerySlice";
import * as service from "../flmngApi/checkViewService/services/checkView.service";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import FmTitle from "./MainTitle";
import InputAdornment from "@mui/material/InputAdornment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import CalendarIcon from "../assets/icons/calendar.svg";
import SearchIcon from "../assets/icons/magnifying-glass.svg";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { NONAME } from "dns";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#91969A",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#CCCCCC",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#CCCCCC",
      },
      "&:hover fieldset": {
        borderColor: "#CCCCCC",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#91969A",
      },
    },
  },
})(TextField);

const initialState: any = {
  loading: LoadingEnum.initial,
  error: "",
};
const initialInterface: ICheckHeaderGraph = {
  fromDate: "",
  toDate: "",
  companyId: "",
  docTypeId: "",
  filters: "",
  pageNumber: 1,
  limit: 6,
};
const InterfaceProp: ICheckProperty = {
  fromDate: "",
  companyId: "",
  docTypeId: "",
  filters: "",
};

const CheckViewComponent = () => {
  const navigate = useNavigate();
  const infoCardId = useParams();
  const [initial, setInitial] = useState(initialState);
  const [state, setState] = useState<ICheckHeaderGraph>(initialInterface);
  const [toDate, setToDate] = useState<Date | null>(new Date());
  const [checkProperty, setCheckProperty] =
    useState<ICheckProperty>(InterfaceProp);
  const [showDetails, setShowDetails] = useState(false);
  const [showProperty, setShowProperty] = useState(false);
  const [changePage, setChangePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dateNow = new Date();

  //Calculate Moth
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() - 6));
  const [fromDate, setFromDate] = useState<Date | null>(new Date(newDate));

  const [burnDownChart, setBurnDownChart] = useState({
    chartSeries: [],
    ChartCategories: [],
  });
  const graphSeries: any[] = [];
  const graphCategory: any[] = [];

  const setLoading = () => {
    setInitial((prevState: any) => ({
      ...prevState,
      loading: LoadingEnum.loading,
    }));
  };

  useEffect(() => {
    if (initial.loading === LoadingEnum.initial) {
      setLoading();
      //initial date format (from)
      //Calculate Moth
      const initialdateFrom = new Date();
      const dateFormatCalculate = new Date(
        initialdateFrom.setMonth(initialdateFrom.getMonth() - 6)
      );
      let parsedDateFrom = moment(dateFormatCalculate);
      let outputDateFrom = parsedDateFrom.format("YYYY-MM-DD");

      //initial date format (to)
      const initialdateTo = new Date();
      let parsedDateTo = moment(initialdateTo);
      let outputDateTo = parsedDateTo.format("YYYY-MM-DD");

      setState({
        ...state,
        companyId: infoCardId.id,
        docTypeId: infoCardId.docTypeId,
        fromDate: outputDateFrom,
        toDate: outputDateTo,
      });

      setCheckProperty({
        ...checkProperty,
        companyId: infoCardId.id,
        docTypeId: infoCardId.docTypeId,
      });
      // SET LOCAL STATE
      setInitial((prevState: any) => ({
        ...prevState,
        loading: LoadingEnum.ready,
        error: "",
      }));
    }
  }, [initial.loading]);

  const ApplyFilters = async () => {
    const response = await service.getCheckHeaderGraph(state);
    setTotalPages(response.totalPages);
    response.items.forEach((item: ICheckView) => {
      graphSeries.push({ monthYear: item.monthDate + "/" + item.yearDate });
      graphCategory.push({ totalAmount: item.totalAmount });
    });

    const listCategories = response.items.map((item: any, index: any) => {
      return graphSeries[index].monthYear;
    });

    const listSeries = response.items.map((item: any, index: any) => {
      return graphCategory[index].totalAmount;
    });

    setBurnDownChart({
      ...burnDownChart,
      chartSeries: listSeries,
      ChartCategories: listCategories,
    });
  };

  const handleChangeFrom = (event: any) => {
    setFromDate(event);  
  };

  const HandleChangeTo = (event: any) => {
    setToDate(event);
  };

  const HandleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, filters: event.target.value });
    setCheckProperty({
      ...checkProperty,
      filters: event.target.value,
    });
  };
  useEffect(() => {
    if (state.toDate !== "" && state.fromDate !== "") {
      let parsedDateFrom = moment(fromDate);
      let parsedDateTo = moment(toDate);
      let outputDateFrom = parsedDateFrom.format("YYYY-MM-DD");
      let outputDateTo = parsedDateTo.format("YYYY-MM-DD");
      setState({ ...state, 
        pageNumber: changePage,
        fromDate: outputDateFrom,  
        toDate: outputDateTo
       });
      ApplyFilters();
      listCheckHeader();
    }
  }, [state.toDate, state.fromDate, state.pageNumber, changePage, fromDate, toDate]);

  function listCheckHeader() {
    if (state.companyId !== "" && state.docTypeId !== "") {
      setShowProperty(false);
      setShowDetails(true);
    }
  }

  function listCheckProperty(dateChart: any) {
    const fomartChart = dateChart;
    if(fomartChart !== undefined){
      var parts = fomartChart.split("/", 2);
      var month = parts[0];
      var year = parts[1];
      const formatDateChr = `${year}-${month}`;
      setCheckProperty({
        ...checkProperty,
        fromDate: formatDateChr,
      });
      setShowProperty(true)
      setShowDetails(false);
    }
  }

  useEffect(() => {
    if (checkProperty.fromDate !== "") {
      setShowDetails(false);
      setShowProperty(true);
    }
  }, [checkProperty.fromDate, checkProperty.filters]);

  const handleBackButtonClick = () => {
    setChangePage(changePage - 1);
  };

  const handleNextButtonClick = () => {
    setChangePage(changePage + 1);
  };

  const refreshFunction = () => {
    setChangePage(1)
    setTotalPages(0)
  }

  const handleBack = () => {
    if(showDetails){
      navigate("/Dashboard", { replace: true });
    }else{
      listCheckHeader()
    }
    
  }

  useEffect(() => {
    if (fromDate !== undefined && toDate !== undefined) {
      refreshFunction()
    }
  }, [fromDate, toDate]);

  const series = [
    {
      name: "Inflation",
      data: burnDownChart.chartSeries, //[1, 2, 3, 4, 5, 6]
    },
  ];
  const options = {
    chart: {
      id: "simple-bar",
      events: {
        click: function (event: any, chartContext: any, config: any) {
          let dateChart = config.config.xaxis.categories[config.dataPointIndex];
          listCheckProperty(dateChart);
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      categories: burnDownChart.ChartCategories,
      position: "top", //["Jan", "Feb", "Mar", "Apr", "May"] will be displayed on the x-asis
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: any) {
          return val + "%";
        },
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return "$" + val;
      },
      offsetY: -20,
      style: {
        fontSize: "14px",
        colors: ["#4D4D4D"],
      },
    },
  };

  return (
    <div>
      {showDetails === true && (
        <FmTitle
          title={infoCardId.companyName}
          backPage={true}
          bp_name={"Check Header"}
          bp_link={() => handleBack()}
        />
      )}
      {showDetails === false && (
        <FmTitle
          title={infoCardId.companyName}
          backPage={true}
          bp_name={"Check Property"}
          bp_link={() => handleBack()}
        />
      )}

      <div className="fm_card fm_checkview d-flex flex-column">
        <div className="fm_cview_filters d-flex">
          <CssTextField
            className="fm_input col-4"
            label="Some item to search"
            name="search"
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  className="fa-xl fm_input--icon"
                  position="start"
                >
                  <div className="fm_input--icon">
                    <img src={SearchIcon} alt="" />
                  </div>
                </InputAdornment>
              ),
            }}
            onChange={HandleSearch}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="MM/yyyy"
              views={["month", "year"]}
              label="From"
              maxDate={new Date(dateNow)}
              value={fromDate}
              onChange={(newValue) => {
                handleChangeFrom(newValue);
              }}
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  className="fm_input col-2"
                  size="small"
                  variant="outlined"
                  helperText={null}
                  disabled={true}
                  sx={{
                    svg: {
                      nargin: "0",
                      padding: "0",
                      width: "24px",
                      height: "24px",
                      color: "#91969A",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="MM/yyyy"
              views={["month", "year"]}
              label="To"
              minDate={fromDate}
              maxDate={new Date(dateNow)}
              value={toDate}
              onChange={(newValue) => {
                HandleChangeTo(newValue);
              }}
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  className="fm_input col-2"
                  size="small"
                  variant="outlined"
                  helperText={null}
                  sx={{
                    svg: {
                      padding: "0",
                      width: "24px",
                      height: "24px",
                      color: "#91969A",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="fn_char_container">
          <div className="fm_char_buttons d-flex justify-content-end">
            <IconButton
              className="fm-button--link--icon fm_char_btn"
              onClick={() => handleBackButtonClick()}
              disabled={changePage === 1}
            >
              <FontAwesomeIcon icon={faCaretLeft} className="fa-xl" />
            </IconButton>
            <IconButton
              className="fm-button--link--icon fm_char_btn"
              onClick={() => handleNextButtonClick()}
              disabled={changePage >= totalPages}
            >
              <FontAwesomeIcon icon={faCaretRight} className="fa-xl" />
            </IconButton>
          </div>
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart
              options={options}
              type="bar"
              series={series}
              height={364}
            />
          </Box>
        </div>

        <div className="table">
          {showDetails && (
            <CheckHeaderComponent
              selection={state}
              companyName={infoCardId.companyName}
            />
          )}
        </div>
        <div className="table">
          {showProperty && <CheckPropertyComponent selection={checkProperty} />}
        </div>
      </div>
    </div>
  );
};

export default CheckViewComponent;

const CardMain = styled.div``;

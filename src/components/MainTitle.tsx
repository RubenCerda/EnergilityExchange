import CheckDollarIcon from "../assets/icons/money-check-dollar.svg";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
interface props {
  title: string | any;
  ownerNumber: number | string;
  backPage: boolean;
  bp_name: string | any;
  bp_link: any;
  icon: boolean;
  pdfbutton: boolean;
  pdflink: string | any;
}
const MainTitle = ({
  title,
  ownerNumber,
  backPage,
  bp_name,
  bp_link,
  icon,
  pdfbutton,
  pdflink,
}: props) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex fm_mainTitle align-items-center">
        {icon === true && (
          <div className="fm_mainTitle--icon d-flex">
            <img src={CheckDollarIcon} alt="" />
          </div>
        )}
        <div>
          {backPage === true && (            
          <div className="d-flex align-items-center">
            <IconButton size="small" onClick={bp_link}>
              <i className="fa-solid fa-chevron-left fa-sm"></i>
            </IconButton>
            <p>{bp_name}</p>
          </div>
          )}
          <h1>{title}</h1>
          <p className="orderNumber">{ownerNumber}</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        {pdfbutton === true && (
          <Button
            variant="outlined"
            size="large"
            className="fm-button--link--border"
            onClick={pdflink}
          >
            View PDF
          </Button>
        )}
      </div>
    </div>
  );
};

MainTitle.defaultProps = {
  title: "",
  ownerNumber: "",
  backPage: true,
  bp_link: "",
  bp_name: "Back",
  icon: false,
  pdfbutton: false,
  pdflink: "",
};

export default MainTitle;

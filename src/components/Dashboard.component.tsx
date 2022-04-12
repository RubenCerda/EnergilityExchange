import { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
  Grid,
  CardContent,
} from "@mui/material";
import styled from "styled-components";
import { useDashboard } from "../hooks";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import CheckDollarIcon from "../assets/icons/money-check-dollar.svg";
import FmTitle from "./MainTitle";

const account = {
  photoURL: "/static/CheckIcon.png",
};
const DashboardComponent = () => {
  const navigate = useNavigate();
  const { listAllDashboard } = useDashboard();

  function redirectCheckView(
    itemCompanyId: number,
    itemDocTypeId: number,
    itemcompanyName: string
  ) {
    navigate(
      `/CheckView/${itemCompanyId}/${itemDocTypeId}/${itemcompanyName}`,
      { replace: true }
    );
  }

  return (
    <div>
      <FmTitle title="Dashboard" backPage={(false)} />
      {/* Grid Aligment */}
      <div className="row gx-3 gy-3">
        {listAllDashboard.listDashboards.map((key: any, index: any) => {
          return (
            <div
              className="col-3 " /* Card Size */
              key={index}
              onClick={() =>
                redirectCheckView(key.id, key.docTypeId, key.companyName)
              }
            >
              <div className="d-flex flex-column flex-lg-wrap fm_homecard fm_card ">
                <div className="d-flex fm_homecard--head align-items-center">
                  <div className="fm_homecard--icon">
                    <img src={CheckDollarIcon} alt="" />
                  </div>
                  <div className="d-flex flex-column">
                    <p className="fm_homecard--font--18">{key.companyName}</p>
                    <p className="fm_homecard--font--14">{key.firstDay}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="col-auto">
                    <p className="fm_homecard--font--14">Total Amount</p>
                    <h1 className="fm_homecard--font--34">
                      ${key.totalAmount}
                    </h1>
                  </div>
                  <div className="fm_homecard--nChecks">
                    <p className="fm_homecard--font--16">{key.totalChecks}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardComponent;

const CardMain = styled.div``;
const CheckCard = styled.div``;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Box,
  Card,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
} from "@mui/material";
import { useCheckDetailByDocSys } from "../../hooks/useCheckDetail";
import { useParams } from "react-router-dom";
import moment from "moment";
import * as service from "../../flmngApi/checkViewService/services/checkHeader.service";
import FmTitle from "../MainTitle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";

const CheckDetailComponent = () => {
  const [showDetails, setShowDetails] = useState(false);
  const paramDocSys = useParams();
  const navigate = useNavigate();
  const { checkDetail } = useCheckDetailByDocSys(paramDocSys);
  let itemParsed = moment(checkDetail.listItems.documentDate);
  let itemDate = itemParsed.format("MM/DD/YYYY");

  const onPdf = async (docSystemNo: any) => {
    if (window.confirm("Are you sure to generate a pdf this record?")) {
      await service
        .getSavePDF(docSystemNo)
        .then((resp) => {
          const file = new Blob([resp], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          URL.revokeObjectURL(fileURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    routerIndex();
  });

  function routerIndex() {
    if (checkDetail.listItems.length !== 0) {
      setShowDetails(true);
    }
  }
  const handleBackCheckHeader = () => {
    navigate(
      `/CheckView/${paramDocSys.id}/${paramDocSys.docTypeId}/${paramDocSys.companyName}`,
      { replace: true }
    );
  };

  return (
    <div>
      
      <FmTitle
        title={checkDetail.listItems.bpName}
        ownerNumber={checkDetail.listItems.businessPartnerNo}
        icon={true}
        backPage={true}
        bp_link={() => handleBackCheckHeader()}
        bp_name={"Check Detail"}
        pdfbutton={true}
        pdflink={() => onPdf(checkDetail.listItems.docSystemNo)}
      />
      <div className="fm_cvD_tData d-flex justify-content-between">
        <div className="d-flex fm_cvD_tData__c">
          <div className="col-auto">
            <p>Check Date</p>
            <h3>{itemDate}</h3>
          </div>
          <div className="col-auto">
            <p>Check Number</p>
            <h3>{checkDetail.listItems.documentNo}</h3>
          </div>
        </div>
        <div className="d-flex fm_cvD_tData__c">
          <div className="col-auto fm_cvD_tData__c--green">
            <p>Gross</p>
            <h3>{checkDetail.listItems.grossValue}</h3>
          </div>
          <div className="col-auto fm_cvD_tData__c--red">
            <p>Tax</p>
            <h3>{checkDetail.listItems.taxValue}</h3>
          </div>
          <div className="col-auto fm_cvD_tData__c--red">
            <p>Deductions</p>
            <h3>{checkDetail.listItems.deductionValue}</h3>
          </div>
          <div className="col-auto">
            <p>Check Amount</p>
            <h3>{checkDetail.listItems.netValue}</h3>
          </div>
        </div>
      </div>

      <div className="fm_card">
        {showDetails && (
          <TableContainer>
            {/* Principal Names */}
            <Table className="fm_table">
              <TableHead className="fm_table--head">
                <TableRow>
                  <TableCell className="fm_tb_name col-1" />
                  <TableCell className="fm_tb_name col-2">
                    Property Number
                  </TableCell>
                  <TableCell className="fm_tb_name col-3">
                    Property Name
                  </TableCell>
                  <TableCell className="fm_tb_name col-1">State</TableCell>
                  <TableCell className="fm_tb_name col-1">County</TableCell>
                  <TableCell className="fm_tb_name col-2">Product</TableCell>
                  <TableCell className="fm_tb_name col-2">
                    Product Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkDetail.listItems.chHdrDetails.map(
                  (row: any, index: any) => (
                    <Row key={index} row={row} />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default CheckDetailComponent;

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        {/* Principal Cells */}
        <TableCell className="col-auto">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="col-auto"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="fm_tb_cell">{row.propertyNo}</TableCell>
        <TableCell className="fm_tb_cell">{row.propertyName1}</TableCell>
        <TableCell className="fm_tb_cell">{row.stateName}</TableCell>
        <TableCell className="fm_tb_cell">{row.countyName}</TableCell>
        <TableCell className="fm_tb_cell">{row.productCode}</TableCell>
        <TableCell className="fm_tb_cell">{row.productName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className="fm_subtable"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={13}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <SubRowNames />
                  {row.checkDetails.map((row: any, index: any) => (
                    <RowDetail key={index} row={row} colSpan={13} />
                  ))}
                  <RowTotalCheckDetail row={row} colSpan={13} />
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function RowTotalCheckDetail(props: any) {
  const { row } = props;
  console.log(row);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell className="fm_subtable--subcell--name" colSpan={2}>
          {row.propertyNo}
        </TableCell>
        <TableCell className="fm_subtable--subcell--name" colSpan={8}>
          {row.propertyName1}
        </TableCell>
        <TableCell className="fm_subtable--subcell--name">Total</TableCell>
        <TableCell className="fm_subtable--subcell--name">
          {row.checkDetailTotalVolume}
        </TableCell>
        <TableCell className="fm_subtable--subcell--name">
          {row.checkDetailTotalValue}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function SubRowNames() {
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell className="fm_subtable--subcell--name">SaleDate</TableCell>
        <TableCell className="fm_subtable--subcell--name">Int.</TableCell>
        <TableCell className="fm_subtable--subcell--name">Desc.</TableCell>
        <TableCell className="fm_subtable--subcell--name">Ded/Tax</TableCell>
        <TableCell className="fm_subtable--subcell--name">Desc.</TableCell>
        <TableCell className="fm_subtable--subcell--name">BTU</TableCell>
        <TableCell className="fm_subtable--subcell--name">Volume</TableCell>
        <TableCell className="fm_subtable--subcell--name">Price</TableCell>
        <TableCell className="fm_subtable--subcell--name">Value</TableCell>
        <TableCell className="fm_subtable--subcell--name">
          Disb Decimal
        </TableCell>
        <TableCell className="fm_subtable--subcell--name">NRI %</TableCell>
        <TableCell className="fm_subtable--subcell--name">Volume</TableCell>
        <TableCell className="fm_subtable--subcell--name">Value</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function RowDetail(props: any) {
  const { row } = props;

  return (
    <React.Fragment>
      {/* SubRow Cells */}
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell className="fm_subtable--subcell ">{row.saleDate}</TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.interestType}
        </TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.interestTypeDesc}
        </TableCell>
        <TableCell className="fm_subtable--subcell " />
        <TableCell className="fm_subtable--subcell " />
        <TableCell className="fm_subtable--subcell ">
          {row.heatingValue}
        </TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.grossVolume}
        </TableCell>
        <TableCell className="fm_subtable--subcell ">{row.price}</TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.grossValue}
        </TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.disbDecimal}
        </TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.nriDecimal}
        </TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.ownerVolume}
        </TableCell>
        <TableCell className="fm_subtable--subcell ">
          {row.ownerNetValue}
        </TableCell>
      </TableRow>
      {/* SubRow middle cells */}
      {row.deductions.map((detailsRow: any) => (
        <TableRow
          
          key={detailsRow.checkItemNo}
          sx={{ "& > *": { borderBottom: "none" } }}
        >
          <TableCell className="fm_subtable--subcell " colSpan={3} />
          <TableCell className="fm_subtable--subcell " colSpan={1}>
            {detailsRow.deductionType}
          </TableCell>
          <TableCell className="fm_subtable--subcell " colSpan={1}>
            {detailsRow.dedTypeDesc}
          </TableCell>
          <TableCell className="fm_subtable--subcell " colSpan={3} />
          <TableCell className="fm_subtable--subcell " colSpan={4}>
            {detailsRow.grossDedValue}
          </TableCell>
          <TableCell className="fm_subtable--subcell " colSpan={1}>
            {detailsRow.ownerDedValue}
          </TableCell>
        </TableRow>
      ))}
      {row.taxs.map((detailsRow: any) => (
        <TableRow
          key={detailsRow.checkItemNo}
          sx={{ "& > *": { borderBottom: "none" } }}
        >
          <TableCell className="fm_subtable--subcell " colSpan={3} />
          <TableCell className="fm_subtable--subcell " colSpan={1}>
            {detailsRow.taxType}
          </TableCell>
          <TableCell className="fm_subtable--subcell " colSpan={1}>
            {detailsRow.taxTypeDesc}
          </TableCell>
          <TableCell className="fm_subtable--subcell " colSpan={3} />
          <TableCell className="fm_subtable--subcell " colSpan={4}>
            {detailsRow.grossTaxValue}
          </TableCell>
          <TableCell className="fm_subtable--subcell " colSpan={1}>
            {detailsRow.ownerTaxValue}
          </TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  );
}

const CardMain = styled.div`
  padding-left: 100px;
  width: 1000px;
`;

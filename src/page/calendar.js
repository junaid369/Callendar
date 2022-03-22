import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import CalenderHeader from "../components/calenderHeader";
import DateComponent from "../components/dateContainer";
import * as actionCreators from "../store/actions/index";
import "./calendar.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import {
  CalenderDateDayContainerActive,
  CalenderDateDayContainerDisable,
  CalenderDateContainer,
  CalenderWeekDayContainer,
  CalenderWeekContainer,
  CalendarContainerBody,
  CalendarContainer,
} from "../styledComponent/index";
import { weekArray, gridArray } from "../constant/index";

import { useParams } from "react-router-dom";
import { height } from "@mui/system";

function Calendar() {
  const dispatch = useDispatch();

  const { year, month } = useParams();

  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { addAppointment } = bindActionCreators(actionCreators, dispatch);

  const startOfDay = moment()
    .year(selectedYear)
    .month(selectedMonth)
    .startOf("month")
    .format("ddd");
  const monthSize = parseInt(
    moment().year(selectedYear).month(selectedMonth).endOf("month").format("DD")
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 124,
  };

  function handleClick(e) {
    console.log(e.target.value, "hh");

    setOpen(true);
  }

  const startIndex = weekArray.indexOf(startOfDay);
  const endIndex = startIndex + monthSize;

  useEffect(() => {
    const defaultYear = year || moment().format("YYYY");
    const defaultMonth = month || moment().format("MM");

    setSelectedYear(parseInt(defaultYear));
    setSelectedMonth(parseInt(defaultMonth) - 1);
  }, [year, month]);

  const onYearSelect = (year) => {
    const { value } = year;
    setSelectedYear(parseInt(value));
  };

  const onMonthSelect = (month) => {
    const { value } = month;
    setSelectedMonth(parseInt(value - 1));
  };

  return (
    <>
      <CalendarContainer>
        <CalenderHeader
          onYearSelect={onYearSelect}
          onMonthSelect={onMonthSelect}
          defaultYear={selectedYear.toString()}
          defaultMonth={(selectedMonth + 1).toString()}
        />
        <CalendarContainerBody>
          <CalenderWeekContainer className="header">
            {weekArray.map((data, i) => (
              <CalenderWeekDayContainer key={i}>
                {data}
              </CalenderWeekDayContainer>
            ))}
          </CalenderWeekContainer>
          <CalenderDateContainer className="num">
            {gridArray.map((data, i) =>
              i >= startIndex && i < endIndex ? (
                <CalenderDateDayContainerActive 
                  key={i}
                  onClick={(event) => {
                    handleClick(event);
                    
                  }}
                >
                  <DateComponent className="in"
                 
                    date={i - startIndex + 1}
                    month={selectedMonth + 1}
                    year={selectedYear}
                  />
                </CalenderDateDayContainerActive>
              ) : (
                <CalenderDateDayContainerDisable  
                  key={i}
                ></CalenderDateDayContainerDisable>
              )
            )}
          </CalenderDateContainer>
        </CalendarContainerBody>
      </CalendarContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="card" style={{ height: "400px" }}>
            <h3 className="text-center">Events</h3>
          </div>
          <div className="item">
            <input
              className="field text-center"
              type="text"
              placeholder="new item"
            />
          </div>
          <div className="addb">
            <Button variant="contained" className="add">
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Calendar;

import React, {useEffect, useState} from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import { isEqual } from "lodash-es";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const Calendar = ({ onDatesChange, isOutsideRange, start, end }) =>
{
  const [date,setDate] = useState({
    startDate: start,
    endDate: end
  });
  const [focusedInput,setFocusedInput] = useState(null);

  useEffect(() =>
  {
    if (start && end)
    {
      if (!isEqual(date.startDate, start) || !isEqual(date.endDate, end) )
      {
        setDate({
          startDate: start,
          endDate: end
        });
      }
    }
  },[date,start,end]);

  const onRangeFocusChange = (focusedInput) =>
  {
    setFocusedInput(focusedInput);
  };

  const renderMonthElement = ({ month }) =>
  {
    return (
        <strong>
          {moment(month).format("MMMM YYYY")}
        </strong>
    );
  };

  const datesChangeHandler = ({ startDate, endDate }) =>
  {
    setDate({startDate, endDate})

    if (startDate !== null && endDate !== null)
    {
      onDatesChange({ startDate: startDate.startOf("day"), endDate: endDate.endOf("day") });
    }
  };


  return(
        <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={date.startDate}
            endDate={date.endDate}
            daySize={26}
            displayFormat="DD/MM/YYYY"
            showDefaultInputIcon={true}
            isOutsideRange={isOutsideRange}
            anchorDirection="right"
            onDatesChange={datesChangeHandler}
            focusedInput={focusedInput}
            onFocusChange={onRangeFocusChange}
            hideKeyboardShortcutsPanel={true}
            renderMonthElement={renderMonthElement}
        />
  );
};

export default Calendar;

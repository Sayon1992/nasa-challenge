import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ParseableDate } from "@mui/lab/internal/pickers/constants/prop-types";
import { TextField } from "@mui/material";
import enLocale from "date-fns/locale/en-CA";
import React from "react";

interface CustomPickerProps {
  value: ParseableDate<Date>;
  handleChange: (
    date: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
  label: string;
  id?: string;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  handleChange,
  value,
  label,
  id,
}: CustomPickerProps) => {
  return (
    <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField id={id} {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomPicker;

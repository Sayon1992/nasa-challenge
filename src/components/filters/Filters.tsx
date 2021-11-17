import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CustomPicker from "components/datePicker/CustomPicker";
import Selector from "components/selector/Selector";
import { Options } from "core/entities/Options";
import React, { ChangeEvent } from "react";

interface FiltersProps {
  handleChangeEarth: (date: Date | null) => void;
  earthDate: Date | null;
  solDateValue: string | undefined;
  handleChangeSol: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  options: Options;
  handleSelector: (e: SelectChangeEvent<string>) => void;
  handleShowFavorites: () => void;
}

const Filters = ({
  handleChangeEarth,
  earthDate,
  solDateValue,
  handleChangeSol,
  options,
  handleSelector,
  handleShowFavorites,
}: FiltersProps) => {
  return (
    <Box mt="5%" display="flex" justifyContent="space-evenly">
      <CustomPicker
        handleChange={handleChangeEarth}
        label="Earth Date"
        value={earthDate}
        id="earthPicker"
      />
      <TextField
        data-cy="solPicker"
        value={solDateValue}
        onChange={handleChangeSol}
        label="Sol Date"
      />
      <Selector options={options} handleChange={handleSelector} />
      <Button onClick={handleShowFavorites}>Add to favorites</Button>
    </Box>
  );
};

export default Filters;

import React from "react";
import { Options } from "core/entities/Options";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSelectorStyles } from "./SelectorStyles";

interface SelectorProps {
  options: Options;
  handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void;
}

const Selector: React.FC<SelectorProps> = ({
  options = [],
  handleChange,
}: SelectorProps) => {
  const classes = useSelectorStyles();
  return (
    <div>
      <Select
        className={classes.root}
        onChange={handleChange}
        defaultValue={options[0].value}
        label="Camera"
        inputProps={{ "data-testid": "selector" }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Selector;

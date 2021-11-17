import { Tab, Tabs } from "@mui/material";
import React from "react";
import { OptionsHelper } from "utils/cameraOptions";

interface RoverTabsProps {
  tabValue: string;
  handleTab: (
    _e: React.SyntheticEvent<Element, Event>,
    value: keyof OptionsHelper
  ) => void;
}

const RoverTabs = ({ handleTab, tabValue }: RoverTabsProps) => {
  return (
    <Tabs centered value={tabValue} onChange={handleTab}>
      <Tab label="Curiosity" value="curiosity" />
      <Tab label="Opportunity" value="opportunity" />
      <Tab label="Spirit" value="spirit" />
    </Tabs>
  );
};

export default RoverTabs;

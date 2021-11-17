import { Options } from "core/entities/Options";

export interface OptionsHelper {
  curiosity: Options;
  opportunity: Options;
  spirit: Options;
}

export const optionsHelper: OptionsHelper = {
  curiosity: [
    {
      label: "FHAZ",
      value: "fhaz",
    },
    {
      label: "RHAZ",
      value: "rhaz",
    },
    {
      label: "MAST",
      value: "mast",
    },
    {
      label: "CHEMCAM",
      value: "chemcam",
    },
    {
      label: "MAHLI",
      value: "mahli",
    },
    {
      label: "MARDI",
      value: "mardi",
    },
    {
      label: "NAVCAM",
      value: "navcam",
    },
  ],
  opportunity: [
    {
      label: "FHAZ",
      value: "fhaz",
    },
    {
      label: "RHAZ",
      value: "rhaz",
    },
    {
      label: "NAVCAM",
      value: "navcam",
    },
    {
      label: "PANCAM",
      value: "pancam",
    },
    {
      label: "MINITES",
      value: "minites",
    },
  ],
  spirit: [
    {
      label: "FHAZ",
      value: "fhaz",
    },
    {
      label: "RHAZ",
      value: "rhaz",
    },
    {
      label: "NAVCAM",
      value: "navcam",
    },
    {
      label: "PANCAM",
      value: "pancam",
    },
    {
      label: "MINITES",
      value: "minites",
    },
  ],
};

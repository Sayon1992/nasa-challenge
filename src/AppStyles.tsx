import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: "3rem !important",
  },
  gridContainer: {
    marginTop: "4% !important",
  },
  fab: {
    position: "fixed !important" as "absolute",
    left: "90%",
    bottom: "10%",
  },
});

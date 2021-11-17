import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface FavoriteDialogProps {
  showDialog: boolean;
  addFavorite: (name: string) => void;
  handleClose: () => void;
}

const FavoriteDialog: React.FC<FavoriteDialogProps> = ({
  addFavorite,
  showDialog,
  handleClose,
}: FavoriteDialogProps) => {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Dialog open={showDialog} onClose={handleClose}>
      <DialogTitle>Add a name to your favorite</DialogTitle>
      <DialogContent dividers>
        <TextField value={value} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => addFavorite(value)}>Add to Favorites</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FavoriteDialog;

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Favorite } from "core/entities/Favorite";
import useAlertRef from "hooks/useAlertRef";
import React, {
  ComponentType,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  CSSProperties,
  SetStateAction,
  Dispatch,
} from "react";
import { useFavoritesStyles } from "./FavoritesStyles";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { RoverPhoto } from "core/entities/RoverPhoto";
import { api } from "api/nasaAPI";

interface FavoritesProps {
  favorites: Favorite[];
  handleClose: () => void;
  setPhotos: Dispatch<SetStateAction<RoverPhoto[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const Favorites = ({
  favorites = [],
  handleClose,
  setPhotos,
  setLoading,
}: FavoritesProps) => {
  const favoritesRef = useRef<HTMLDivElement | null>(null);
  useAlertRef(favoritesRef, handleClose);

  const classes = useFavoritesStyles();

  const getPhotosFavorite = async (
    date: Favorite["date"],
    rover: string,
    camera: string
  ) => {
    setLoading(true);
    const response = await api.get(
      `/mars-photos/api/v1/rovers/${rover}/photos`,
      {
        params: {
          page: 1,
          camera,
          ...date,
        },
      }
    );
    setPhotos(response.data.photos);
    setLoading(false);
    handleClose();
  };

  const renderList = (props: {
    index: number;
    style: CSSProperties | undefined;
  }) => {
    return (
      <ListItemButton
        /*eslint-disable-next-line react/prop-types*/
        style={props.style}
        /*eslint-disable-next-line react/prop-types*/
        key={favorites[props.index].id}
        onClick={() => {
          getPhotosFavorite(
            /*eslint-disable-next-line react/prop-types*/
            favorites[props.index].date,
            /*eslint-disable-next-line react/prop-types*/
            favorites[props.index].rover,
            /*eslint-disable-next-line react/prop-types*/
            favorites[props.index].camera
          );
        }}
      >
        {/*eslint-disable-next-line react/prop-types*/}
        <ListItemText primary={favorites[props.index].name} />
      </ListItemButton>
    );
  };

  return (
    <Paper className={classes.container} ref={favoritesRef} elevation={8}>
      <FixedSizeList
        height={330}
        width={270}
        itemSize={30}
        itemCount={favorites.length}
      >
        {
          useMemo(() => renderList, [favorites]) as ComponentType<
            ListChildComponentProps<any>
          > &
            ReactNode
        }
      </FixedSizeList>
    </Paper>
  );
};

export default Favorites;

import {
  Collapse,
  Container,
  Fab,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { api } from "api/nasaAPI";
import { useStyles } from "./AppStyles";
import { RoverPhoto } from "core/entities/RoverPhoto";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PhotoCard from "components/photoCard/PhotoCard";
import { Options } from "core/entities/Options";
import { OptionsHelper, optionsHelper } from "utils/cameraOptions";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { db } from "api/firebase/firebaseAPI";
import { Favorite } from "core/entities/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteDialog from "components/favoriteDialog/FavoriteDialog";
import RoverTabs from "components/roverTabs/RoverTabs";
import Filters from "components/filters/Filters";
import Favorites from "components/favorites/Favorites";
import { v4 as uuidv4 } from "uuid";

let timer: NodeJS.Timeout;
let camera = "fhaz";

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState("curiosity");
  const [earthDate, setEarthDate] = useState<Date | null>(new Date());
  const [solDateValue, setSolDateValue] = useState<string | undefined>();
  const [solDate, setSolDate] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>(optionsHelper.curiosity);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<RoverPhoto[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const lastItem = useRef<IntersectionObserver>();

  const classes = useStyles();

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Favorite;
      setFavorites((prev) => [...prev, data]);
    });
  };

  const lastItemRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (loading) return;
      if (lastItem.current) lastItem.current.disconnect();
      lastItem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (photos.length) setPage((prev) => prev + 1);
          getPhotos(
            earthDate
              ? { earth_date: earthDate.toLocaleString("en-CA") }
              : { sol: solDate },
            true
          );
        }
      });
      ref && lastItem.current.observe(ref);
    },
    [loading]
  );

  const handleTab = (
    _e: React.SyntheticEvent<Element, Event>,
    value: keyof OptionsHelper
  ) => {
    setTabValue(value);
    setOptions(optionsHelper[value]);
  };

  const getPhotos = async (date: Favorite["date"], scroll = false) => {
    setLoading(true);
    const response = await api.get(
      `/mars-photos/api/v1/rovers/${tabValue}/photos`,
      {
        params: {
          page: scroll ? page : 1,
          camera,
          ...date,
        },
      }
    );
    if (scroll) {
      setPhotos((prev) => [...prev, ...response.data.photos]);
    } else {
      setPhotos(response.data.photos);
    }
    setLoading(false);
  };

  const handleSelector = (e: SelectChangeEvent<string>) => {
    camera = e.target.value;
    setPage(1);
    getPhotos(
      earthDate
        ? { earth_date: earthDate.toLocaleDateString("en-CA") }
        : { sol: solDate }
    );
  };

  const handleChangeEarth = (date: Date | null) => {
    setSolDate(undefined);
    setPage(1);
    setEarthDate(date);
    getPhotos({ earth_date: date?.toLocaleDateString("en-CA") });
  };

  const handleChangeSol = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSolDateValue(e.target.value);
    e.persist();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSolDate(e.target.value);
      setPage(1);
      setEarthDate(null);
      getPhotos({ sol: e.target.value });
    }, 300);
  };

  const addFavorite = async (name: string) => {
    try {
      await addDoc(collection(db, "favorites"), {
        id: uuidv4(),
        name,
        camera,
        date: earthDate
          ? { earth_date: earthDate.toLocaleDateString("en-CA") }
          : { sol: solDate },
        rover: tabValue,
      });
      getData();
      handleCloseDialog();
    } catch (e) {
      console.error(e);
    }
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleShowFavorites = (show: boolean) => {
    setShowFavorites(show);
  };

  useEffect(() => {
    setPage(1);
    getPhotos(
      earthDate
        ? { earth_date: earthDate.toLocaleDateString("en-CA") }
        : { sol: solDate }
    );
  }, [tabValue]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Typography classes={{ root: classes.title }} data-cy="title">
        Mars Rover Photos
      </Typography>
      <RoverTabs handleTab={handleTab} tabValue={tabValue} />
      <Filters
        earthDate={earthDate}
        handleChangeEarth={handleChangeEarth}
        handleChangeSol={handleChangeSol}
        handleSelector={handleSelector}
        handleShowFavorites={handleShowDialog}
        options={options}
        solDateValue={solDateValue}
      />
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          spacing={5}
          data-cy="photos-container"
          container
        >
          {photos.map((photo, index) => (
            <Grid
              ref={index + 1 === photos.length ? lastItemRef : null}
              key={photo.id}
              item
              md={3}
            >
              <PhotoCard photo={photo} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <FavoriteDialog
        addFavorite={addFavorite}
        handleClose={handleCloseDialog}
        showDialog={showDialog}
      />
      {showFavorites && (
        <Favorites
          handleClose={() => handleShowFavorites(false)}
          favorites={favorites}
          setPhotos={setPhotos}
          setLoading={setLoading}
        />
      )}

      <Fab
        onClick={() => handleShowFavorites(!showDialog)}
        color="primary"
        aria-label="add"
        className={classes.fab}
      >
        <BookmarkIcon />
      </Fab>
    </div>
  );
};

export default App;

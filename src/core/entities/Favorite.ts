export type Favorite = {
  id: string;
  name: string;
  date: { earth_date: string | undefined } | { sol: string | undefined };
  camera: string;
  rover: string;
};

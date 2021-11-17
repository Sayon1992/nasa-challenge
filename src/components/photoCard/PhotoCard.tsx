import { Card, CardMedia } from "@mui/material";
import { RoverPhoto } from "core/entities/RoverPhoto";
import React from "react";

interface PhotoCardProps {
  photo: RoverPhoto;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }: PhotoCardProps) => {
  return (
    <Card>
      <CardMedia
        data-testid="cardMedia"
        component="img"
        height="194"
        image={photo.img_src}
      />
    </Card>
  );
};

export default PhotoCard;

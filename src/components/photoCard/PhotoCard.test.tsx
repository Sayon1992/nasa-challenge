import { render, screen } from "@testing-library/react";
import PhotoCard from "./PhotoCard";
import photo from "../../../cypress/fixtures/curiosityPhotos.json";

describe("Photo Card", () => {
  test("should have value image on card media", () => {
    render(<PhotoCard photo={photo.photos[0]} />);
    const myPhoto = screen.getByTestId("cardMedia");
    expect(myPhoto).toHaveProperty("src", photo.photos[0].img_src);
  });
});

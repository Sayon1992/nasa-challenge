import { api } from "./nasaAPI";

describe("Nasa Api Test", () => {
  test("should get mars rover info", async () => {
    const response = await api.get("mars-photos/api/v1/rovers/curiosity/");
    expect(response.data.rover).toBeTruthy();
  });
});

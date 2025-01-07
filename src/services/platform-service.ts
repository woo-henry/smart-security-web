import Axios from "axios";

export function FindPlatforms(): Promise<Service.Response> {
  return Axios.post("/api/platforms/find-platforms");
}

export function SavePlatforms(platforms: Array<any>): Promise<Service.Response> {
  const request = {
    platforms: platforms
  };
  return Axios.post("/api/platforms/save-platforms", request);
}

export function DeletePlatforms(platform_ids: Array<string>): Promise<Service.Response> {
  const request = {
    platform_ids: platform_ids
  };
  return Axios.post("/api/platforms/delete-platforms", request);
}

import Axios from "axios";

export function FindAllDevices(): Promise<Service.Response> {
  return Axios.post("/api/devices/find-all-devices");
}

export function FindDevices(group_id: string): Promise<Service.Response> {
  const request = {
    group_id: group_id
  }
  return Axios.post("/api/devices/find-devices", request);
}

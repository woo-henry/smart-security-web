import Axios from "axios";
import { Group } from "./group-types";

export function FindGroups(group_type: number): Promise<Service.Response> {
  const request = {
    group_type: group_type
  }
  return Axios.post("/api/groups/find-groups", request);
}

export function SaveGroups(groups: Array<Group>): Promise<Service.Response> {
  const request = {
    groups: groups
  };
  return Axios.post("/api/groups/save-groups", request);
}

export function DeleteGroups(group_ids: Array<string>): Promise<Service.Response> {
  const request = {
    group_ids: group_ids
  };
  return Axios.post("/api/groups/delete-groups", request);
}

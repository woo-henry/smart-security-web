import Axios from "axios";
import { Tag } from "./tag-types";

export function FindTags(): Promise<Service.Response> {
  return Axios.post("/api/tags/find-tags");
}

export function FindGroupTags(group_id: string): Promise<Service.Response> {
  const request = {
    group_id: group_id
  }
  return Axios.post("/api/tags/find-group-tags", request);
}

export function SaveTags(tags: Array<Tag>): Promise<Service.Response> {
  const request = {
    tags: tags
  };
  return Axios.post("/api/tags/save-tags", request);
}

export function DeleteTags(tag_ids: Array<string>): Promise<Service.Response> {
  const request = {
    tag_ids: tag_ids
  };
  return Axios.post("/api/tags/delete-tags", request);
}

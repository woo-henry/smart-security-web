import Axios from "axios";

export function FindUser(user_name: string, password: string): Promise<Service.Response> {
  const request = {
    user_name: user_name,
    password: password
  };
  return Axios.post("/api/users/find-user", request);
}

export function DeleteUsers(user_ids: Array<string>): Promise<Service.Response> {
  const request = {
    user_ids: user_ids
  };
  return Axios.post("/api/users/delete-users", request);
}

export function UpdateUser(user_id: string, old_password: string, new_password: string): Promise<Service.Response> {
  const request = {
    user_id: user_id,
    old_password: old_password,
    new_password: new_password
  };
  return Axios.post("/api/users/update-user", request);
}

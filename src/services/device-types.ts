export interface Device {
  object_id: string;
  device_id: string;
  device_name: string | null;
  device_model: string | null;
  ip_address_v4: string | null;
  ip_address_v6: string | null;
  port: number | null;
  longtitude: number | null;
  latitude: number | null;
  place_code: string | null;
  place: string | null;
  org_code: string | null;
  is_online: boolean | null;
  sort_key: number | null;
  created_time?: Date | null;
  index: number | null;
  selected: boolean | null;
}

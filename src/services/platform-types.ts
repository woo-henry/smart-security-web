export interface Platform {
  object_id: string;
  platform_name: string | null;
  platform_address: string | null;
  platform_port: number | null;
  platform_account: string | null;
  platform_password: string | null;
  enabled: boolean;
  sort_key: number | null;
  created_time?: Date | null;
  index: number | null;
  selected: boolean | null;
}

export interface Tag {
  object_id: string;
  tag_name: string | null;
  tag_remark: number | null;
  sort_key: number | null;
  created_time?: Date | null;
  index: number | null;
  selected: boolean | null;
}

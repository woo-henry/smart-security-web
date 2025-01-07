export enum GroupType {
  TYPE_DEVICE = 1,
  TYPE_SYSTEM = 2,
  TYPE_TAG = 3,
}

export interface Group {
  object_id: string;
  group_name: string | null;
  group_type: GroupType | null;
  sort_key: number | null;
}

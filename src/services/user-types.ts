export enum UserType {
  TYPE_USER_NORMAL = 0,
  TYPE_USER_ADMIN = 1,
}

export interface User {
  object_id: string;
  user_name: string;
  user_type: UserType;
  phone_number: number;
  avatar: string;
  created_time: Date;
}

export interface Order {
  object_id: string | null;
  user_id: string;
  order_no: string | null;
  order_subject: string;
  order_type: number;
  order_time: string;
  order_money: number;
  pay_type: number;
  text_value: number;
  image_value: number;
  video_value: number;
  order_status: number;
}

export interface OrderPayment {
  user_id: string,
  order_no: string,
  order_subject: string,
  order_type: number,
  order_money: number,
  pay_type: number,
  // transation_id: number | null,
}

export interface UserAlbum {
  user_id: string,
  object_id: string | null,
  source: number,
  prompt: string,
  picture: string,
}

export interface UserConsume {
  user_id: string,
  object_id: string | null,
  consume_id: number | null,
  consume_type: number,
  consume_value: number,
  consume_time: string,
  consume_remark: number,
}

export interface UserCapacity {
  user_id: string,
  object_id: string | null,
  general_model_type: 0,
  general_model_value: 0,
  general_model_expiration: '',
  text_type: number,
  text_value: number,
  text_expiration: string,
  image_type: number,
  image_value: number,
  image_expiration: string,
  video_type: number,
  video_value: number,
  video_expiration: string,
}

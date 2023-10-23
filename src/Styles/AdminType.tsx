import { type } from "os";

export type TypeOptionSalary = {
  ht_luong: number | undefined;
  luong: number | undefined;
  luong_fist: number | undefined;
  luong_end: number | undefined;
};

export type TypeAdminWorkShifts = {
  day: number[];
  ca_fist: string;
  ca_last: string;
};
export type TypeAdminTag = {
  jc_parent: number;
  jc_name: string;
};
export type TypeAdminSearchTag = {
  jc_id: number | undefined;
  jc_name: string | undefined ;
};

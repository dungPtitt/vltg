import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import moment from "moment";
import dayjs from "dayjs";
export const ngayHomNay = () => {
  const date = new Date();
  return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} / ${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  } / ${date.getFullYear()}`;
};

export const convertTimeStamp = (value: any) => {
  const time = new Date(value);

  return Math.floor(time.getTime() / 1000);
};

export const convertTimeHM = (e: any) => {
  if (e.split(":").length == 2) {
    console.log("convertTimeHM-----:-----", e);
    return e;
  }
  if (e.split("-").length == 2) {
    console.log("convertTimeHM----------", e);

    return e.replace("-", ":");
  }
  const time = new Date(e);
  console.log("convertTimeHM----------", e, "---------------", time);
  return `${time.getHours()}:${time.getMinutes()}`;
};
export const convertAllTimeToHM = (times: string) => {
  let result: any = times;
  if (result.split("-").length > 2) {
    const timeConvert = result.split("-");
    timeConvert[0] = timeConvert[0] + ":";
    timeConvert[1] = timeConvert[1] + " - ";
    timeConvert[2] = timeConvert[2] + ":";
    result = timeConvert.join("");
  }
  if (times.length > 20) {
    const time = times.split("-");
    result = `${convertTimeHM(time[0])}-${convertTimeHM(time[1])}`;
  }
  return result;
};
export const convertDateYMD = (value: any) => {
  let convert = "";
  const time = new Date(value);
  convert = `${time.getFullYear()}-${
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
  }-${time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}`;
  return convert;
};

export const convertDateYMDcheo = (value: any) => {
  let convert = "";
  const time = new Date(value);
  convert = `${time.getFullYear()}/${
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
  }/${time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}`;
  return convert;
};

export const convertDateDMY = (value: any) => {
  let convert = "";
  const time = new Date(value);
  convert = `${time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}-${
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
  }-${time.getFullYear()}`;
  return convert;
};

export const convertDateDMYcheo = (value: any) => {
  let convert = "";
  const time = new Date(value);
  convert = `${time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}/${
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
  }/${time.getFullYear()}`;
  return convert;
};

export const convertTimestampToDatePicker = (times: any) => {
  const time = new Date(times);
  const momentObj = moment.unix(time.getTime() / 1000);
  const value = dayjs(momentObj.format("YYYY-MM-DD"));
  return value; // Trả về đối tượng moment
};

export const notifyWarning = (notification: string) => {
  return toast.warning(notification, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const notifySuccess = (notification: string) => {
  return toast.success(notification, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const notifyError = (notification: string) => {
  return toast.error(notification, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const ExcelDownload = (data: any, name: string) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const blob = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([blob], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(excelBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
};

export const toLowerCaseNonAccentVietnamese = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};
export const decodeUnicodeString = (encodedString: string) => {
  // Sử dụng decodeURIComponent để giải mã chuỗi URL
  const decodedString = decodeURIComponent(encodedString);

  // Trả về chuỗi đã giải mã
  return decodedString;
};
export const convertNameToSlug = (name: any) => {
  return toLowerCaseNonAccentVietnamese(name)
    .replace(" -", "")
    .replaceAll(" ", "-");
};
export const convertNameToQuery = (query: string) => {
  return query.replaceAll(" ", "+");
};

type Image = {
  src: string;
  alt: string;
};
export const handleImageError = (e: any) => {
  e.currentTarget.src = "/images/no-avartar-user.png"; // Đường dẫn của ảnh mặc định
  e.currentTarget.alt = "avatar";
};

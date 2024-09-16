import styles from "@/Css/uvProfile.module.css";
import { axiosSauDN, deleteToken } from "@/utils/axios.config";
import { notifyError, notifySuccess } from "@/utils/generalFunction";
import { Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
function UvHeader() {
  const router = useRouter();
  const [duLieuNguoiDung, setDuLieuNguoiDung] = useState<any>();
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
    axiosSauDN
      .post("/manageAccountCandidate/getInfoCandidate")
      .then((res) => {
        setDuLieuNguoiDung({ ...res.data.data.data });
      })
      .catch((res) => deleteToken());
  }, []);
  const trangThaiSearch = (e: boolean) => {
    axiosSauDN
      .post("/manageAccountCandidate/updateStatusSearch", {
        status: e ? 1 : 0,
      })
      .then((res) =>
        notifySuccess(
          e
            ? "Đã bật tính năng cho phép NTD tìm kiếm!"
            : "Đã tắt tính năng cho phép NTD tìm kiếm!"
        )
      )
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  return (
    <div className={styles.uv_header}>
      <div>
        Cho phép NTD tìm kiếm:{" "}
        <Switch onChange={(e) => trangThaiSearch(e)} defaultChecked />
      </div>
      <div className={styles.uv_header_rg}>
        <Link href="/" className="cursor-pointer">
          {" "}
          Trang chủ
        </Link>
        <a
          target="blank"
          className="cursor-pointer"
          href="https://timviec365.vn/cv-xin-viec"
        >
          {" "}
          CV xin việc
        </a>
        <a target="blank" href="https://timviec365.vn/cau-hoi-tuyen-dung">
          {" "}
          Câu hỏi tuyển dụng
        </a>
        <Link
          href={`/viec-lam-theo-gio-moi-nhat.html`}
          className="cursor-pointer"
        >
          {" "}
          Việc làm
        </Link>
        <a
          target="blank"
          href="https://timviec365.vn/ssl/so-sanh-luong.html"
          className="cursor-pointer"
        >
          Tra cứu lương
        </a>
        <div>
          <img className="text-black" src="/images/bell.svg" alt="" />
        </div>
        <div>
          <img
            className="w-11 mr-3"
            src={
              duLieuNguoiDung?.linkAvatar
                ? duLieuNguoiDung.linkAvatar
                : "/images/no-avartar-user.png"
            }
            alt=""
          />
        </div>
        <div>{duLieuNguoiDung?.userName}</div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default UvHeader;

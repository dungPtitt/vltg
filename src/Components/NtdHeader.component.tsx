import styles from "@/Css/uvProfile.module.css";
import { axiosSauDN, deleteToken } from "@/utils/axios.config";
import { notifyError } from "@/utils/generalFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function NtdHeader() {
  const [dataNTD, setDataNTD] = useState<any>();
  const router = useRouter();
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCompany/getInfoCompany")
      .then((res) => setDataNTD(res.data.data.data))
      .catch(() => {
        // deleteToken();
        notifyError("Vui lòng đăng nhập!");
        // setTimeout(() => {
        //   router.push("/");
        // }, 2000);
      });
  }, []);
  return (
    <div className="flex justify-end mt-2">
      <div className={styles.uv_header_rg}>
        <div className="cursor-pointer">
          {" "}
          <Link href="/">Trang chủ</Link>
        </div>
        <a
          href="https://timviec365.vn/bang-gia-dich-vu.html"
          target="blank"
          className="cursor-pointer"
        >
          {" "}
          Bảng giá
        </a>
        <div className="cursor-pointer"> Đăng tin</div>
        <Link href={`/danh-sach-ung-vien`} className="cursor-pointer">
          {" "}
          Tìm kiếm ứng viên
        </Link>
        <a
          className="cursor-pointer"
          target="blank"
          href="https://timviec365.vn/mail365/"
        >
          Email
        </a>
        <div>
          <img className="text-black" src="/images/bell.svg" alt="" />
        </div>
        <div>
          <img className="w-11 mr-3" src={dataNTD?.linkAvatar} alt="" />
        </div>
        <div>{dataNTD?.userName}</div>
      </div>
    </div>
  );
}

export default NtdHeader;

import styles from "@/Css/uvProfile.module.css";
import { axiosSauDN, deleteToken } from "@/utils/axios.config";
import { notifyError } from "@/utils/generalFunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function NtdHeader() {
  const [dataNTD, setDataNTD] = useState<any>();
  const router = useRouter();
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
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          {" "}
          Trang chủ
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
        <div
          className="cursor-pointer"
          onClick={() => router.push("/danh-sach-ung-vien")}
        >
          {" "}
          Tìm kiếm ứng viên
        </div>
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

"use client";
import Cookies from "js-cookie";
import Footer from "@/Components/Footer.component";
import SearchJob from "@/Components/SearchJob.component";
import styles from "@/Css/jobDetail.module.css";
import btnStyles from "@/Css/button.module.css";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/Layout/Header.layout";
import { useEffect, useState } from "react";
import { axiosSauDN, axiosTruocDN, checkToken } from "@/utils/axios.config";
import { differenceInDays } from "date-fns";
import {
  renderLiteracy,
  dayOfTheWeek,
  renderPayrollMethods,
  renderSchedules,
  renderPosition,
  renderProfession,
  tagCv,
} from "@/constants/EditProfile.constant";
import { Modal, Radio } from "antd";
import JobCard from "@/Components/JobCard.component";
import { ToastContainer } from "react-toastify";
import {
  convertAllTimeToHM,
  convertDateDMY,
  convertNameToSlug,
  convertTimeHM,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import Image from "next/image";
import Loading from "@/Components/Loading";
import { HeadJobDetai } from "@/constants/Head.constant";
import axios from "axios";
import Link from "next/link";

function ChiTietCViec({ id }: any) {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState({ account: "", password: "" });
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalUngTuyen, setOpenModalUngTuyen] = useState(false);
  const [chiTietViecLam, setChiTietViecLam] = useState<any>({});
  const [viecLamTuongTu, setViecLamTuongTu] = useState<any>([]);
  const [viecLamKhac, setViecLamKhac] = useState<any>([]);
  const [showSDT, setShowSDT] = useState(false);
  const [arrCaUngTuyen, setArrCaUngTuyen] = useState<any>([]);
  const [caUngTuyen, setCaUngtuyen] = useState<any>([]);
  const [chonCaLam, setChonCalam] = useState();
  const [chiTietCaLam, setChiTietCaLam] = useState<any>({});
  const [indexCaLam, setIndexChonCalam] = useState(0);
  const [fullPath, setFullPath] = useState<any>("");
  const pathname = usePathname();
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
    try {
      if (checkToken()) {
        axiosSauDN
          .post("/viecLam/chiTietViecLamSauDN", { id_vieclam: id })
          .then((res) => {
            console.log("res sau::", res);
            setChiTietViecLam({ ...res.data.data.data[0] }),
              setViecLamTuongTu([...res.data.data.data[0].viecLamTuongTu]);
            setViecLamKhac([...res.data.data.data[0].viecLamKhac]);
            setChonCalam(
              res.data.data.data[0].CaLamViec.sort(
                (a: any, b: any) => a.ca_id - b.ca_id
              )[0].ca_id
            );
            setChiTietCaLam({
              ...res.data.data.data[0].CaLamViec.sort(
                (a: any, b: any) => a.ca_id - b.ca_id
              )[0],
            });
          });
      } else {
        axiosTruocDN
          .post("/viecLam/chiTietViecLamTruocDN", { id_vieclam: id })
          .then((res) => {
            console.log("res trc::", res);
            setChiTietViecLam({ ...res.data.data.data[0] }),
              setViecLamTuongTu([...res.data.data.data[0].viecLamTuongTu]);
            setViecLamKhac([...res.data.data.data[0].viecLamKhac]);
          });
      }
    } catch (error) {
      console.log("Lỗi useEffect chi tiet viec lam", error);
    }
  }, []);

  const nhanViecLam = () => {
    try {
      if (arrCaUngTuyen.length == 0) {
        notifyWarning("Vui lòng chọn ca làm trước khi gửi yêu cầu!");
      } else {
        axiosSauDN
          .post("/manageAccountCandidate/nhanViec", {
            id_viec: id,
            list_ca: arrCaUngTuyen,
          })
          .then((res) => {
            setOpenModalUngTuyen(false);
            setChiTietViecLam({ ...chiTietViecLam, nhanViec: true });
            notifySuccess("Gửi yêu cầu thành công!");
          });
      }
    } catch (error) {
      console.log("nhanvieclam", error);
      notifyError("Vui lòng thử lại sau!");
    }
  };
  const luuViecLam = () => {
    try {
      checkToken()
        ? axiosSauDN
            .post("/manageAccountCandidate/luuViecLam", { id_viec: id })
            .then((res) => {
              chiTietViecLam.luuViec
                ? notifySuccess("Hủy lưu việc thành công!")
                : notifySuccess("Lưu việc thành công!");
              setChiTietViecLam({
                ...chiTietViecLam,
                luuViec: !chiTietViecLam.luuViec,
              });
            })
        : setOpenModalLogin(true);
    } catch (error) {
      console.log("first", error);
      notifyError("Đã có lỗi xảy ra vui lòng thử lại sau!!!");
    }
  };
  const handleChonCaLam = (e: any) => {
    setChonCalam(e.target.value);
    setIndexChonCalam(
      chiTietViecLam.CaLamViec.sort(
        (a: any, b: any) => a.ca_id - b.ca_id
      ).findIndex((ca: any) => ca.ca_id == e.target.value)
    );
    setChiTietCaLam({
      ...chiTietViecLam.CaLamViec?.find(
        (ca: any) => ca.ca_id == e.target.value
      ),
    });
    setCaUngtuyen([]);
  };
  const handleChonBuoiLam = (value: number) => {
    const findIndexBuoi = caUngTuyen.findIndex((e: number) => e == value);
    if (findIndexBuoi == -1) {
      caUngTuyen.push(value);

      setCaUngtuyen([...caUngTuyen.sort((a: number, b: number) => a - b)]);
    } else {
      console.log("buoi sai lam", value);

      caUngTuyen.splice(findIndexBuoi, 1);
      setCaUngtuyen([...caUngTuyen.sort((a: number, b: number) => a - b)]);
    }
  };
  const handleThemBuoiCoTheLam = () => {
    if (arrCaUngTuyen.findIndex((e: any) => e.ca_id == chonCaLam) == -1) {
      if (caUngTuyen.length == 0) {
        notifyWarning("Vui lòng chọn buổi có thể đi làm!!");
      } else {
        setArrCaUngTuyen([
          ...arrCaUngTuyen,
          {
            ca: indexCaLam + 1,
            ca_id: chonCaLam,
            gio_lam: `${convertTimeHM(
              chiTietCaLam?.ca_start_time
            )} - ${convertTimeHM(chiTietCaLam?.ca_end_time)}`,
            day: [...caUngTuyen],
          },
        ]);
      }
    } else {
      notifyWarning("Ca làm đã được chọn!");
    }
  };
  const handleXoaCaLam = (index: number) => {
    arrCaUngTuyen.splice(index, 1);
    setArrCaUngTuyen([...arrCaUngTuyen]);
  };
  const handleLogin = () => {
    if (!dataLogin.account || !dataLogin.password) {
      notifyWarning("Vui lòng nhập đầy đủ thông tin đăng nhập!");
      return;
    }

    axios
      .post(
        "http://210.245.108.202:3001/api/timviec/candidate/loginUv",
        dataLogin
      )
      .then((res) => {
        Cookies.set("token_base365", res.data.data.access_token);
        notifySuccess("Đăng nhập thành công!");
        Cookies.set("UT", "0");
        router.push(pathname);
      })
      .catch((err) => notifyWarning("Thông tin đăng nhập không chính xác!"));
  };
  console.log("chitietcalam", chiTietCaLam);
  if (!chiTietViecLam.id_vieclam) {
    return <Loading />;
  }

  return (
    <>
      <HeadJobDetai
        fullPath={fullPath}
        job={chiTietViecLam.vi_tri}
        company={chiTietViecLam.ntd_userName}
      />
      <div className={styles.job_detail}>
        <Header />
        <SearchJob />
        <div className={styles.about_job}>
          <div className={styles.folder_job}>
            <div>
              <Link href={"/"} className="cursor-pointer">
                Việc Làm Theo Giờ
              </Link>{" "}
              /{" "}
              {/* <Link
                href={`/viec-lam-${convertNameToSlug(
                  renderProfession[chiTietViecLam.nganh_nghe]
                )}-${chiTietViecLam.nganh_nghe}.html`}
                className="cursor-pointer"
              >
                {renderProfession[chiTietViecLam.nganh_nghe]}{" "}
              </Link> */}
              / {chiTietViecLam.vi_tri}
            </div>
          </div>
          <div className={styles.box_job}>
            <div className={styles.title}>{chiTietViecLam.vi_tri}</div>
            <div className={styles.frame_box}>
              <div className={styles.frame_box_lf + " items-center"}>
                <Image
                  height={150}
                  width={150}
                  className="lazyload"
                  src="/images/no-avartar-user.png"
                  data-src={
                    chiTietViecLam.linkAvatar
                      ? chiTietViecLam.linkAvatar
                      : "/images/no-avartar-user.png"
                  }
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = "/images/img_new/avt_daidien1.png";
                  }}
                  alt="photo"
                />
                <div>
                  {/* <Link
                    href={`/${convertNameToSlug(
                      chiTietViecLam.ntd_userName
                    )}-co${chiTietViecLam.id_ntd}.html`}
                    className="flex text-blue-500 cursor-pointer "
                  >
                    <Image
                      height={20}
                      width={20}
                      src="/images/ico-cty.svg"
                      alt="cty"
                    />{" "}
                    <span className="ml-2">{chiTietViecLam.ntd_userName}</span>
                  </Link> */}
                  <p>
                    <span style={{ fontWeight: "bold" }}>Địa chỉ: </span>{" "}
                    {chiTietViecLam.ntd_address}
                  </p>
                  <p>
                    Hạn nộp hồ sơ:{" "}
                    {convertDateDMY(chiTietViecLam.time_td * 1000)}{" "}
                    {Date.now() > chiTietViecLam.time_td * 1000 ? (
                      <span className="text-red-400">(Hết hạn)</span>
                    ) : (
                      <span>
                        Còn{" "}
                        {differenceInDays(
                          new Date(chiTietViecLam.time_td * 1000),
                          new Date()
                        )}{" "}
                        ngày{" "}
                      </span>
                    )}
                  </p>
                  <p>
                    Lượt xem:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {chiTietViecLam.luot_xem}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.frame_box_btn}>
                <button
                  onClick={luuViecLam}
                  className={
                    chiTietViecLam.luuViec
                      ? `${btnStyles.btn_primary} mb-3 h-11`
                      : styles.btn_save_job
                  }
                >
                  <Image
                    height={25}
                    width={25}
                    alt="/"
                    className="mr-2"
                    src="/images/tim.svg"
                  />
                  {chiTietViecLam.luuViec ? "Đã lưu việc" : "Lưu việc làm"}
                </button>
                <button
                  className={styles.btn_add_job}
                  onClick={() =>
                    checkToken()
                      ? setOpenModalUngTuyen(true)
                      : setOpenModalLogin(true)
                  }
                >
                  <Image
                    className="mr-2"
                    height={25}
                    width={25}
                    alt="/"
                    src="/images/maybay.svg"
                  />
                  {chiTietViecLam.nhanViec ? "Đã nhận việc" : "Nhận việc"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.jd_job}>
          <div className={styles.jd_content}>
            <div className={styles.jd_detail_rg}>
              <div className={styles.jd_title}>Thông tin tuyển dụng</div>
              <div className={styles.jd_detail_rg_box}>
                <div className={styles.jd_detail_rg_list}>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/money.svg"
                    />
                    Mức lương:{" "}
                    <span className={`${styles.job_salary} ml-1.5`}>
                      {chiTietViecLam.muc_luong} VND/{" "}
                      {renderPayrollMethods[chiTietViecLam.tra_luong]}
                    </span>
                  </p>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      className="mr-1"
                      src="/images/search-job.svg"
                    />
                    Số lượng tuyển dụng:{"  "}
                    <span className={styles.detail_inf}>
                      {chiTietViecLam.so_luong}
                    </span>
                  </p>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      className="mr-1"
                      src="/images/pin.svg"
                    />
                    Nơi làm việc:{"  "}
                    <span className={styles.detail_inf}>
                      {chiTietViecLam.address}
                    </span>
                  </p>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/new_gender.svg"
                    />
                    Giới tính:{" "}
                    <span className={styles.detail_inf}>
                      {chiTietViecLam.gender == 1
                        ? "Nam"
                        : chiTietViecLam.gender == 2
                        ? "Nữ"
                        : "Không yêu cầu"}
                    </span>
                  </p>
                </div>
                <div className={styles.jd_detail_rg_list}>
                  <div className="flex items-center mb-2">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/grobal.svg"
                    />
                    Ngành nghề:{" "}
                    <div className={styles.tudo}>
                      {renderProfession[chiTietViecLam.nganh_nghe]}
                    </div>
                  </div>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/university.svg"
                    />
                    Học vấn tối thiểu:{" "}
                    <span className={styles.detail_inf}>
                      {renderLiteracy[chiTietViecLam.hoc_van]}
                    </span>
                  </p>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/loaicv.svg"
                    />
                    Loại công việc:{" "}
                    <span className={styles.detail_inf}>
                      {renderSchedules[chiTietViecLam.hinh_thuc]}
                    </span>
                  </p>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/coin.svg"
                    />
                    Hình thức trả lương:{" "}
                    <span className={styles.detail_inf}>
                      Theo {renderPayrollMethods[chiTietViecLam.tra_luong]}
                    </span>
                  </p>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/new_bangcap.svg"
                    />
                    Cấp bậc:
                    <span className={styles.detail_inf}>
                      {renderPosition[chiTietViecLam.cap_bac]}
                    </span>
                  </p>
                  <p className="flex">
                    <Image
                      height={50}
                      width={50}
                      style={{ width: 25 }}
                      alt="/"
                      src="/images/new_time.svg"
                    />
                    Thời gian thử việc:{" "}
                    <span className={styles.detail_inf}>
                      {chiTietViecLam.thoi_gian}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.ntd_keyword + " hidden lg:block"}>
                <div>
                  <div className={styles.jd_title}>
                    Việc làm cùng nhà tuyển dụng
                  </div>
                  <div>
                    <div>
                      {viecLamKhac.length > 0 &&
                        viecLamKhac.map((job: any) => (
                          <JobCard key={job.id_vieclam} job={job} />
                        ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.jd_title}>Từ khóa liên quan</div>
                  <div className={styles.key_word}>
                    {tagCv.map((tag) => (
                      <button key={tag.value} className={styles.btn}>
                        <Link
                          href={`/viec-lam-${convertNameToSlug(
                            renderProfession[tag.value]
                          )}-${tag.value}.html`}
                        >
                          {tag.label}
                        </Link>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.jd_detail_lf}>
              <p className={styles.detail_title}>Lịch làm việc</p>
              <p className={styles.detail_txt}>
                Công việc này có {chiTietViecLam.CaLamViec.length} ca làm, bạn
                sẽ được sắp xếp cụ thể khi trao đổi trực tiếp.
              </p>
              <div /* className={styles.detail_ca} */>
                {chiTietViecLam.CaLamViec.sort(
                  (a: any, b: any) => a.ca_id - b.ca_id
                ).map((ca: any, index: number) => (
                  <div key={index}>
                    <div>Ca {index + 1} :</div>
                    <div className="my-3">
                      <span className="mr-3"> Giờ làm:</span>
                      {convertTimeHM(ca.ca_start_time)} -{" "}
                      {convertTimeHM(ca.ca_end_time)}
                    </div>
                    <div className="grid grid-cols-7">
                      {dayOfTheWeek.map((day) => (
                        <div
                          key={day.value}
                          className={`${
                            ca.day.includes(`${index + 1}${day.value}`) &&
                            styles.mark
                          } mb-2 w-4/5 bg-slate-200 text-center `}
                        >
                          {day.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.job_content}>
                <p className={styles.detail_title}>Mô tả công việc</p>
                <p className={styles.detail_txt}> {chiTietViecLam.mo_ta}</p>
              </div>
              <div className={styles.job_content}>
                <p className={styles.detail_title}>Yêu cầu công việc</p>
                <p className={styles.detail_txt}>{chiTietViecLam.yeu_cau}</p>
              </div>
              <div className={styles.job_content}>
                <p className={styles.detail_title}>Quyền lợi được hưởng</p>
                <p className={styles.detail_txt}>{chiTietViecLam.quyen_loi}</p>
              </div>
              <div className={styles.job_content}>
                <p className={styles.detail_title}>Hồ sơ bao gồm</p>
                <p className={styles.detail_txt}>{chiTietViecLam.ho_so}</p>
              </div>
              <div className={styles.job_content}>
                <p className={styles.detail_title}>Thông tin liên hệ</p>
                <p className={styles.detail_txt}>
                  Hỗ trợ khách đến và mua hàng, báo giá sản phẩm
                </p>
                <p className={styles.detail_txt}>
                  Hỗ trợ khách đến và mua hàng, báo giá sản phẩm
                </p>
              </div>
              <div className={styles.contact_share}>
                {!1 ? (
                  <div className={styles.btn_contact}>
                    <Image
                      height={50}
                      width={50}
                      alt="/"
                      className="mr-1"
                      src="/images/phone2.svg"
                    />{" "}
                    Đăng nhập để xem số điện thoại
                  </div>
                ) : (
                  <div
                    onClick={() => setShowSDT(true)}
                    className={styles.btn_contact}
                  >
                    <Image
                      height={25}
                      width={25}
                      alt="/"
                      className="mr-r "
                      src="/images/phone2.svg"
                    />
                    {showSDT ? chiTietViecLam.phone_lh : "Xem số điện thoại"}
                  </div>
                )}

                <div className={styles.box_share}>
                  <p>Chia sẻ:</p>
                  <div className="flex">
                    <Image
                      height={50}
                      width={50}
                      alt="/"
                      src="/images/face.svg"
                    />
                    <Image
                      height={50}
                      width={50}
                      alt="/"
                      src="/images/tw1.svg"
                    />
                    <Image
                      height={50}
                      width={50}
                      alt="/"
                      src="/images/in.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.ntd_keyword + " lg:hidden"}>
                <div>
                  <div className={styles.jd_title}>
                    Việc làm cùng nhà tuyển dụng
                  </div>
                  <div>
                    <div className="grid grid-cols-2">
                      {viecLamKhac.length > 0 &&
                        viecLamKhac.map((job: any) => (
                          <JobCard key={job.id_vieclam} job={job} />
                        ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.jd_title}>Từ khóa liên quan</div>
                  <div className={styles.key_word}>
                    {tagCv.map((tag) => (
                      <button key={tag.value} className={styles.btn}>
                        <Link href={`/viec-lam-${tag.label}-${tag.value}.html`}>
                          {tag.label}
                        </Link>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full">
            <picture>
              <source
                media="max-width:768px"
                srcSet="images/banner-main-mb.png"
              />
              <source
                media="max-width:1024px"
                srcSet="images/banner-main-tl.png"
              />
              <Image
                height={2000}
                width={1000}
                src="/images/banner-main.png"
                alt=""
                className="w-full"
              />
            </picture>
          </div> */}
          <div className="w-full mx-5">
            <div className="text-lg font-bold">Việc làm tương tự</div>
            <div className="grid grid-cols-2">
              {viecLamTuongTu.length > 0 &&
                viecLamTuongTu.map((job: any) => (
                  <JobCard key={job.id_vieclam} job={job} />
                ))}
            </div>
          </div>
        </div>
        {/* Modal đăng nhập khi chưa login */}
        <Modal
          centered
          open={openModalLogin}
          footer={null}
          onCancel={() => setOpenModalLogin(false)}
        >
          <div>
            <div className={styles.modal_login_top}>
              <div className={styles.modal_top_txt}>
                Bạn cần đăng nhập tài khoản ứng viên để thực hiện chức năng này
              </div>
            </div>
            <div>
              <div>
                <div className={styles.login_inp}>
                  <Image
                    alt="/"
                    height={50}
                    width={50}
                    src="/images/ico-user.svg"
                  />
                  <input
                    onChange={(e) =>
                      setDataLogin({ ...dataLogin, account: e.target.value })
                    }
                    type="email"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
                <div className={styles.login_inp}>
                  <Image
                    alt="/"
                    height={50}
                    width={50}
                    src="/images/lock.svg"
                  />
                  <input
                    onChange={(e) =>
                      setDataLogin({ ...dataLogin, password: e.target.value })
                    }
                    type="password"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button onClick={handleLogin} className={styles.btn_login}>
                  Đăng nhập
                </button>
                <div className="mt-4 ">
                  <a
                    onClick={() => setOpenModalLogin(false)}
                    href="https://timviec365.vn/quen-mat-khau-ung-vien.html"
                    target="blank"
                    className="text-blue-500 text-base"
                  >
                    Quên mật khẩu ?
                  </a>
                  <a
                    onClick={() => setOpenModalLogin(false)}
                    href="https://timviec365.vn/dang-ky.html"
                    target="blank"
                    className="text-blue-600"
                  >
                    ĐĂNG KÝ NGAY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          width={800}
          centered
          open={openModalUngTuyen}
          footer={null}
          onCancel={() => setOpenModalUngTuyen(false)}
        >
          <div className="text-center font-bold text-3xl py-4">Nhận việc</div>
          <p className="text-base">
            Thời gian:{" "}
            <span className="text-slate-700">{`${convertDateDMY(
              chiTietViecLam.fist_time
            )} đến  ${convertDateDMY(chiTietViecLam.last_time)}`}</span>
          </p>
          <p className="text-base">
            Công việc này có {chiTietViecLam.CaLamViec.length} ca
          </p>
          <p className="text-base text-slate-600">
            (Chọn ca bạn có thể đi làm)
          </p>

          <Radio.Group
            onChange={handleChonCaLam}
            defaultValue={chonCaLam}
            options={chiTietViecLam.CaLamViec.sort(
              (a: any, b: any) => a.ca_id - b.ca_id
            ).map((inforCa: any, index: number) => ({
              value: inforCa.ca_id,
              label: (
                <p key={inforCa.ca_id} className="text-base">
                  Ca {index + 1}{" "}
                  <span className="text-gray-400">
                    {convertTimeHM(inforCa.ca_start_time)} -{" "}
                    {convertTimeHM(inforCa.ca_end_time)}
                  </span>{" "}
                </p>
              ),
            }))}
          ></Radio.Group>
          <p className="text-base text-slate-600">
            (Chọn buổi bạn có thể đi làm)
          </p>
          <div>
            <div className="grid grid-cols-7">
              {dayOfTheWeek.map((day, index) => (
                <button
                  key={day.value}
                  onClick={() => handleChonBuoiLam(day.value)}
                  className={`${
                    chiTietViecLam.CaLamViec.sort(
                      (a: any, b: any) => a.ca_id - b.ca_id
                    )[indexCaLam]?.day?.includes(`${indexCaLam + 1}${day.value}`)
                      ? styles.mark
                      : `pointer-events-none`
                  }  mb-2 cursor-pointer w-4/5 bg-slate-200 text-center relative`}
                >
                  {day.label}
                  <div
                    className={`${
                      caUngTuyen.findIndex((e: number) => e == day.value) !=
                        -1 && styles.buoi_da_chon
                    }`}
                  ></div>
                </button>
              ))}
            </div>
            <div className="flex justify-center my-3">
              <button
                onClick={handleThemBuoiCoTheLam}
                className={btnStyles.btn_primary + " w-24"}
              >
                {" "}
                Lưu{" "}
              </button>
            </div>
            <div className="border rounded-lg border-blue-400">
              <div className="p-3">
                {arrCaUngTuyen.map((chitiet: any, index: number) => (
                  <div
                    key={chitiet.ca}
                    className="border-blue-400 border-b pb-3"
                  >
                    <p>
                      Ca {chitiet.ca}:{" "}
                      <span className="text-slate-600">
                        ({chitiet.gio_lam})
                      </span>
                    </p>
                    <div className="flex justify-between">
                      <p>
                        Lịch làm đã chọn:{" "}
                        <span>
                          {" "}
                          {chitiet.day.map((d: number) =>
                            d < 8 ? `Thứ ${d}, ` : "Chủ nhật "
                          )}
                        </span>
                      </p>
                      <button onClick={() => handleXoaCaLam(index)}>
                        <Image
                          height={50}
                          width={50}
                          src="/images/delete.svg"
                          alt="/"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button onClick={nhanViecLam} className={btnStyles.btn_warning}>
                  Gửi yêu cầu nhận việc
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </Modal>
        <Footer />
        <ToastContainer autoClose={1500} />
      </div>
    </>
  );
}

export default ChiTietCViec;

"use client";
import Footer from "@/Components/Footer.component";
import styles from "@/Css/forNtd.module.css";
import Header from "@/Layout/Header.layout";
import { HeadDefault } from "@/constants/Head.constant";
import { LIST_DT, LIST_TKUV } from "@/constants/forNtd.constant";
import {
  convertNameToSlug,
  decodeUnicodeString,
} from "@/utils/generalFunction";
import { Carousel } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function ForNtdPage() {
  const router = useRouter();
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  return (
    <>
      <HeadDefault title={"Giới thiệu"} fullPath={"fullPath"} />{" "}
      <div>
        <Header />
        <div className={styles.gt_qr}>
          <div className={styles.gt_content}>
            <h2 className="text-3xl text-blue-600 font-semibold">
              TUYỂN NHÂN VIÊN
            </h2>
            <h3 className="text-xl text-blue-600 font-medium">
              TRẢ LƯƠNG THEO GIỜ
            </h3>
            <p>
              Tiếp cận nhanh chóng với{" "}
              <span className="text-xl text-orange-400">50.000+</span> nhân sự
              sẵn sàng làm việc.
            </p>
            <div className={styles.gt_frame}>
              <div className={styles.box_btn + " mf-3"}>
                <div className="flex gap-x-5 ">
                  <div>
                    <img className="w-36" src="/images/qr_vltg_new.png" />
                    <button>
                      {" "}
                      <Link
                        className="hover:underline"
                        href={`http://localhost:3000/dang-ky`}
                      >
                        Tải App trên IOS
                      </Link>
                    </button>
                  </div>
                  <div>
                    <img className="w-36" src="/images/qr_vltg_new.png" />
                    <button>
                      {" "}
                      <Link
                        className="hover:underline"
                        href={`http://localhost:3000/dang-ky`}
                      >
                        Tải App trên Android
                      </Link>
                    </button>
                  </div>
                </div>
                <div className="flex w-1/2 justify-center">
                  <button className={styles.btn_warning}>
                    <Link
                      className="hover:underline"
                      href={`http://localhost:3000/dang-ky`}
                    >
                      Đăng tuyển miễn phí ngay
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gt_ct}>
          <div className={styles.ct_item}>
            <div className={styles.ct_img}>
              <img src="/images/img_gt1.png" alt="" />
            </div>
            <div className={styles.ct_content}>
              <p className={styles.title}>
                Đáp ứng nhu cầu tuyển dụng ngay lập tức của bạn{" "}
              </p>
              <p className={styles.content_txt}>
                Tuyển được người chỉ sau 4h. Từ bây giờ việc tìm kiếm nhân sự
                ngắn hạn sẽ không còn là vấn đề của bạn nữa.
              </p>
              <div className="flex sm:justify-center md:justify-start w-full ">
                <button className={styles.btn_primary}>
                  <Link href={`http://localhost:3000/dang-ky`}>
                    Đăng tuyển miễn phí ngay
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div
            className={styles.ct_item_sang_loc + " justify-center items-center"}
          >
            <div className="flex ">
              <div className={styles.ct_img_sang_loc}>
                <img src="/images/img_gt2.png" alt="" />
              </div>
              <div className={styles.ct_content}>
                <p className={styles.title}>
                  Tìm kiếm sàng lọc ứng viên chất lượng
                </p>
                <p className={styles.content_txt}>
                  Công cụ sàng lọc đơn giản, dữ liệu ứng viên phong phú, chúng
                  tôi có: đầu bếp, phục vụ, lễ tân, nhân viên bán hàng, giao
                  hàng, pha chế và rất nhiều ngành nghề khác!
                </p>
                <button className={styles.btn_primary}>
                  <Link href={`/ung-vien-tim-viec-lam-theo-gio.html`}>
                    Tìm ứng viên theo giờ chất lượng
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.ct_item_ho_tro}>
            <div className={styles.ct_img_ho_tro}>
              <img src="/images/img_gt3.png" alt="" />
            </div>
            <div className={styles.ct_content_ho_tro}>
              <p className={styles.title}>Hỗ trợ 24/7</p>
              <p className={styles.content_txt}>
                Đội ngũ chăm sóc khách hàng 24/7 luôn sẵn sàng hỗ trợ bạn để
                giải quyết các vấn đề cấp bách, giúp công việc của bạn luôn trôi
                chảy.
              </p>
              <div className={styles.box_hotline}>
                <div className={styles.hotline}>
                  <img
                    className="w-6 mr-3"
                    src="/images/ico-phone.svg"
                    alt=""
                  />
                  <p>
                    Hotline: <span> 1900633682 - Ấn phím 1</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frame_ct_hs}>
            {/* Chưa tìm ra hướng giải quyết */}
          </div>
          <div className={styles.title + " text-center"}>
            Tìm kiếm ứng viên theo ngành nghề, lĩnh vực
          </div>
          <div className={styles.ct_tkuv}>
            <div className={styles.tkuv_container}>
              {LIST_TKUV.map((e, index) => (
                <div key={index} className={styles.tkuv_item}>
                  <Link
                    href={`/ung-vien-${convertNameToSlug(e.job)}-theo-gio-u${
                      e.value
                    }t0.html`}
                    className={styles.box_item}
                  >
                    <img src={e.url} />
                    <div className={styles.job_name}>{e.job}</div>
                    <div className={styles.job_count}>{e.count}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.ct_dky}>
          <div className={styles.dky_lf}>
            <div style={{ color: "white" }} className={styles.title}>
              Website số 1 về việc làm theo giờ
            </div>
            <div style={{ color: "white" }}>
              Bạn đang đau đầu với vấn đề tuyển dụng và quản lý nhân sự? Điền
              thông tin ngay để đăng tin tuyển dụng miễn phí cùng
              Vieclamtheogio.timviec365.vn
            </div>
            <div className={styles.dky_frame}>
              <div>
                <div className="text-2xl font-black text-orange-500 lg:text-3xl">
                  2000+
                </div>
                <div className="font-md mt-4 text-white">Công việc đã đăng</div>
              </div>
              <div>
                <div className="text-2xl font-black text-orange-500 lg:text-3xl">
                  2000+
                </div>
                <div className="font-md mt-4 text-white">Công việc đã đăng</div>
              </div>
              <div>
                <div className="text-2xl font-black text-orange-500 lg:text-3xl">
                  2000+
                </div>
                <div className="font-md mt-4 text-white">Công việc đã đăng</div>
              </div>
            </div>
          </div>
          <div className={styles.dky_rg}>
            <div className={styles.dky_box_lf}>
              <div className={styles.dky_inp_box}>
                <div>
                  <img src="/images/cty.svg" />
                </div>

                <input type="text" placeholder="Tên công ty" />
              </div>
              <div className={styles.dky_inp_box}>
                <div>
                  <img src="/images/phone1.svg" />
                </div>

                <input type="number" placeholder="Số điện thoại" />
              </div>
              <div className={styles.dky_inp_box}>
                <div>
                  <img src="/images/email.svg" />
                </div>
                <input type="email" placeholder="Email" />
              </div>
            </div>
            <div className={styles.dky_box_rg}>
              <div>
                <p className="text-white ml-5">
                  Hotline: <span className="ml-5"> 1900633682 - Ấn phím 1</span>
                </p>
              </div>
              <div>
                <button className={styles.btn_warning}>
                  <a target="blank" href={`http://localhost:3000/dang-ky`}>
                    Đăng ký ngay
                  </a>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.carousel_container}>
          <Carousel autoplay slidesToShow={3}>
            <div className={styles.carousel_item}>
              <div>
                <div>
                  <p className="font-semibold text-xl text-blue-500 text-center">
                    Đơn giản, dễ sử dụng và rất hiệu quả để tuyển nhân viên chất
                    lượng cho quán
                  </p>
                  <div className="flex items-center m-5">
                    <div className="w-20 h-20 rounded-full">
                      <img
                        className="w-20 h-20"
                        src="/images/box-ng1.png"
                        alt="box1"
                      />
                    </div>

                    <p className="text-blue-800 font-extrabold">
                      The CoffeHouse
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <div>
                <div>
                  <p className="font-semibold text-xl text-blue-500 text-center">
                    Đơn giản, dễ sử dụng và rất hiệu quả để tuyển nhân viên chất
                    lượng cho quán
                  </p>
                  <div className="flex items-center m-5">
                    <div className="w-20 h-20 rounded-full">
                      <img
                        className="w-20 h-20"
                        src="/images/box-ng2.png"
                        alt="box1"
                      />
                    </div>

                    <p className="text-blue-800 font-extrabold">
                      The CoffeHouse
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <div>
                <div>
                  <p className="font-semibold text-xl text-blue-500 text-center">
                    Đơn giản, dễ sử dụng và rất hiệu quả để tuyển nhân viên chất
                    lượng cho quán
                  </p>
                  <div className="flex items-center m-5">
                    <div className="w-20 h-20 rounded-full">
                      <img
                        className="w-20 h-20"
                        src="/images/box-ng2.png"
                        alt="box1"
                      />
                    </div>

                    <p className="text-blue-800 font-extrabold">
                      The CoffeHouse
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <div>
                <div>
                  <p className="font-semibold text-xl text-blue-500 text-center">
                    Đơn giản, dễ sử dụng và rất hiệu quả để tuyển nhân viên chất
                    lượng cho quán
                  </p>
                  <div className="flex items-center m-5">
                    <div className="w-20 h-20 rounded-full">
                      <img
                        className="w-20 h-20"
                        src="/images/box-ng3.png"
                        alt="box1"
                      />
                    </div>

                    <p className="text-blue-800 font-extrabold">
                      The CoffeHouse
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <div>
                <p className="font-semibold text-xl text-blue-500 text-center">
                  Đơn giản, dễ sử dụng và rất hiệu quả để tuyển nhân viên chất
                  lượng cho quán
                </p>
                <div className="flex items-center m-5">
                  <div className="w-20 h-20 rounded-full">
                    <img
                      className="w-20 h-20"
                      src="/images/box-ng2.png"
                      alt="box1"
                    />
                  </div>

                  <p className="text-blue-800 font-extrabold">The CoffeHouse</p>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
        <div className={styles.ct_dt}>
          <div className="w-3/5">
            <p className={styles.title}>Đối tác uy tín</p>
            <p className="mb-4">
              Timviec365.vn luôn nỗ lực kết nối cùng các đối tác uy tín để cung
              cấp những công việc có mức thù lao cao cùng môi trường làm việc
              chuyên nghiệp.
            </p>
          </div>

          <div className={styles.dt_list}>
            {LIST_DT.map((e, index) => (
              <div key={index} className="w-20 h-20 m-1.5">
                <img className="w-full h-full " src={e} alt="logo" />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ForNtdPage;

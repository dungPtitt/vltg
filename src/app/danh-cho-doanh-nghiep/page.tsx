"use client";
import Footer from "@/Components/Footer.component";
import styles from "@/Css/forNtd.module.css";
import Header from "@/Layout/Header.layout";
import { HeadDefault } from "@/constants/Head.constant";
import { LIST_DT, LIST_TKUV } from "@/constants/forNtd.constant";
import { Carousel } from "antd";
import { useRouter } from "next/navigation";
function ForNtdPage() {
  const router = useRouter();
  return (
    <>
      <HeadDefault title={"Giới thiệu"} />{" "}
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
                    <button>Tải App trên IOS</button>
                  </div>
                  <div>
                    <img className="w-36" src="/images/qr_vltg_new.png" />
                    <button>Tải App trên Android</button>
                  </div>
                </div>
                <button className={styles.btn_warning}>
                  Đăng tuyển miễn phí ngay
                </button>
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
              <button className={styles.btn_primary}>
                Đăng tuyển miễn phí ngay
              </button>
            </div>
          </div>
          <div className={styles.ct_item}>
            <div className={styles.ct_img}>
              <img src="/images/img_gt2.png" alt="" />
            </div>
            <div className={styles.ct_content}>
              <p className={styles.title}>
                Tìm kiếm sàng lọc ứng viên chất lượng
              </p>
              <p className={styles.content_txt}>
                Công cụ sàng lọc đơn giản, dữ liệu ứng viên phong phú, chúng tôi
                có: đầu bếp, phục vụ, lễ tân, nhân viên bán hàng, giao hàng, pha
                chế và rất nhiều ngành nghề khác!
              </p>
              <button
                onClick={() =>
                  router.push("/ung-vien-tim-viec-lam-theo-gio.html")
                }
                className={styles.btn_primary}
              >
                Tìm ứng viên theo giờ chất lượng
              </button>
            </div>
          </div>
          <div className={styles.ct_item}>
            <div className={styles.ct_img}>
              <img className="max-w-lg" src="/images/img_gt3.png" alt="" />
            </div>
            <div className={styles.ct_content}>
              <p className={styles.title}>Hỗ trợ 24/7</p>
              <p className={styles.content_txt}>
                Đội ngũ chăm sóc khách hàng 24/7 luôn sẵn sàng hỗ trợ bạn để
                giải quyết các vấn đề cấp bách, giúp công việc của bạn luôn trôi
                chảy.
              </p>
              <div className={styles.hotline}>
                <img className="w-6 mr-3" src="/images/ico-phone.svg" alt="" />
                <p>
                  Hotline: <span> 1900633682 - Ấn phím 1</span>
                </p>
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
                  <div className={styles.box_item}>
                    <img src={e.url} />
                    <div className={styles.job_name}>{e.job}</div>
                    <div className={styles.job_count}>{e.count}</div>
                  </div>
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
                <button className={styles.btn_warning}> Đăng ký ngay</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.carousel_container}>
          <Carousel autoplay slidesToShow={3}>
            <div className={styles.carousel_item}>
              {" "}
              <img src="/images/jinx1.jpg" alt="jinx" />
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <img src="/images/jinx2.jpg" alt="jinx" />
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <img src="/images/jinx3.jpg" alt="jinx" />
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <img src="/images/jinx4.jpg" alt="jinx" />
            </div>
            <div className={styles.carousel_item}>
              {" "}
              <img src="/images/jinx5.jpg" alt="jinx" />
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

"use client";
import styles from "@/Css/homePage.module.css";
import btnStyles from "@/Css/button.module.css";
import { useState } from "react";
import {
  LIST_KEYWORDS,
  LIST_MENU,
  LIST_MXH,
} from "@/constants/footer.constant";
import Link from "next/link";
import Image from "next/image";
function Footer() {
  const [show, setShow] = useState("");
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_block1}>
        {LIST_KEYWORDS.map((keyword, index: number) => (
          <Link key={index} href={keyword.link} target="blank">
            {keyword.label}
            {index < LIST_KEYWORDS.length - 1 && ","}
          </Link>
        ))}
      </div>
      <div className={styles.footer_block2}>
        <div className="lg:mr-8 ">
          <div className="flex justify-between w-full">
            <p>Về Timviec365</p>
            <div
              onClick={() => (show == "about" ? setShow("") : setShow("about"))}
              className="lg:hidden"
            >
              <Image
                width={15}
                height={15}
                src="/images/arr_down.svg"
                alt="down"
              />
            </div>
          </div>

          <div
            className={show != "about" ? styles.list_about : styles.show_footer}
          >
            {LIST_MENU.aboutTimViec365.map((list, index) => (
              <div key={index} className="w-full">
                {list.map((item) => (
                  <Link key={item.link} href={item.link} target="blank">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footer_block2_right}>
          <div className={styles.for_uv}>
            <div className="flex justify-between">
              <p>Dành cho ứng viên</p>
              <div
                onClick={() =>
                  show == "forUv" ? setShow("") : setShow("forUv")
                }
                className="lg:hidden"
              >
                <Image
                  width={15}
                  height={15}
                  src="/images/arr_down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div
              className={
                show != "forUv" ? styles.list_about : styles.show_footer
              }
            >
              {LIST_MENU.forUV.map((list, index) => (
                <div key={index} className="w-full">
                  {list.map((item) => (
                    <Link key={item.label} href={item.link} target="blank">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.for_ntd}>
            <div className="flex justify-between">
              <p>Dành cho nhà tuyển dụng</p>
              <div
                onClick={() =>
                  show == "forNtd" ? setShow("") : setShow("forNtd")
                }
                className="lg:hidden"
              >
                <Image
                  width={15}
                  height={15}
                  src="/images/arr_down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div
              className={
                show != "forNtd" ? styles.list_about : styles.show_footer
              }
            >
              {LIST_MENU.forNTD.map((list, index) => (
                <div key={index} className="w-full">
                  {list.map((item) => (
                    <Link key={item.link} href={item.link} target="blank">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.utilities}>
            <div className="flex justify-between">
              <p>Tiện ích</p>
              <div
                onClick={() =>
                  show == "tienich" ? setShow("") : setShow("tienich")
                }
                className="lg:hidden"
              >
                <Image
                  width={15}
                  height={15}
                  src="/images/arr_down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div
              className={
                show != "tienich" ? styles.list_about : styles.show_footer
              }
            >
              {LIST_MENU.utilities.map((list, index) => (
                <div key={index} className="w-full">
                  {list.map((item) => (
                    <Link key={item.link} href={item.link} target="blank">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.work_area}>
            <div className="flex justify-between">
              <p>Việc làm theo khu vực</p>
              <div
                onClick={() =>
                  show == "vltkv" ? setShow("") : setShow("vltkv")
                }
                className="lg:hidden"
              >
                <Image
                  width={15}
                  height={15}
                  src="/images/arr_down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div
              className={
                show != "vltkv" ? styles.list_about : styles.show_footer
              }
            >
              {LIST_MENU.areas.map((list, index) => (
                <div key={index} className="w-full">
                  {list.map((item) => (
                    <Link key={item.link} href={item.link} target="blank">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.work_job}>
            <div className="flex justify-between">
              <p> Việc làm theo ngành nghề</p>
              <div
                onClick={() =>
                  show == "vltnn" ? setShow("") : setShow("vltnn")
                }
                className="lg:hidden"
              >
                <Image
                  width={15}
                  height={15}
                  src="/images/arr_down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div
              className={
                show != "vltnn" ? styles.list_about : styles.show_footer
              }
            >
              {LIST_MENU.professtion.map((list, index) => (
                <div key={index} className="w-full">
                  {list.map((item) => (
                    <Link key={item.link} href={item.link} target="blank">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.work_tag}>
            <div className="flex justify-between">
              <p> Việc làm theo tag</p>
              <div
                onClick={() => (show == "vltt" ? setShow("") : setShow("vltt"))}
                className="lg:hidden"
              >
                <Image
                  width={15}
                  height={15}
                  src="/images/arr_down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div
              className={
                show != "vltt" ? styles.list_about : styles.show_footer
              }
            >
              {LIST_MENU.tags.map((list, index) => (
                <div key={index} className="w-full">
                  {list.map((item) => (
                    <Link key={item.link} href={item.link} target="blank">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer_block3}>
        <div className="flex w-full">
          <div className={styles.wrap_365}>
            <img src="/images/365timviec.png" alt="" />
            <p>KẾT NỐI VỚI TIMVIEC365.VN</p>
            <div className={styles.wrap_block_connect}>
              {LIST_MXH.map((mxh) => (
                <Link
                  target="blank"
                  key={mxh.alt}
                  href={mxh.link}
                  className={styles.wrap_icon_connect}
                >
                  <Image width={15} height={15} src={mxh.src} alt={mxh.alt} />
                </Link>
              ))}
            </div>
            <div className="flex">
              <Link
                target="blank"
                href="https://www.dmca.com/Protection/Status.aspx?ID=5b1070f1-e6fb-4ba4-8283-84c7da8f8398&cdnrdr=1&refurl=https://vieclamtheogio.timviec365.vn/"
              >
                <Image
                  width={110}
                  height={40}
                  className="mr-2"
                  src="/images/DK_bocongthuong.png"
                  alt="bct"
                />
              </Link>
              <Link
                href="http://online.gov.vn/Home/WebDetails/35979"
                target="blank"
              >
                <Image
                  height={40}
                  width={40}
                  src="/images/dmca.png"
                  alt="dmca"
                />
              </Link>
            </div>
          </div>
          <div className={styles.wrap_address}>
            {" "}
            <p className={styles.wrap_address_header}>
              CÔNG TY CỔ PHẦN THANH TOÁN HƯNG HÀ
            </p>
            <Link
              className={styles.wrap_address_txt}
              href="https://goo.gl/maps/stYYuH5Ln5U2"
            >
              VP 1: Tầng 4, B50, Lô 6, KĐT Định Công - Hoàng Mai - Hà Nội
            </Link>
            <p className={styles.wrap_address_txt}>
              VP2: Thôn Thanh Miếu, Xã Việt Hưng, Huyện Văn Lâm, Tỉnh Hưng Yên
            </p>
            <p className={styles.wrap_address_txt}>
              Hotline: 0982079209, 1900633682 - ấn phím 1
            </p>
            <p className={styles.wrap_address_txt}>
              Email: timviec365.vn@gmail.com
            </p>
          </div>
        </div>

        <div className={styles.wrap_qr}>
          <p className={styles.wrap_qr_header}>TẢI APP ĐỂ TÌM VIỆC SIÊU TỐC</p>
          <div className="grid grid-cols-2 gap-x-3 md:grid-cols-4 gap-y-4 lg:hidden">
            <Link
              target="blank"
              href="https://play.google.com/store/apps/details?id=timviec365vn.timviec365_vn"
            >
              <button className={btnStyles.btn_download + " text-sm	w-full "}>
                Tải app Timviec365 UV{" "}
                <img className="ml-3" src="/images/download.svg" alt="" />
              </button>
            </Link>
            <div>
              <Link
                target="blank"
                href="https://play.google.com/store/apps/details?id=vn.timviec365.company"
                className={btnStyles.btn_download + " text-sm"}
              >
                Tải app Timviec365 NTD{" "}
                <img className="ml-3" src="/images/download.svg" alt="" />
              </Link>
            </div>
            <div>
              <Link
                target="blank"
                href="https://play.google.com/store/apps/details?id=vn.timviec365.cv.cv365_vn"
                className={btnStyles.btn_download + " text-sm"}
              >
                Tải app CV365{" "}
                <img className="ml-3" src="/images/download.svg" alt="" />
              </Link>
            </div>
            <div>
              <Link
                target="blank"
                href="https://play.google.com/store/apps/details?id=vn.timviec365.chat_365"
                className={btnStyles.btn_download + " text-sm"}
              >
                Tải app Chat365{" "}
                <img className="ml-3" src="/images/download.svg" alt="" />
              </Link>
            </div>
          </div>
          <div className={styles.wrap_qr_block}>
            <div className={styles.wrap_qr_child}>
              <img
                className={styles.qr_img}
                src="/images/qr_timviec_uv.png"
                alt="uv"
              />
              <p className={styles.qr_text}>App Timviec365 UV</p>
            </div>
            <div className={styles.wrap_qr_child}>
              <img
                className={styles.qr_img}
                src="/images/new_qr_ft1.png"
                alt="ntd"
              />
              <p className={styles.qr_text}>App Timviec365 NTD</p>
            </div>
            <div className={styles.wrap_qr_child}>
              <img
                className={styles.qr_img}
                src="/images/qr_app_cv_new.png"
                alt="cv"
              />
              <p className={styles.qr_text}>App CV365</p>
            </div>
            <div className={styles.wrap_qr_child}>
              <img
                className={styles.qr_img}
                src="/images/qr_chat_365.png"
                alt="chat365"
              />
              <p className={styles.qr_text}>App Chat 365</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

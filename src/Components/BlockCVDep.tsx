import styles from "@/Css/homePage.module.css";
import Image from "next/image";
import Link from "next/link";
function BlockCVDep() {
  return (
    <div className={styles.banner_main}>
      <Link href={"https://timviec365.vn/cv-xin-viec"} target="blank">
        <div className="h-60 md:hidden">
          <Image
            height={2000}
            width={1500}
            className="w-full h-full"
            src="/images/banner-main-mb.png"
            alt=""
          />
        </div>
        <div className="h-44 hidden md:block lg:hidden ">
          <Image
            height={2000}
            width={1500}
            className="w-full h-full"
            src="/images/banner-main.png"
            alt=""
          />
        </div>
        <div className="h-64 hidden lg:block">
          <Image
            height={2000}
            width={1500}
            className="w-full h-full"
            src="/images/banner-main.png"
            alt=""
          />
        </div>
      </Link>
    </div>
  );
}

export default BlockCVDep;

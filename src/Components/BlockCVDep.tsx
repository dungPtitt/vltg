import styles from "@/Css/homePage.module.css";
import Image from "next/image";
function BlockCVDep() {
  return (
    <div className={styles.banner_main}>
      <a href="#" target="blank"></a>
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
    </div>
  );
}

export default BlockCVDep;

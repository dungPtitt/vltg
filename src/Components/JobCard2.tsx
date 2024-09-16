"use client";
import styles from "@/Css/jobAbout.module.css";
import {
  renderCvStatus,
  renderPayrollMethods,
  renderSchedules,
} from "@/constants/EditProfile.constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function JobCard2({ job }: any) {
  const id = useMemo(() => {
    return job ? job.id_vieclam : 0;
  }, []);
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  return (
    <div className={styles.about_job2}>
      <div className={styles.about_job2_left}>
        <div className=" flex justify-center items-center">
          <Image
            height={70}
            width={70}
            className={styles.img + " lazyload mr-3"}
            src="/images/no-avartar-user.png"
            data-src={
              job?.ntd_avatar != ""
                ? job?.ntd_avatar
                : "/images/no-avartar-user.png"
            }
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "/images/no-avartar-user.png";
            }}
            alt="photo"
          />
        </div>
        <div className="w-3/5">
          <h3 className={styles.td + ` cursor-pointer hover:underline`}>
            <Link href={`/${job.alias}-${id}.html`}>{job?.vi_tri}</Link>
          </h3>

          <p className={styles.city_name}>{job?.ntd_userName}</p>

          <div className="flex">
            <img className="mr-2.5" src="/images/dola.svg" alt="$" />{" "}
            <span className={styles.salary}>
              {job?.muc_luong} VND/
              {renderPayrollMethods[job?.tra_luong]}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.about_job2_right}>
        <div className={styles.job2_right_img_box}>
          <img className="mr-2.5" src="/images/map.svg" alt="dot" />{" "}
          <span className={styles.city_address2}>{job?.ntd_address}</span>
        </div>

        <div className="flex">
          <img className="mr-2.5" src="/images/balo.svg" alt="balo" />
          <span className={styles.working_time}>
            {renderSchedules[job?.hinh_thuc]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default JobCard2;

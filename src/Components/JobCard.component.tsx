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

function JobCard({ job }: any) {
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  const id = useMemo(() => {
    return job ? job.id_vieclam : 0;
  }, []);
  return (
    <div className="flex m-1">
      <div className={styles.about_job}>
        <div
          className={`${styles.image_container}" flex justify-center items-center mr-3" `}
        >
          <Image
            height={80}
            width={80}
            className="lazyload mr-3"
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

        <div className={styles.job_detail}>
          <h3 className={styles.td + ` cursor-pointer hover:underline`}>
            <Link href={`/${job.alias}-${id}.html`}>{job?.vi_tri}</Link>
          </h3>
          <div className="flex">
            <Image
              width={13}
              height={13}
              className="mr-2.5 inline-block"
              src="/images/map.svg"
              alt="dot"
            />{" "}
            <p className={styles.city_address}>{job?.ntd_address}</p>
          </div>
          <div className="flex">
            <img className="mr-2.5" src="/images/dola.svg" alt="$" />{" "}
            <span className={styles.salary}>
              {job?.muc_luong} VND/
              {renderPayrollMethods[job?.tra_luong]}
            </span>
          </div>
          <div className="flex ">
            <img className="mr-2.5" src="/images/balo.svg" alt="balo" />
            <span className={styles.working_time}>
              {renderSchedules[job?.hinh_thuc]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;

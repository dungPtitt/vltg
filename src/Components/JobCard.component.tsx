"use client";
import styles from "@/Css/jobAbout.module.css";
import {
  renderCvStatus,
  renderPayrollMethods,
  renderSchedules,
  renderProfession
} from "@/constants/EditProfile.constant";
import { tinh_thanh, quan_huyen } from "@/utils/vi_tri";
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

  console.log("jobb:::", job);
  return (
    <div className="flex m-1">
      <div className={styles.about_job}>
        <div
          className={`${styles.image_container}" flex justify-center items-center mr-3" `}
        >
          <Image
            height={80}
            width={80}
            className={styles.avatar_ntd}
            // src="/images/no-avartar-user.png"
            // data-src={
            //   job?.ntd_avatar != ""
            //     ? job?.ntd_avatar
            //     : "/images/no-avartar-user.png"
            // }
            src={job?.linkAvatar ? job?.linkAvatar : "/images/no-avartar-user.png"}
            // onError={(e: any) => {
            //   e.target.onerror = null;
            //   e.target.src = "/images/no-avartar-user.png";
            // }}
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
            <p className="font-bold mb-2.5">
              <span className="font-normal">
                {quan_huyen[job?.quan_huyen - 66]?.cit_name}
              </span> {", "}
              <span className="font-normal">
                {tinh_thanh[job?.dia_diem-1]?.cit_name}
              </span>
              
              </p>
            {/* <p className={styles.city_address}>{job?.ntd_address}</p> */}
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
            <span className={styles.working_time}> Hình thức: {" "}
              {renderSchedules[job?.hinh_thuc]}
            </span>
          </div>
          <div className="flex ">
            <img className="mr-2.5" src="/images/balo.svg" alt="balo" />
            <span className={styles.working_time}>Lĩnh vực: {" "}
              {renderProfession[job?.nganh_nghe]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;

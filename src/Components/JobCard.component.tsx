"use client";
import styles from "@/Css/homePage.module.css";
import { renderPayrollMethods } from "@/constants/EditProfile.constant";
import { basePath } from "@/constants/Head.constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

function JobCard({ job }: any) {
  const router = useRouter();
  const id = useMemo(() => {
    return job ? job.id_vieclam : 0;
  }, []);
  return (
    <div className={styles.about_job}>
      <div className="h-20 w-20 flex justify-center items-center">
        <img className={styles.img} src={job?.ntd_avatar} alt="photo" />
      </div>
      <div className="job_detail">
        <h3 className={styles.td + ` cursor-pointer hover:underline`}>
          <Link href={`${basePath}/${job.alias}-${id}.html`}>
            {job?.vi_tri}
          </Link>
        </h3>
        <p className="flex">
          <img className="mr-2.5" src="/images/map.svg" alt="dot" />{" "}
          <div className={styles.city_address}>{job?.ntd_address}</div>
        </p>
        <p className="flex">
          <img className="mr-2.5" src="/images/dola.svg" alt="$" />{" "}
          <span className={styles.salary}>
            {job?.muc_luong} VND/
            {renderPayrollMethods[job?.tra_luong]}
          </span>
        </p>
        <p className="flex">
          <img className="mr-2.5" src="/images/balo.svg" alt="balo" />
          <span className={styles.working_time}>
            {job?.hinh_thuc == 1
              ? "Toàn thời gian"
              : job?.hinh_thuc == 2
              ? "Bán thời gian"
              : "Theo ca"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default JobCard;

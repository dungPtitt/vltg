"use client";
import styles from "@/Css/uvProfile.module.css";
import { useEffect, useState } from "react";
import UvTTLH from "./UvTTLH.layout";
import UvCVMM from "./UvCVMM.layout";
import UvKNBT from "./UvKNBT.layout";
import UvKNLV from "./UvKNLV.layout";
import UvBCTDL from "./UvBCTDL.layout";
import Image from "next/image";
import { axiosSauDN } from "@/utils/axios.config";
import { useRouter } from "next/navigation";
function UvProfile() {
  const arrNavbars = [
    { url: "/images/ttlh.svg", content: "Thông tin liên hệ", value: "ttlh" },
    { url: "/images/cvmm.svg", content: "Công việc mong muốn", value: "cvmm" },
    { url: "/images/knbt.svg", content: "Kỹ năng bản thân", value: "knbt" },
    {
      url: "/images/knlv0.svg",
      content: "Kinh nghiệm làm việc",
      value: "knlv",
    },
    { url: "/images/bctdl.svg", content: "Buổi có thể đi làm", value: "bctdl" },
  ];
  const router = useRouter();
  const [choiceOption, setChoiceOption] = useState("ttlh");
  const findFile = arrNavbars.find((file) => file.value == choiceOption);
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    axiosSauDN
      .post("/manageAccountCandidate/getInfoCandidate")
      .then((res) => {
        console.log("ress>>", res);
        setUserData(res.data.data.data)
      })
      .catch((err) => console.log("UvProfile", err));
  }, []);
  return (
    <div className="m-5">
      <div className={styles.frame_general}>
        <div className="ml-4 text-lg font-semibold">
          Hồ sơ xin việc online ( Chưa hoàn thành )
        </div>
        <div className="flex">
          <div className={styles.general_lf}>
            <div className={styles.box_circle}>
              <div>Tiến trình hồ sơ</div>
              <Image
                width={112}
                height={112}
                className="w-28 h-28 rounded-full mb-3"
                src={userData?.linkAvatar}
                alt=""
              />
              <button
                className="h-6 w-24 flex items-center justify-center bg-yellow-300 rounded  border-2 border-blue-400 hover:bg-white hover:text-blue-500"
                onClick={() => router.push("/hoan-thien-ho-so-ung-vien.html")}
              >
                Hoàn thiện
              </button>
            </div>
            <div className={styles.general_option}>
              {arrNavbars.map((nav, index) => (
                <div
                  key={index}
                  onClick={() => setChoiceOption(nav.value)}
                  className={
                    styles.option_item +
                    " cursor-pointer " +
                    (choiceOption == nav.value && styles.active_choice)
                  }
                >
                  <img src={nav.url} alt="" /> {nav.content}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.general_rg}>
            <div className="font-bold mb-2.5 pb-2.5">{findFile?.content}</div>
            {choiceOption == "ttlh" && <UvTTLH />}
            {choiceOption == "cvmm" && <UvCVMM />}
            {choiceOption == "knbt" && <UvKNBT />}
            {choiceOption == "knlv" && <UvKNLV />}
            {choiceOption == "bctdl" && <UvBCTDL />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UvProfile;

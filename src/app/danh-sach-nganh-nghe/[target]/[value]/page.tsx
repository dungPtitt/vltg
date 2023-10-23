"use client";
import Footer from "@/Components/Footer.component";
import JobCard from "@/Components/JobCard.component";
import SearchJob from "@/Components/SearchJob.component";
import Header from "@/Layout/Header.layout";
import {
  schedules,
  profession,
  renderProfession,
} from "@/constants/EditProfile.constant";
import { axiosTruocDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import styles from "@/Css/homePage.module.css";
import { cityOption, districtOption } from "@/utils/vi_tri";
import BlockDownApp from "@/Components/BlockDownApp";
import { convertNameToSlug } from "@/utils/generalFunction";
import TuKhoaCongViecLQ from "@/Components/TuKhoaCongViecLQ";
import DiaDiemLQ from "@/Components/DiaDiemLQ";
import { Pagination } from "antd";
import {
  HeadListJob,
  HeadSearchByAdress,
  HeadSearchByProfession,
} from "@/constants/Head.constant";
import { usePathname } from "next/navigation";
function DanhSachNganhNghe({ params }: any) {
  const { target, value } = params;
  const pathName = usePathname();
  const [noiTimKiem, setNoiTimKiem] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [luaChonShow, setLuaChonShow] = useState<number>(0);
  const [blog, setBlog] = useState<any>();
  const [duLieuViecLam, setDuLieuViecLam] = useState<any>([]);
  const [page, setPage] = useState(0);
  //1 hình thức làm việc
  //2 ngành nghề
  //3 city

  const [chonHead, setChonHead] = useState<Number>(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    try {
      if (
        schedules.some((sc) => target?.includes(convertNameToSlug(sc.label)))
      ) {
        setChonHead(1);
    
        setNoiTimKiem([...schedules]);
        axiosTruocDN
          .post("/viecLam/thongKeDanhSachViecLam", {
            id_hinhthuc: Number(value),
          })
          .then((res) => {
            setBlog(res.data.data.listBlog[0]);
            setDuLieuViecLam([...res.data.data.data]);
          });
      } else if (
        profession.some((pf) => target?.includes(convertNameToSlug(pf.label)))
      ) {
      
        setNoiTimKiem([...profession]);
        setLuaChonShow(1);
        setChonHead(2);
        axiosTruocDN
          .post("/viecLam/thongKeDanhSachViecLam", {
            id_nganh: Number(value),
          })
          .then((res) => {
            setBlog(res.data.data.listBlog[0]);
            setDuLieuViecLam([...res.data.data.data]);
          });
        // setLuaChonTimKiem({ id_nganh: value });
      } else if (
        cityOption.some((city) =>
          target?.includes(convertNameToSlug(city.label))
        )
      ) {
        setChonHead(3);
        axiosTruocDN
          .post("/viecLam/thongKeDanhSachViecLam", {
            id_city: Number(value),
          })
          .then((res) => {
            setLuaChonShow(2);
            setTotal(res.data.data.total);
            setBlog(res.data.data.listBlog[0]);
            setDuLieuViecLam([...res.data.data.data]);
          });
        setNoiTimKiem([...cityOption]);
        setLuaChonShow(1);
      }
    } catch (error) {
      console.log("errr", error);
    }
  }, []);
  return (
    <>
      {chonHead == 1 && <HeadListJob url={pathName} />}
      {chonHead == 2 && (
        <HeadSearchByProfession
          profession={renderProfession[value]}
          pathUrl={pathName}
        />
      )}
      {chonHead == 3 ? (
        <HeadSearchByAdress
          city={cityOption[Number(value) - 1].label}
          district={""}
        />
      ) : (
        ""
      )}

      <div className="flex flex-col items-center">
        <Header />
        <SearchJob />
        <div className="w-4/5 mt-4 mb-32">
          <h1 className={styles.hinh_thuc_cong_viec}>
            VIỆC LÀM {luaChonShow === 2 && ` THEO GIỜ TẠI `}
            {noiTimKiem
              .find((tk: any) => tk.value == value)
              ?.label.toUpperCase()}
            {luaChonShow === 1 && Number(value) < 10 && " THEO GIỜ"}
          </h1>
          <div className="w-full pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {duLieuViecLam.length > 0 &&
              duLieuViecLam.map((job: any) => (
                <JobCard key={job.id_vieclam} job={job} />
              ))}
          </div>
        </div>
        <BlockDownApp />
        <div className="w-9/12 mt-3">
          <TuKhoaCongViecLQ />
          <DiaDiemLQ />
        </div>
        <Pagination
          total={total}
          showQuickJumper
          showSizeChanger
          onChange={(current, newPageSize) => {
            if (newPageSize != pageSize) {
              setPage(1);
              setPageSize(newPageSize);
            } else {
              setPage(current);
            }
          }}
        />
        <div className="flex flex-col items-center overflow-hidden">
          <div
            className="w-4/5 p-20"
            dangerouslySetInnerHTML={{ __html: blog?.jc_bv }}
          ></div>
          <div
            className="w-4/5"
            dangerouslySetInnerHTML={{ __html: blog?.key_ndgy }}
          ></div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default DanhSachNganhNghe;

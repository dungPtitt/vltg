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
  const [page, setPage] = useState(1);
  //1 hình thức làm việc
  //2 ngành nghề
  //3 city

  const [chonHead, setChonHead] = useState<Number>(0);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  },[]);
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
            page,
            pageSize
          })
          .then((res) => {
            setBlog(res?.data?.data?.listBlog[0]);
            setDuLieuViecLam([...res?.data?.data?.data]);
            let total = res?.data?.data?.total;
            let numberPage = Math.ceil(total / pageSize);
            setTotal(numberPage);
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
            page,
            pageSize
          })
          .then((res) => {
            setBlog(res.data.data.listBlog[0]);
            setDuLieuViecLam([...res.data.data.data]);
            let total = res?.data?.data?.total;
            let numberPage = Math.ceil(total / pageSize);
            setTotal(numberPage);
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
            page,
            pageSize
          })
          .then((res) => {
            setLuaChonShow(2);
            setTotal(res.data.data.total);
            setBlog(res.data.data.listBlog[0]);
            setDuLieuViecLam([...res.data.data.data]);
            let total = res?.data?.data?.total;
            let numberPage = Math.ceil(total / pageSize);
            setTotal(numberPage);
          });
        setNoiTimKiem([...cityOption]);
        setLuaChonShow(1);
      }
    } catch (error) {
      console.log("errr", error);
    }
  }, [page]);
  console.log("blog:::", blog);
  return (
    <>
      {chonHead == 1 && <HeadListJob url={pathName} fullPath={fullPath}/>}
      {chonHead == 2 && (
        <HeadSearchByProfession
          hostName={fullPath}
          profession={renderProfession[value]}
          pathUrl={pathName}
        />
      )}
      {chonHead == 3 ? (
        <HeadSearchByAdress
        fullPath={fullPath}
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
        <div className="flex justify-center items-center mt-4 mb-5" style={{}}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="disabled:opacity-50"
          >
            <img className="mr-2.5" src="/images/arrow-l.svg" alt="arrow-left" style={{width: '30px', height: '30px'}}/>
          </button>
          <span style={{marginRight: '10px'}}>
            {page} / {total} {"trang"}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, total))}
            disabled={page === total}
            className="disabled:opacity-50"
          >
            <img className="mr-2.5" src="/images/arrow-r.svg" alt="next" style={{width: '30px', height: '30px'}}/>
          </button>
        </div>
        {/* <Pagination
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
        /> */}
        {/* <BlockDownApp />
        <div className="w-9/12 mt-3">
          <TuKhoaCongViecLQ />
          <DiaDiemLQ />
        </div> */}

        {/* <div className="flex flex-col items-center overflow-hidden w-full">
          <div
            className="w-4/5 "
            dangerouslySetInnerHTML={{ __html: blog?.jc_bv }}
          ></div>
          <div
            className="w-4/5"
            dangerouslySetInnerHTML={{ __html: blog?.key_ndgy }}
          ></div>
        </div> */}

        <Footer />
      </div>
    </>
  );
}

export default DanhSachNganhNghe;

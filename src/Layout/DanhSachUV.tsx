"use client";
import Footer from "@/Components/Footer.component";
import Header from "@/Layout/Header.layout";
import { axiosSauDN } from "@/utils/axios.config";
import { useEffect, useState } from "react";
import TuKhoaCongViecLQ from "@/Components/TuKhoaCongViecLQ";
import DiaDiemLQ from "@/Components/DiaDiemLQ";
import BlockCVDep from "@/Components/BlockCVDep";
import UVCard from "@/Components/UVCard";
import { Button, Pagination } from "antd";
import SearchUV from "@/Components/SearchUV";
import { useSearchParams } from "next/navigation";
import NTDTKUV from "@/Components/NtdTKUV";
import { HeadDefault } from "@/constants/Head.constant";
import { profession, schedules } from "@/constants/EditProfile.constant";
import { cityOption } from "@/utils/vi_tri";

function DanhSachUv() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const city = searchParams.get("city");
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [danhSachUngVien, setDanhSachUngVien] = useState<any>([]);
  const [fullPath, setFullPath] = useState<any>("");
  const [recall, setReCall] = useState(false);
  const [searchOption, setSearchOption] = useState<any>({
    id_hinhthuc: "",
    id_nganh: "",
    id_city: "",
  });
  useEffect(() => {
    // console.log("page:::", 111);
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
    handleGetData()
  }, [page, recall, searchOption]);

  const handleGetData = () => {
    console.log("option", searchOption)
    try {
      axiosSauDN
        .post("/manageAccountCompany/thongKeDanhSachUngVien", {
          page: page,
          pageSize: pageSize,
          key,
          id_city: city,
          ...searchOption
        })
        .then((res) => {
          setTotal(res.data.data.total);
          setDanhSachUngVien([...res.data.data.data]);
        });
    } catch (error) {
      console.log("errr", error);
    }
  }
  console.log("danhSachUngVien:::", danhSachUngVien);
  // console.log("recalll::::", recall)
  return (
    <>
      <HeadDefault fullPath={fullPath} title={"Danh sách ứng viên"} />
      <div className="flex flex-col items-center">
        <Header />
        <SearchUV />
        <div className="flex w-4/5">
          <div className="w-4/5 mt-4 mb-32 mr-10">
            <div className="font-bold text-xl text-blue-900">
              Danh sách ứng viên theo giờ
            </div>
            {/* <Button
              onClick={() => { 
                setReCall(!recall);
              }}
            >
              Load lại
            </Button> */}
            <div className="flex">
              <div className="w-full">
                {/* <label htmlFor="uv_nganh_nghe" className="block text-sm font-medium text-gray-700">
                  Ngành nghề
                </label> */}
                <select
                  onChange={(e)=> setSearchOption({...searchOption, id_hinhthuc: e.target.value})}
                  id="id_hinhthuc"
                  name="id_hinhthuc"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Hình thức</option>
                  {schedules.map((schedule) => (
                    <option key={schedule.value} value={schedule.value}>
                      {schedule.label}
                    </option>
                  ))

                  }
                </select>
              </div>
              <div className=" w-full">
                
                <select
                  onChange={(e)=> setSearchOption({...searchOption, id_nganh: e.target.value})}
                  id="id_nganh"
                  name="id_nganh"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Chọn ngành nghề</option>
                  {profession.map((pro) => (
                    <option key={pro.value} value={pro.value}>
                      {pro.label}
                    </option>
                  ))
                  }
                </select>
              </div>
              <div className="w-full">
                
                <select
                  onChange={(e)=> setSearchOption({...searchOption, id_city: e.target.value})}
                  id="id_city"
                  name="id_city"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Chọn địa điểm</option>
                  {cityOption.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))

                  }
                </select>
              </div>
            </div>
            
            <div className="w-full">
              {danhSachUngVien.length > 0 &&
                danhSachUngVien.map((data: any) => (
                  <UVCard key={data._id} data={data} setReCall={setReCall} recall={recall} />
                ))}
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
          </div>
          {/* <NTDTKUV /> */}
        </div>

        {/* <div className="4/5">
          <TuKhoaCongViecLQ />
          <DiaDiemLQ />
        </div> */}
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
        {/* <BlockCVDep /> */}
        <Footer />
      </div>
    </>
  );
}

export default DanhSachUv;

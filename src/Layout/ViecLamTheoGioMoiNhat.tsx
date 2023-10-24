"use client";
import Footer from "@/Components/Footer.component";
import JobCard from "@/Components/JobCard.component";
import SearchJob from "@/Components/SearchJob.component";
import Vlmn from "@/Components/Vlmn.component";
import Header from "@/Layout/Header.layout";
import { axiosTruocDN } from "@/utils/axios.config";
import { cityOption, districtOption } from "@/utils/vi_tri";
import { Pagination } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ViecLamTheoGioMoiNhat({ checkOneSite }: any) {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const city = searchParams.get("city");
  const district = searchParams.get("district");
  const [listData, setListData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (key) {
      axiosTruocDN
        .post("/viecLam/timKiemViecLam", { key, city, district })
        .then((res) => {
          setTotal(res.data.data.total);
          setListData(res.data.data.data);
        })
        .catch((err) => console.log("VLTGMN", err));
    }
  }, [page]);

  return (
    <div className="w-full ">
      <Header />
      <SearchJob />
      {key ? (
        <div>
          <div className="flex justify-center my-10">
            <div className="w-4/5">
              <h1 className="underline text-blue-800 text-lg font-bold">
                KẾT QUẢ TÌM KIẾM VIỆC LÀM {`" ${key.toUpperCase()} "`}{" "}
                {(city || district) &&
                  ` TẠI ${
                    district
                      ? districtOption[
                          Number(district) - 66
                        ].label.toUpperCase()
                      : ""
                  } ${
                    city ? cityOption[Number(city) - 1].label.toUpperCase() : ""
                  }`}{" "}
              </h1>
              <div className="lg:grid grid-cols-2">
                {listData.length > 0 &&
                  listData.map((job: any, index: number) => (
                    <JobCard key={index} job={job} />
                  ))}
              </div>
            </div>
          </div>
          <div></div>
          <div className="flex justify-center">
            <Pagination
              className="w-4/5"
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
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <Vlmn check={true} />
        </div>
      )}

      <Footer />
    </div>
  );
}
export default ViecLamTheoGioMoiNhat;

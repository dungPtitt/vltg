"use client";
import btnStyles from "@/Css/button.module.css";
import { axiosSauDN } from "@/utils/axios.config";
import { Input, Select } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Suspense, useEffect, useState } from "react";
import Admin_CKEditor from "./Admin_CKEditor";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { useRouter } from "next/navigation";
import { cityOption } from "@/utils/vi_tri";
function Admin_TT_DS() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [recall, setRecall] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>();
  const [mainContent, setMainContent] = useState<any>();
  const [secondContent, setSecondContent] = useState<any>();
  const [danhsachTT, setDanhSachTT] = useState<any>([]);
  const [searchOption, setSearchOption] = useState<any>();
  const handleData = (datas: any) => {
    setDanhSachTT([
      ...datas.map((tt: any, index: number) => ({
        key: tt.cit_id,
        stt: (page - 1) * pageSize + index + 1,
        city: tt.cit_name,
        link: (
          <div
            className="cursor-pointer hover:text-blue-500"
            onClick={() =>
              router.push(`/danh-sach-nganh-nghe/tinh-thanh/${tt.cit_id}`)
            }
          >
            Việc làm tại {tt.cit_name}
          </div>
        ),
        description: tt.cit_tdgy,
        edit: (
          <div
            className="cursor-pointer"
            onClick={() => {
              setDataEdit(tt);
              setMainContent(tt.cit_bv);
              setSecondContent(tt.cit_ndgy);
              setShowEdit(true);
            }}
          >
            <img src="/images/edit.png" alt="" />
          </div>
        ),
      })),
    ]);
  };
  useEffect(() => {
    axiosSauDN
      .post("/admin/danhSachCity", {
        ...searchOption,
        page: page,
        pageSize: pageSize,
        type: 2,
      })
      .then((res) => {
        handleData(res.data.data.data);
        setTotal(res.data.data.total);
      })
      .catch((err) => console.log("danh sach tag", err));
  }, [recall, page]);
  const columns: ColumnsType<any> = [
    { title: "Stt", dataIndex: "stt" },
    { title: "Tỉnh thành", dataIndex: "city" },
    { title: "Link dẫn", dataIndex: "link" },
    { title: "Mô tả", dataIndex: "description" },
    { title: "Sửa", dataIndex: "edit" },
  ];
  const handleUpdate = () => {
    if (!dataEdit.cit_tdgy || !mainContent || !secondContent) {
      notifyWarning("Nhập đầy đủ thông tin!");
    } else {
      axiosSauDN
        .post("/admin/updateCity", {
          ...dataEdit,
          cit_bv: mainContent,
          cit_ndgy: secondContent,
          cit_time: Date.now(),
        })
        .then((res) => {
          setRecall(!recall);
          notifySuccess("Cập nhập thành công!");
        })
        .catch(() => notifyError("Vui lòng thử lại sau"));
    }
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleDeleteCity = () => {
    axiosSauDN
      .post("/admin/deleteCity", { moduleId: 38, arrId: selectedRowKeys })
      .then((res) => {
        setRecall(!recall);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  return (
    <div className="w-full ">
      {showEdit ? (
        <div>
          <div className="flex items-center mb-3">
            {" "}
            Tiêu đề gợi ý
            <Input
              className="w-96 ml-4"
              value={dataEdit.cit_tdgy}
              onChange={(e) =>
                setDataEdit({ ...dataEdit, cit_tdgy: e.target.value })
              }
            />
          </div>
          <Suspense fallback={<></>}>
            <Admin_CKEditor
            mainContent={mainContent}
            setMainContent={setMainContent}
            secondContent={secondContent}
            setSecondContent={setSecondContent}
            />
          </Suspense>
          <div className="flex justify-center ">
            <button
              onClick={handleUpdate}
              className={btnStyles.btn_primary + " mr-3"}
            >
              {" "}
              Lưu
            </button>
            <button
              onClick={() => setShowEdit(false)}
              className={btnStyles.btn_outline_primary}
            >
              {" "}
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <Select
              options={cityOption}
              style={{ width: "15%", marginRight: "6px" }}
              onChange={(e) => setSearchOption({ cit_id: e })}
              placeholder="Tỉnh thành"
            />
            <button
              onClick={() => setRecall(!recall)}
              className="bg-red-600 text-white ml-3 px-1"
            >
              {" "}
              Tìm kiếm
            </button>
            <button
              onClick={handleDeleteCity}
              className={`${
                selectedRowKeys.length == 0 && "hidden"
              }  bg-red-500 text-white ml-3 rounded-md px-2 py-1`}
            >
              {" "}
              Xóa {selectedRowKeys.length} tỉnh thành
            </button>
          </div>

          <Table
            className="mt-3 w-full"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={danhsachTT}
            pagination={{
              total: total,
              onChange(page, pageSize) {
                if (pageSize != pageSize) {
                  setPageSize(pageSize);
                  setPage(1);
                } else {
                  setPage(page);
                }
              },
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Admin_TT_DS;

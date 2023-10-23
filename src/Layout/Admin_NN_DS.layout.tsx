import { axiosSauDN } from "@/utils/axios.config";
import {
  convertNameToSlug,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { Input } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import Admin_CKEditor from "./Admin_CKEditor";
import { useRouter } from "next/navigation";
import btnStyles from "@/Css/button.module.css";
import { renderProfession } from "@/constants/EditProfile.constant";
function Admin_NN_DS() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [recall, setRecall] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>();
  const [danhSachTag, setDanhSachTag] = useState<any>([]);
  const [mainContent, setMainContent] = useState<any>();
  const [secondContent, setSecondContent] = useState<any>();
  const [searchOption, setSearchOption] = useState<any>();
  useEffect(() => {
    axiosSauDN
      .post("/admin/danhSachTag", {
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

  const handleData = (datas: any) => {
    const dataConvert = datas.map((tag: any, index: number) => ({
      key: tag.jc_id,
      stt: (page - 1) * pageSize + index + 1,
      id: tag.jc_id,
      nameJob: tag.jc_name,
      linkJob: (
        <div
          onClick={() =>
            router.push(
              `/viec-lam-${convertNameToSlug(renderProfession[tag.jc_id])}-${
                tag.jc_id
              }.html`
            )
          }
          className="cursor-pointer hover:text-blue-500"
        >
          Xem chi tiết {tag.jc_name}
        </div>
      ),
      edit: (
        <div
          className="cursor-pointer"
          onClick={() => {
            setDataEdit(tag);
            setMainContent(tag.jc_bv);
            setSecondContent(tag.key_ndgy);
            setShowEdit(true);
          }}
        >
          <img src="/images/edit.png" alt="" />
        </div>
      ),
    }));
    setDanhSachTag(dataConvert);
  };
  const handleDeleteTag = () => {
    axiosSauDN
      .post("/admin/deleteTin", { moduleId: 94, arrId: selectedRowKeys })
      .then((res) => {
        setSelectedRowKeys([]);
        setRecall(!recall);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleUpdate = () => {
    if (!dataEdit.key_tdgy || !mainContent || !secondContent) {
      notifyWarning("Nhập đầy đủ thông tin!");
    } else {
      axiosSauDN
        .post("/admin/updateTag", {
          ...dataEdit,
          jc_bv: mainContent,
          key_ndgy: secondContent,
        })
        .then((res) => {
          setRecall(!recall);
          notifySuccess("Cập nhập thành công!");
        })
        .catch(() => notifyError("Vui lòng thử lại sau"));
    }
  };
  const columns: ColumnsType<any> = [
    { title: "Stt", dataIndex: "stt" },
    { title: "ID", dataIndex: "id" },
    { title: "Tên nghề", dataIndex: "nameJob" },
    { title: "Link Nghề", dataIndex: "linkJob" },
    { title: "Sửa", dataIndex: "edit" },
  ];
  return (
    <div>
      {showEdit ? (
        <div>
          <div className="flex items-center mb-3">
            {" "}
            Tiêu đề gợi ý
            <Input
              className="w-96 ml-4"
              value={dataEdit.key_tdgy}
              onChange={(e) =>
                setDataEdit({ ...dataEdit, key_tdgy: e.target.value })
              }
            />
          </div>
          <Admin_CKEditor
            mainContent={mainContent}
            setMainContent={setMainContent}
            secondContent={secondContent}
            setSecondContent={setSecondContent}
          />
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
            <Input
              style={{ width: "15%", marginRight: "6px" }}
              type="number"
              placeholder="ID"
              onChange={(e) =>
                setSearchOption({
                  ...searchOption,
                  jc_id: Number(e.target.value),
                })
              }
            />
            <Input
              style={{ width: "15%", marginRight: "6px" }}
              type="text"
              placeholder="Tên tag"
              onChange={(e) =>
                setSearchOption({
                  ...searchOption,
                  jc_name: e.target.value,
                })
              }
            />
            <button
              onClick={() => setRecall(!recall)}
              className="bg-red-600 text-white ml-3 px-1"
            >
              {" "}
              Tìm kiếm
            </button>
            <button
              onClick={handleDeleteTag}
              className={`${
                selectedRowKeys.length == 0 && "hidden"
              }  bg-red-500 text-white ml-3 rounded-md px-2 py-1`}
            >
              {" "}
              Xóa {selectedRowKeys.length} ngành nghề
            </button>
          </div>

          <Table
            className="mt-3"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={danhSachTag}
            pagination={{
              total: total,
              pageSize: pageSize,
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

export default Admin_NN_DS;

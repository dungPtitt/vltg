import { axiosSauDN } from "@/utils/axios.config";
import {
  convertDateDMYcheo,
  convertDateYMDcheo,
  convertNameToSlug,
  notifyError,
} from "@/utils/generalFunction";
import { Checkbox, DatePicker, Input, Select } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import Admin_TTD_TM from "./Admin_TTD_TM.layout";
import btnStyles from "@/Css/button.module.css";
import { useRouter } from "next/navigation";
function Admin_TTD_DS() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [danhSachTTD, setDanhSachTTD] = useState<any>([]);
  const [tongDuLieu, setTongDuLieu] = useState<number>();
  const [pageSize, setPageSize] = useState(10);
  const [pageShow, setPageShow] = useState(1);
  const [optionSearch, setOptionSearch] = useState<any>({});
  const [dataEdit, setDataEdit] = useState<any>();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [recall, setRecall] = useState(true);

  useEffect(() => {
    axiosSauDN
      .post("/admin/danhSachTin", {
        ...optionSearch,
        page: pageShow,
        pageSize: pageSize,
      })
      .then((res) => {
        setTongDuLieu(res.data.data.total);
        handleData(res.data.data.data);
      })
      .catch((err) => console.log("TTD", err));
  }, [pageShow, recall]);

  const columns: ColumnsType<any> = [
    { title: "Stt", dataIndex: "stt" },
    { title: <img src="/images/save.png" />, dataIndex: "save" },
    { title: "ID", dataIndex: "id_vieclam" },
    { title: "ID Cty", dataIndex: "id_ntd" },
    { title: "Tiêu đề", dataIndex: "vi_tri" },
    { title: "Tên công ty", dataIndex: "userName" },
    { title: "Mô tả", dataIndex: "mo_ta" },
    // { title: "Yêu cầu", dataIndex: "yeu_cau" },
    { title: "Ngày đăng tin", dataIndex: "created_at" },
    {
      title: "Active",
      dataIndex: "active",
      render: (_: any, record: any) => {
     
        return (
          <Checkbox
            onChange={(e) => handleChangeActive(e, record)}
            checked={record.active.props.checked == 0 ? false : true}
          />
        );
      },
    },
    { title: "Sửa", dataIndex: "edit" },
  ];
  const handleChangeTable = (current: number, newPageSize: number) => {
    if (newPageSize != pageSize) {
      setPageShow(1);
      setPageSize(newPageSize);
    } else {
      setPageShow(current);
    }
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {

    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleXoaTin = () => {
    axiosSauDN
      .post("/admin/deleteTin", { moduleId: 97, arrId: selectedRowKeys })
      .then((res) => {
        setRecall(!recall);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  };
  const handleChangeActive = (e: any, record: any) => {
    axiosSauDN
      .post("/admin/activeTin", {
        id_vieclam: record.key,
        active: e.target.checked ? 1 : 0,
      })
      .then((res) => {
  
        const recordIndex = danhSachTTD.findIndex(
          (ttd: any) => ttd.key == record.key
        );
        danhSachTTD[recordIndex] = {
          ...danhSachTTD[recordIndex],
          active: {
            ...danhSachTTD[recordIndex].active,
            props: {
              ...danhSachTTD[recordIndex].active.props,
              checked: e.target.checked,
            },
          },
        };

        setDanhSachTTD([...danhSachTTD]);
      })
      .catch((res) => notifyError("Vui lòng thử lại sau!"));
  };
  const handleData = async (data: any) => {
    console.log(" dataaaa:", data);
    const exportData = [];
    for (let i = 0; i < data.length; i++) {
      exportData.push({
        // key: (pageShow - 1) * pageSize + i + 1,
        key: data[i].id_vieclam,
        stt: (pageShow - 1) * pageSize + i + 1,
        save: <img className="cursor-pointer" src="/images/save.png" />,
        id_vieclam: (
          <div
            onClick={() =>
              router.push(
                `/${convertNameToSlug(data[i].vi_tri)}-co${
                  data[i].id_vieclam
                }.html`
              )
            }
            className="cursor-pointer hover:text-blue-500"
          >
            {data[i].id_vieclam}
          </div>
        ),
        id_ntd: data[i].id_ntd,
        vi_tri: (
          <div
            onClick={() =>
              router.push(
                `/${convertNameToSlug(data[i].vi_tri)}-co${
                  data[i].id_vieclam
                }.html`
              )
            }
            className="cursor-pointer hover:text-blue-500"
          >
            {data[i].vi_tri}
          </div>
        ),
        userName: data[i].userName,
        // mo_ta: data[i].mo_ta,
        mo_ta: (
          <p>
            {data[i]?.mo_ta?.split('\n').map((line: any, index: any) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        ),
        // yeu_cau: (
        //   <p>
        //     {data[i]?.yeu_cau?.split('\n').map((line: any, index: any) => (
        //       <span key={index}>
        //         {line}
        //         <br />
        //       </span>
        //     ))}
        //   </p>
        // ),
        created_at: convertDateDMYcheo(data[i].created_at * 1000),
        active: (
          <Checkbox
            onChange={(e) => handleChangeActive(e, data[i].id_vieclam)}
            checked={data[i].active == 0 ? false : true}
          />
        ),
        edit: (
          <div
            onClick={() => (setShowEdit(true), setDataEdit(data[i]))}
            className="cursor-pointer"
          >
            <img src="/images/edit.png" alt="" />
          </div>
        ),
      });
    }
    setDanhSachTTD([...exportData]);
  };
  return showEdit ? (
    <Admin_TTD_TM dataEdit={dataEdit} setShowEdit={setShowEdit} />
  ) : (
    <div>
      <div className="flex items-center">
        <Input
          style={{ width: "10%", marginRight: "6px" }}
          type="text"
          placeholder="ID"
          onChange={(e) =>
            setOptionSearch({
              ...optionSearch,
              id_vieclam: e.target.value,
            })
          }
        />
        <Input
          style={{ width: "10%", marginRight: "6px" }}
          type="text"
          placeholder="ID cty"
          onChange={(e) =>
            setOptionSearch({ ...optionSearch, id_ntd: e.target.value })
          }
        />
        <Input
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Tiêu đề"
          onChange={(e) =>
            setOptionSearch({ ...optionSearch, vi_tri: e.target.value })
          }
        />
        <Input
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Tên công ty"
          onChange={(e) =>
            setOptionSearch({
              ...optionSearch,
              name_ntd: e.target.value,
            })
          }
        />
        <label className="mr-2">Từ :</label>
        <DatePicker
          onChange={(e) =>
            setOptionSearch({
              ...optionSearch,
              fromDate: convertDateYMDcheo(e),
            })
          }
        />
        <label className="m-2">đến :</label>
        <DatePicker
          onChange={(e) =>
            setOptionSearch({ ...optionSearch, toDate: convertDateYMDcheo(e) })
          }
        />
        <button
          onClick={() => setRecall(!recall)}
          className="bg-blue-500 text-white ml-3 rounded-md px-2 py-1"
        >
          {" "}
          Tìm kiếm
        </button>
        <button
          onClick={handleXoaTin}
          className={`${
            selectedRowKeys.length == 0 && "hidden"
          }  bg-red-500 text-white ml-3 rounded-md px-2 py-1`}
        >
          {" "}
          Xóa {selectedRowKeys.length} tin tuyển dụng
        </button>
      </div>

      <Table
        className="mt-3"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={danhSachTTD}
        pagination={{
          total: tongDuLieu,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange(page, pageSize) {
            handleChangeTable(page, pageSize);
          },
        }}
      />
    </div>
  );
}

export default Admin_TTD_DS;

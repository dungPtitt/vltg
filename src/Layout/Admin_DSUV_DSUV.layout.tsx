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
import Admin_DSUV_TM from "./Admin_DSUV_TM.layout";
import btnStyles from "@/Css/button.module.css";
import { useRouter } from "next/navigation";
function Admin_DSUV_DSUV() {
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
      .post("/admin/danhSachUngVien", {
        ...optionSearch,
        type: 1,
        page: pageShow,
        pageSize: pageSize,
      })
      .then((res) => {
        console.log("DSNTD", res);
        setTongDuLieu(res.data.data.total);
        handleData(res.data.data.data);
      })
      .catch((err) => console.log("TTD", err));
  }, [pageShow, recall]);

  const columns: ColumnsType<any> = [
    { title: "Stt", dataIndex: "stt" },
    { title: <img src="/images/save.png" />, dataIndex: "save" },
    { title: "ID", dataIndex: "_id" },
    { title: "Họ và tên", dataIndex: "userName" },
    { title: "Số điện thoại", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Địa chỉ", dataIndex: "address" },
    { title: "Ngày tạo tài khoản", dataIndex: "createdAt" },
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
        _id: (
          <div
            onClick={() =>
              router.push(
                `/${convertNameToSlug(data[i].vi_tri)}-co${
                  data[i]._id
                }.html`
              )
            }
            className="cursor-pointer hover:text-blue-500"
          >
            {data[i]._id}
          </div>
        ),
        userName: data[i].userName,
        phone: (
          <div
            onClick={() =>
              router.push(
                `/${convertNameToSlug(data[i].vi_tri)}-co${
                  data[i]._id
                }.html`
              )
            }
            className="cursor-pointer hover:text-blue-500"
          >
            {data[i].vi_tri}
          </div>
        ),
        email: data[i].email,
        address: data[i].address,
        createdAt: convertDateDMYcheo(data[i].createdAt * 1000),
        active: (
          <Checkbox
            onChange={(e) => handleChangeActive(e, data[i]._id)}
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
    <Admin_DSUV_TM dataEdit={dataEdit} setShowEdit={setShowEdit} />
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
              _id: e.target.value,
            })
          }
        />
        <Input
          style={{ width: "10%", marginRight: "6px" }}
          type="text"
          placeholder="Họ và tên"
          onChange={(e) =>
            setOptionSearch({ ...optionSearch, userName: e.target.value })
          }
        />
        <Input
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Số điện thoại"
          onChange={(e) =>
            setOptionSearch({ ...optionSearch, phone: e.target.value })
          }
        />
        <Input
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setOptionSearch({
              ...optionSearch,
              email: e.target.value,
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
            onClick={() => {
              console.log("optionSearch", optionSearch);
              setRecall(!recall);
          }}
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

export default Admin_DSUV_DSUV;

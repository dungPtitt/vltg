
import { Button, Modal, Input, Checkbox, DatePicker } from "antd";
import { use, useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { axiosSauDN } from "@/utils/axios.config";
import { convertDateDMYcheo, convertNameToSlug, convertDateYMDcheo, notifyError } from "@/utils/generalFunction";
import { useRouter } from "next/navigation";
import Table, { ColumnsType } from "antd/es/table";
import Admin_DSNTD_TM from "./Admin_DSNTD_TM.layout";


function App() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [danhSachNTD, setDanhSachNTD] = useState<any>([]);
  const [tongDuLieu, setTongDuLieu] = useState<number>();
  const [pageSize, setPageSize] = useState(10);
  const [pageShow, setPageShow] = useState(1);
  const [optionSearch, setOptionSearch] = useState<any>({});
  const [dataEdit, setDataEdit] = useState<any>();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [recall, setRecall] = useState(true);
  
  useEffect(() => {
    axiosSauDN
      .post("/admin/danhSachCompany", {
        ...optionSearch,
        page: pageShow,
        pageSize: pageSize,
      })
      .then((res) => {
        console.log("DSNTD", res);
        // setTongDuLieu(res.data.data.total);
        handleData(res?.data?.data?.data);
      })
      .catch((err) => console.log("DSNTD", err));
  }, [pageShow, recall]);
  const columns: ColumnsType<any> = [
    { title: "Stt", dataIndex: "stt" },
    { title: "ID", dataIndex: "_id" },
    { title: "Tên công ty", dataIndex: "userName" },
    { title: "Email", dataIndex: "email" },
    { title: "Địa chỉ", dataIndex: "address" },
    { title: "Ngày tạo", dataIndex: "createdAt" },
    {
      title: "Active",
      dataIndex: "active",
      render: (_: any, record: any) => {
     
        return (
          <Checkbox
            // onChange={(e) => handleChangeActive(e, record)}
            checked={record.active.props.checked == 0 ? false : true}
          />
        );
      },
    },
    { title: "Sửa", dataIndex: "edit" },
  ];
  const handleData = async (data: any) => {
    const exportData = [];
    for (let i = 0; i < data.length; i++) {
      exportData.push({
        // key: (pageShow - 1) * pageSize + i + 1,
        key: data[i]._id,
        stt: (pageShow - 1) * pageSize + i + 1,
        _id: data[i]._id,
        userName: (
          <div
            onClick={() =>
              router.push(
                `/${convertNameToSlug(data[i].userName)}-co${
                  data[i]._id
                }.html`
              )
            }
            className="cursor-pointer hover:text-blue-500"
          >
            {data[i].userName}
          </div>
        ),
        email: data[i].email,
        address: data[i].address,
        createdAt: convertDateDMYcheo(data[i].createdAt * 1000),
        active: (
          <Checkbox
            // onChange={(e) => handleChangeActive(e, data[i].id_vieclam)}
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
    setDanhSachNTD([...exportData]);
  };

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
  
  return showEdit ? (
    <Admin_DSNTD_TM dataEdit={dataEdit} setShowEdit={setShowEdit} />
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
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Tên công ty"
          onChange={(e) =>
            setOptionSearch({
              ...optionSearch,
              userName: e.target.value,
            })
          }
        />
        <Input
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setOptionSearch({ ...optionSearch, email: e.target.value })
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
        dataSource={danhSachNTD}
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

export default App;

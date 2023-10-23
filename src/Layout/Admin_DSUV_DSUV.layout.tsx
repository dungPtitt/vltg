import { axiosSauDN } from "@/utils/axios.config";
import { convertDateDMYcheo, notifySuccess } from "@/utils/generalFunction";
import { DatePicker, Input, Select } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

function Admin_DSUV_DSUV() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageShow, setPageShow] = useState(1);
  const [optionSearch, setOptionSearch] = useState<any>({});
  const [danhSachUngVien, setDanhSachUngVien] = useState<any>([]);
  const [tongDuLieu, setTongDuLieu] = useState<number>();
  const handleData = async (data: any) => {
    const exportData = [];
    for (let i = 0; i < data.length; i++) {
      exportData.push({
        // key: (pageShow - 1) * pageSize + i + 1,
        key: data[i].idTimViec365,
        stt: (pageShow - 1) * pageSize + i + 1,
        id: data[i].idTimViec365,
        avatar: data[i].avatarUser,
        userName: data[i].userName,
        userPhone: data[i].phone,
        email: data[i].email,
        adress: data[i].address,
        job: data[i].cong_vic,
        date: convertDateDMYcheo(data[i].createdAt * 1000),
        for: `Từ Web`,
        active: (
          <input checked={data[i].active == 0 ? false : true} type="checkbox" />
        ),
        edit: (
          <div className="cursor-pointer">
            <img src="/images/edit.png" alt="" />
          </div>
        ),
        xoa: (
          <div className="cursor-pointer" onClick={() => handleXoaUV(i)}>
            <img src="/images/delete.gif" alt="" />
          </div>
        ),
      });
    }
    setDanhSachUngVien([...exportData]);
  };
  const [dataTest, setDataTets] = useState<any>([]);
  useEffect(() => {

    for (let i = 0; i < 50; i++) {
      console.log("first", i);
      dataTest.push({
        key: i,
        stt: i,
        id: i,
        avatar: i,
        userName: i,
        userPhone: i,
        email: i,
        adress: i,
        job: i,
        date: i,
        for: `Từ Web`,
        active: (
          <input
            /* checked={data[i].active == 0 ? false : true} */ type="checkbox"
          />
        ),
        edit: (
          <div className="cursor-pointer">
            <img src="/images/edit.png" alt="" />
          </div>
        ),
      });
    }
    setDataTets([...dataTest]);
  }, []);

  // useEffect(() => {
  //   axiosSauDN
  //     .post("/admin/danhSachUngVien", {
  //       ...optionSearch,
  //       page: pageShow,
  //       pageSize: pageSize,
  //       type: 1,
  //     })
  //     .then((res) => {
  //       setTongDuLieu(res.data.data.total);
  //       handleData(res.data.data.data);
  //     })
  //     .catch((err) => console.log("errDSUV", err));
  // }, [pageShow]);
  const columns: ColumnsType<any> = [
    { title: "Stt", dataIndex: "stt" },
    { title: "ID", dataIndex: "id" },
    { title: "Ảnh đại diện", dataIndex: "avatar" },
    { title: "Tên ứng viên", dataIndex: "userName" },
    { title: "Số điện thoại", dataIndex: "userPhone" },
    { title: "Email", dataIndex: "email" },
    { title: "Địa chỉ", dataIndex: "adress" },
    { title: "Công việc", dataIndex: "job" },
    { title: "Ngày đăng ký", dataIndex: "date" },
    { title: "Nguồn", dataIndex: "for" },
    { title: "Active", dataIndex: "active" },
    { title: "Sửa", dataIndex: "edit" },
    {
      title: "Action",
      dataIndex: "delete",
      key: "delete",
      render: (data) => {
        return <a onClick={() => console.log(data)}>Delete</a>;
      },
    },
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
  const handleXoaUV = (id: number) => {



    /*     axiosSauDN
      .post("/admin/deleteUngVien", { moduleId: 95, arrId: [id] })
      .then((res) => {
        setDanhSachUngVien([
          ...danhSachUngVien.filter((uv: any) => uv.idTimViec365 != id),
        ]);
      })
      .catch((err) => console.log("DSUV", err)); */
    // setDanhSachUngVien([...danhSachUngVien.filter((uv: any) => uv.id != id)]);
    // const newDS = danhSachUngVien.filter((uv: any) => uv.id != id);
    // setDanhSachUngVien([...newDS]);
    // dataTest.filter((data: any) => data.stt != id);
    // const filterd = dataTest.filter((uv: any) => uv.id != id);
    // console.log("filterd", filterd);

    setDataTets(dataTest[0]);
    // const i = 2;
    // setDataTets([
    //   {
    //     key: i,
    //     stt: i,
    //     id: i,
    //     avatar: i,
    //     userName: i,
    //     userPhone: i,
    //     email: i,
    //     adress: i,
    //     job: i,
    //     date: i,
    //     for: `Từ Web`,
    //     active: (
    //       <input
    //         /* checked={data[i].active == 0 ? false : true} */ type="checkbox"
    //       />
    //     ),
    //     edit: (
    //       <div className="cursor-pointer">
    //         <img src="/images/edit.png" alt="" />
    //       </div>
    //     ),
    //     xoa: (
    //       <div className="cursor-pointer" onClick={() => handleXoaUV(i)}>
    //         <img src="/images/delete.gif" alt="" />
    //       </div>
    //     ),
    //   },
    // ]);
  };
  // console.log("danhssac", dataTest);
  return (
    <div>
      <div className="flex items-center">
        <Input
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Số điện thoại"
        />
        <Input
          style={{ width: "15%", marginRight: "6px" }}
          type="text"
          placeholder="Email"
        />
        <label className="mr-2">Từ :</label>
        <DatePicker />
        <label className="mr-2">Từ :</label>
        <DatePicker />
        <label className="mr-2"> Chọn nguồn:</label>
        <Select
          defaultValue={"1"}
          style={{ width: 130 }}
          options={[
            { value: "1", label: "Chọn nguồn" },
            { value: "2", label: "Web" },
            { value: "3", label: "App" },
          ]}
        />
        <button className="bg-red-600 text-white ml-3 px-1"> Tìm kiếm</button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataTest}
        pagination={{
          total: 200,
          showSizeChanger: true,
          showQuickJumper: true,
          onShowSizeChange: (current, newSize) => {
            handleChangeTable(current, newSize);
          },
        }}
      />
    </div>
  );
}

export default Admin_DSUV_DSUV;

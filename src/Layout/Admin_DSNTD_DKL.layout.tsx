import { DatePicker, Input, Select } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

function Adm_DSNTD_DSNTD() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {

    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dataTest: any = [];
  for (let i = 1; i < 50; i++) {
    dataTest.push({
      stt: i,
      companyName: `Công ty ${i}`,
      email: `Email: ${i + 2}`,
      companyPhone: `SDT ${i + 4}`,
      city: `Tỉnh ${i}`,
      district: `Huyện ${i}`,
      address: `Địa chỉ ${i}`,
      date: `Ngày đăng kí lỗi ${i}`,
      for: `Từ Web`,
      handle: (
        <div className="flex justify-center">
          <img src="/images/delete.gif" alt="delete" />
        </div>
      ),
    });
  }
  const columns: ColumnsType<any> = [
    { title: "Stt", dataIndex: "stt" },
    { title: "Tên công ty", dataIndex: "companyName" },
    { title: "Email", dataIndex: "email" },
    { title: "Số điện thoại", dataIndex: "companyPhone" },
    { title: "Tỉnh thành", dataIndex: "city" },
    { title: "Quận huyện", dataIndex: "district" },
    { title: "Địa chỉ", dataIndex: "address" },
    { title: "Đăng ký lỗi ngày", dataIndex: "date" },
    { title: "Nguồn", dataIndex: "for" },
    { title: "Đã xử lý(xóa)", dataIndex: "handle" },
  ];
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
        className="mt-3"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataTest}
      />
    </div>
  );
}

export default Adm_DSNTD_DSNTD;

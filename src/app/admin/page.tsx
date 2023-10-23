"use client";
import React, { useState } from "react";
import styles from "@/Css/adminPage.module.css";
import { Collapse, Tabs } from "antd";
import Adm_DSUV_TM from "@/Layout/Admin_DSNTD_TM.layout";
import Adm_DSNTD_DSNTD from "@/Layout/Admin_DSNTD_DSNTD.layout";
import Adm_DSNTD_DKL from "@/Layout/Admin_DSNTD_DKL.layout";
import Admin_DSUV_TM from "@/Layout/Admin_DSUV_TM.layout";
import Admin_DSUV_DSUV from "@/Layout/Admin_DSUV_DSUV.layout";
import Admin_DSUV_DKL from "@/Layout/Admin_DSUV_DKL.layout";
import Admin_TTD_TM from "@/Layout/Admin_TTD_TM.layout";
import Admin_TTD_DS from "@/Layout/Admin_TTD_DS.layout";
import Admin_Tag_TM from "@/Layout/Admin_Tag_TM.layout";
import Admin_Tag_DS from "@/Layout/Admin_Tag_DS.layout";
import Admin_NN_DS from "@/Layout/Admin_NN_DS.layout";
import Admin_TT_DS from "@/Layout/Admin_TT_DS.layout";
import Admin_QH_DS from "@/Layout/Admin_QH_DS.layout";
import Admin_NN_TM from "@/Layout/Admin_NN_TM";
import { ToastContainer } from "react-toastify";
import { notifyWarning } from "@/utils/generalFunction";
import Image from "next/image";
import Admin_TTTK from "@/Layout/Admin_TTTK";
function AdminPage() {
  const [activeKey, setActiveKey] = useState("1");
  const [tabPanes, setTabPanes] = useState([
    {
      key: "1",
      label: <div>Trang chủ</div>,
      children: (
        <Image
          className="w-full"
          width={1280}
          height={430}
          src="/images/1.jpg"
          alt=""
        />
      ),
    },
  ]);
  const handleActiveKey = (label: any, e: any) => {
    if (tabPanes.some((tab: any) => tab.key == e.value)) {
      setActiveKey(e.value);
    } else {
      setTabPanes([
        ...tabPanes,
        { key: `${e.value}`, label: label, children: e.label },
      ]);
      setActiveKey(e.value);
    }
  };

  const handleTabRemove = (targetKey: any) => {
    // Xóa tab dựa trên targetKey
    if (targetKey != "1") {
      setTabPanes((prevTabPanes) =>
        prevTabPanes.filter((pane) => pane.key !== targetKey)
      );

      // Nếu tab bị xóa là tab hiện tại, hãy thiết lập tab trước đó làm tab hiện tại
      if (activeKey === targetKey) {
        const prevTab = tabPanes.find((pane) => pane.key !== targetKey);
        setActiveKey(prevTab ? prevTab.key : "");
      }
    } else {
      notifyWarning("Không thể xóa Tab này!");
    }
  };
  return (
    <div className={styles.admin_page}>
      <div className="flex justify-end m-2">
        Xin chào! admin |{" "}
        <span
          onClick={() =>
            handleActiveKey(
              <div className="flex ">
                <p className="text-red-500" onClick={() => setActiveKey("2")}>
                  Danh sách ứng viên
                  <span className="text-blue-500 mx-1">»</span> Thêm mới
                </p>
              </div>,
              { label: <Admin_TTTK />, value: "16" }
            )
          }
          className="text-red-500 mx-3 cursor-pointer"
        >
          {" "}
          Thông tin tài khoản
        </span>{" "}
        |{" "}
        <span className="flex text-red-500 ml-3 cursor-pointer">
          <Image height={250} width={250}  src="/images/logoff.gif" alt="out" /> Thoát
        </span>
      </div>
      <div className="flex">
        <div className={styles.admin_lf}>
          <div className="py-3">Doanh mục quản trị</div>
          <Collapse
            items={[
              {
                id: "1",
                key: "1",
                label: "Danh sách ứng viên",
                children: (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p
                              className="text-red-500"
                              onClick={() => setActiveKey("2")}
                            >
                              Danh sách ứng viên
                              <span className="text-blue-500 mx-1">»</span> Thêm
                              mới
                            </p>
                          </div>,
                          { label: <Admin_DSUV_TM />, value: "2" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3 " src="/images/4.gif" alt="" />
                      Thêm mới{" "}
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">Danh sách ứng viên</p>
                          </div>,
                          { label: <Admin_DSUV_DSUV />, value: "3" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3 " src="/images/4.gif" alt="" />
                      Danh sách ứng viên{" "}
                    </div>

                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Danh sách ứng viên
                              <span className="text-blue-500 mx-1">»</span> Ứng
                              viên đăng ký lỗi
                            </p>
                          </div>,
                          { label: <Admin_DSUV_DKL />, value: "4" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Ứng viên đăng ký lỗi{" "}
                    </div>
                  </div>
                ),
              },
              {
                key: "2",
                label: "Danh sách nhà tuyển dụng",
                children: (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Danh sách nhà tuyển dụng
                              <span className="text-blue-500 mx-1">»</span> Thêm
                              mới
                            </p>
                          </div>,
                          { label: <Adm_DSUV_TM />, value: "5" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Thêm mới{" "}
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">Danh sách NTD</p>
                          </div>,
                          { label: <Adm_DSNTD_DSNTD />, value: "6" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Danh sách NTD{" "}
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Danh sách NTD
                              <span className="text-blue-500 mx-1">»</span> NTD
                              đăng ký lỗi
                            </p>
                          </div>,
                          { label: <Adm_DSNTD_DKL />, value: "7" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      NTD đăng ký lỗi{" "}
                    </div>
                  </div>
                ),
              },
              {
                key: "3",
                label: "Tin tuyển dụng",
                children: (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Tin tuyển dụng
                              <span className="text-blue-500 mx-1">»</span> Thêm
                              mới
                            </p>
                          </div>,
                          { label: <Admin_TTD_TM />, value: "8" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Thêm mới{" "}
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Tin tuyển dụng
                              <span className="text-blue-500 mx-1">»</span> Danh
                              sách
                            </p>
                          </div>,
                          { label: <Admin_TTD_DS />, value: "9" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Danh sách{" "}
                    </div>
                  </div>
                ),
              },
              {
                key: "4",
                label: "Tag",
                children: (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Tag
                              <span className="text-blue-500 mx-1">»</span> Thêm
                              mới
                            </p>
                          </div>,
                          { label: <Admin_Tag_TM />, value: "10" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Thêm mới{" "}
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Tag
                              <span className="text-blue-500 mx-1">»</span> Danh
                              sách
                            </p>
                          </div>,
                          { label: <Admin_Tag_DS />, value: "11" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Danh sách{" "}
                    </div>
                  </div>
                ),
              },
              {
                key: "5",
                label: "Ngành nghề",
                children: (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Ngành nghề
                              <span className="text-blue-500 mx-1">»</span> Thêm
                              mới
                            </p>
                          </div>,
                          { label: <Admin_NN_TM />, value: "12" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Thêm mới{" "}
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Ngành nghề
                              <span className="text-blue-500 mx-1">»</span> Danh
                              sách
                            </p>
                          </div>,
                          { label: <Admin_NN_DS />, value: "13" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Danh sách{" "}
                    </div>
                  </div>
                ),
              },
              {
                key: "6",
                label: "Tỉnh thành",
                children: (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Tỉnh thành
                              <span className="text-blue-500 mx-1">»</span>Danh
                              sách
                            </p>
                          </div>,
                          { label: <Admin_TT_DS />, value: "14" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Danh sách{" "}
                    </div>
                  </div>
                ),
              },
              {
                key: "7",
                label: "Quận huyện",
                children: (
                  <div>
                    <div
                      className="flex items-center"
                      onClick={() =>
                        handleActiveKey(
                          <div className="flex ">
                            <p className="text-red-500">
                              Quận huyện
                              <span className="text-blue-500 mx-1">»</span> Danh
                              sách
                            </p>
                          </div>,
                          { label: <Admin_QH_DS />, value: "15" }
                        )
                      }
                    >
                      <Image height={100} width={100}  className="mx-3" src="/images/4.gif" alt="" />
                      Danh sách{" "}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
        <div className={styles.admin_rg}>
          {" "}
          <Tabs
            hideAdd={true}
            className="w-full"
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
            type="editable-card"
            onEdit={(targetKey, action) => {
              if (action === "remove") {
                handleTabRemove(targetKey);
              }
            }}
            items={tabPanes}
          ></Tabs>
        </div>

        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
}

export default AdminPage;

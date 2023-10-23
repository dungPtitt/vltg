import { axiosSauDN } from "@/utils/axios.config";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/generalFunction";
import { Input } from "antd";
import { useEffect, useState } from "react";

function Admin_TTTK() {
  const [dataAdmin, setDataAdmin] = useState<any>();
  const [emailInput, setEmailInput] = useState<string>("");
  const [password, setPassword] = useState<any>({
    oldPass: "",
    confirmPass: "",
    newPass: "",
  });

  useEffect(() => {
    axiosSauDN
      .post("/admin/getInfoAdmin")
      .then((res) => {
        setEmailInput(res.data.data.admin.adm_email);
        setDataAdmin(res.data.data.admin);
      })
      .catch((err) => notifyError("Vui lòng báo lại với kỹ thuật viên!"));
  }, []);
  const handleChangeEmail = () => {
    if (emailInput.includes("@") && emailInput.includes(".com")) {
      axiosSauDN
        .post("/admin/changeInfoAdminLogin", { email: emailInput })
        .then((res) => {
          setDataAdmin({ ...dataAdmin, adm_email: emailInput });
          notifySuccess("Thay đổi EMAIL thành công!");
        })
        .catch((err) => notifyError("Vui lòng báo lại với kỹ thuật viên!"));
    } else {
      notifyWarning("Vui lòng nhập đúng EMAIL!");
    }
  };
  const handleChangePassword = () => {
    for (const key in password) {
      if (!password[key]) {
        notifyWarning(`Vui lòng nhập ${key}!`);
        return;
      }
    }
    if (password.newPass != password.confirmPass) {
      notifyWarning("Mật khẩu không khớp vui lòng kiểm tra lại!");
    } else {
      axiosSauDN
        .post("/admin/changePasswordAdminLogin", password)
        .then((res) => notifySuccess("Thay đổi mật khẩu thành công!"))
        .catch((err) => notifyError("Vui lòng báo lại với kỹ thuật viên!"));
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex w-1/2">
        <div className="border-2 border-gray-300 w-full">
          <div>
            {" "}
            <div className="bg-slate-200 text-blue-800 font-medium pl-2">
              Thay đổi email
            </div>
            <div className="m-3">
              <p className="ml-1">
                {" "}
                <span className="text-blue-800 font-medium mr-2">
                  Tên đăng nhập:
                </span>{" "}
                {dataAdmin?.adm_loginname}
              </p>
              <div className="flex items-center my-1 ml-16">
                <span className="text-blue-800 font-medium mr-2">Email: </span>
                <Input
                  onChange={(e) => setEmailInput(e.target.value)}
                  value={emailInput}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleChangeEmail}
              className="bg-amber-400 py-1 px-3	text-white m-3 mt-2"
            >
              Cập nhập
            </button>
            <button
              onClick={() => setEmailInput(dataAdmin.adm_email)}
              className="bg-amber-400 py-1 px-3	text-white m-3"
            >
              Làm lại
            </button>
          </div>
        </div>
        <div className="border-2 border-gray-300 w-full">
          <div className="bg-slate-200 text-blue-800 font-medium pl-2">
            Thay đổi mật khẩu
          </div>

          <div className=" flex flex-col mr-5 items-end">
            <div className="flex items-center my-1">
              <span className="text-blue-800 font-medium mr-2">
                Mật khẩu cũ:{" "}
              </span>
              <Input
                value={password.oldPass}
                className="w-60"
                onChange={(e) =>
                  setPassword({ ...password, oldPass: e.target.value })
                }
                type="password"
              />
            </div>
            <div className="flex items-center my-1">
              <span className="text-blue-800 font-medium mr-2">
                Mật khẩu mới:{" "}
              </span>
              <Input
                value={password.newPass}
                className="w-60"
                onChange={(e) =>
                  setPassword({ ...password, newPass: e.target.value })
                }
                type="password"
              />
            </div>
            <div className="flex items-center my-1">
              <span className="text-blue-800 font-medium mr-2">
                Nhập lại mật khẩu mới:{" "}
              </span>
              <Input
                value={password.confirmPass}
                className="w-60"
                onChange={(e) =>
                  setPassword({ ...password, confirmPass: e.target.value })
                }
                type="password"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleChangePassword}
              className="bg-amber-400 py-1 px-3	text-white m-3"
            >
              Cập nhập
            </button>
            <button
              onClick={() =>
                setPassword({ oldPass: "", confirmPass: "", newPass: "" })
              }
              className="bg-amber-400 py-1 px-3	text-white m-3"
            >
              Làm lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_TTTK;

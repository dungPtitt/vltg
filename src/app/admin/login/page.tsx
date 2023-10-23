"use client";
import { axiosTruocDN } from "@/utils/axios.config";
import { notifyError, notifyWarning } from "@/utils/generalFunction";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
function AdminLogin() {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState({ loginName: "", password: "" });
  const handleLogin = () => {
    if (!dataLogin.loginName || !dataLogin.password) {
      notifyWarning("Nhập đầy đủ thông tin đăng nhập!");
    } else {
      axiosTruocDN
        .post("/admin/loginAdmin", dataLogin)
        .then((res) => router.push("/admin"))
        .catch((err) => notifyError("Vui lòng báo kỹ thuật viên!"));
    }
  };
  return (
    <div className="h-screen w-screen bg-teal-100	flex items-center justify-center">
      <div
        style={{ backgroundColor: "#CCD8E7" }}
        className="border-3-yellow-500 w-96 h-60"
      >
        <div className="text-blue-800 m-3 text-lg">Account Management</div>
        <div className="m-3">
          <div className="flex items-center my-5">
            <p className="w-40">Tài khoản:</p>{" "}
            <Input
              onChange={(e) =>
                setDataLogin({ ...dataLogin, loginName: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <p className="w-40">Mật khẩu:</p>{" "}
            <Input
              type="password"
              onChange={(e) =>
                setDataLogin({ ...dataLogin, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="bg-gray-200 border-2-gray-400 p-3"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

"use client";

import { Suspense } from "react";

import DanhSachUv from "@/Layout/DanhSachUV";

function DanhSachUngVienAll() {
  return (
    <Suspense fallback={<></>}>
      <DanhSachUv />
    </Suspense>
  );
}

export default DanhSachUngVienAll;

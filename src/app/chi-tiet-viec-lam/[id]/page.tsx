"use client";
import { Suspense } from "react";
import ChiTietCViec from "@/Layout/ChiTietCViec";

function JobDetail({ params }: any) {
  const { id } = params;

  return (
    <Suspense>
      <ChiTietCViec id={id} />
    </Suspense>
  );
}

export default JobDetail;

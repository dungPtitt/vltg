"use client";

import { convertNameToSlug } from "@/utils/generalFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DiaDiemLQ() {
  const router = useRouter();
  const keyWords = [
    {
      label: "Việc làm theo giờ tại Hà Nội",
      router: `/viec-lam-theo-gio-tai-${convertNameToSlug("Hà Nội")}-1.html`,
    },
    {
      label: "Việc làm theo giờ tại Thành phố Hồ Chí Minh",
      router: `/viec-lam-theo-gio-tai-${convertNameToSlug(
        "Hồ Chí Minh"
      )}-45.html`,
    },
    {
      label: "Việc làm theo giờ tại Đà Nẵng",
      router: `/viec-lam-theo-gio-tai-${convertNameToSlug("Đà Nẵng")}-26.html`,
    },
    {
      label: "Việc làm theo giờ tại Hải Phòng",
      router: `/viec-lam-theo-gio-tai-${convertNameToSlug("Hải Phòng")}-2.html`,
    },
    {
      label: "Việc làm theo giờ tại Cần Thơ",
      router: `/viec-lam-theo-gio-tai-${convertNameToSlug("Cần Thơ")}-48.html`,
    },
  ];
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  }, []);
  return (
    <div>
      <p className="font-semibold text-yellow-700">Địa điểm liên quan</p>
      <div>
        {keyWords.map((keyword, index) => (
          <Link
            key={index}
            href={`${keyword.router}`}
            className="text-yellow-500 hover:underline cursor-pointer text-base font-medium mr-5"
          >
            {keyword.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DiaDiemLQ;

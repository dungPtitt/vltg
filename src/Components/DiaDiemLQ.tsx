"use client";

import { basePath } from "@/constants/Head.constant";
import { convertNameToSlug } from "@/utils/generalFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  return (
    <div>
      <p className="font-semibold">Địa điểm liên quan</p>
      <div>
        {keyWords.map((keyword, index) => (
          <Link
            key={index}
            href={`${basePath}/${keyword.router}`}
            className="text-red-500 hover:underline cursor-pointer text-base font-medium mr-5"
          >
            {keyword.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DiaDiemLQ;

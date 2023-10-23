"use client";

import { convertNameToSlug } from "@/utils/generalFunction";
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
      <p>Địa điểm liên quan</p>
      <div>
        {keyWords.map((keyword, index) => (
          <span
            key={index}
            onClick={() => router.push(keyword.router)}
            className="text-red-500 hover:underline cursor-pointer text-base font-medium mr-5"
          >
            {keyword.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default DiaDiemLQ;

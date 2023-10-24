"use client";

import { tagCv } from "@/constants/EditProfile.constant";
import { basePath } from "@/constants/Head.constant";
import { convertNameToSlug } from "@/utils/generalFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";

function TuKhoaCongViecLQ() {
  const router = useRouter();
  return (
    <div className="mb-2 font-semibold">
      <p>Công việc liên quan</p>
      <div>
        {tagCv.map((tag) => (
          <Link
            key={tag.value}
            href={`${basePath}/viec-lam-${convertNameToSlug(tag.label)}-${
              tag.value
            }nn.html`}
            className="text-red-500  cursor-pointer text-base font-medium mr-5"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TuKhoaCongViecLQ;

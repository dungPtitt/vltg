"use client";

import { tagCv } from "@/constants/EditProfile.constant";
import { convertNameToSlug } from "@/utils/generalFunction";
import { useRouter } from "next/navigation";

function TuKhoaCongViecLQ() {
  const router = useRouter();
  return (
    <div className="mb-2">
      <p>Công việc liên quan</p>
      <div>
        {tagCv.map((tag) => (
          <span
            key={tag.value}
            onClick={() =>
              router.push(
                `/viec-lam-${convertNameToSlug(tag.label)}-${tag.value}nn.html`
              )
            }
            className="text-red-500  cursor-pointer text-base font-medium mr-5"
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TuKhoaCongViecLQ;

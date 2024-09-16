"use client";

import { tagCv } from "@/constants/EditProfile.constant";
import { convertNameToSlug } from "@/utils/generalFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TuKhoaCongViecLQ() {
  const router = useRouter();
  const [fullPath, setFullPath] = useState<any>("");
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    localStorage.setItem("hostname", hostname + port);
    setFullPath(`${hostname}:${port}`);
  });
  return (
    <div className="mb-2 text-yellow-700 font-semibold">
      <p>Công việc liên quan</p>
      <div>
        {tagCv.map((tag) => (
          <Link
            key={tag.value}
            href={`/viec-lam-${convertNameToSlug(tag.label)}-${
              tag.value
            }nn.html`}
            className="text-yellow-500  cursor-pointer text-base font-medium mr-5"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TuKhoaCongViecLQ;

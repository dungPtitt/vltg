import Image from "next/image";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src={"/images/loading.gif"}
        height={100}
        width={100}
        alt="loading"
      />
      Loading...
    </div>
  );
}

export default Loading;

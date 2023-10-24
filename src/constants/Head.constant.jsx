import Head from "next/head";

const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();
export const basePath = "http://localhost:3000";
export const HeadHomePage = () => {
  return (
    <>
      <link rel="canonical" href={basePath} />
      {/* <link rel="amphtml" href="https://vieclamtheogio.timviec365.vn/amp" /> */}
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Việc Làm Theo Giờ - Tìm Việc Theo Giờ Mới Nhất Lương Cao</title>
      <meta
        name="google-site-verification"
        content="tkR0DL2EWeg8OJfQypncyEWVoR3Mvl-Vbk4yl-8q1sQ"
      />
      <meta name="robots" content="noindex,nofollow" />
      <meta
        name="description"
        content=" Việc làm theo giờ mới nhất. Tổng hợp danh sách việc làm theo giờ lương cao từ các công ty hàng đầu dành cho người tìm việc. Tham khảo ngay tại Timviec365.vn"
      />
      <meta name="Keywords" content="việc làm theo giờ" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content=" Việc làm theo giờ mới nhất. Tổng hợp danh sách việc làm theo giờ lương cao từ các công ty hàng đầu dành cho người tìm việc. Tham khảo ngay tại Timviec365.vn"
      />
      <meta
        name="twitter:title"
        content="Việc Làm Theo Giờ - Tìm Việc Theo Giờ Mới Nhất Lương Cao"
      />
      <meta
        property="og:image:url"
        content="https://timviec365.vn/images/bg_fb_2.jpg"
      />
      <meta property="og:image:width" content="476" />
      <meta property="og:image:height" content="249" />
      <meta
        property="og:title"
        itemprop="headline"
        content="Việc Làm Theo Giờ - Tìm Việc Theo Giờ Mới Nhất Lương Cao"
      />
      <meta
        property="og:description"
        itemprop="description"
        content=" Việc làm theo giờ mới nhất. Tổng hợp danh sách việc làm theo giờ lương cao từ các công ty hàng đầu dành cho người tìm việc. Tham khảo ngay tại Timviec365.vn"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />

      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/lato-v17-latin-regular.woff2"
        as="font"
        crossorigin="anonymous"
      />

      <link rel="stylesheet" href="../css/bootstrap.min.css" />

      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697855812" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697855812"
        onload="if (media != 'all')media='all'"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};
export const HeadDefault = ({ title }) => {
  return (
    <>
      <meta charset="UTF-8" />
      <link rel="canonical" href="https://vieclamtheogio.timviec365.vn/" />

      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="robots" content="noindex,nofollow" />
      <title>{title}</title>
      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697617770" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697617770"
        // media="all"
        onload="if (media != 'all')media='all'"
      />
      <link
        rel="preload"
        as="image"
        type="image/jpg"
        href="/images/bg-search_mb.jpg"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};
export const HeadListJob = ({ url }) => {
  return (
    <>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="robots" content="noindex,nofollow" />
      <title>Danh sách việc làm</title>
      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/lato-v17-latin-regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link rel="canonical" href={basePath+"/" + url} />
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697771537" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697771537"
        onload="if (media != 'all')media='all'"
      />
      <link
        rel="preload"
        as="image"
        type="image/jpg"
        href="/images/bg-search_mb.jpg"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};
export const HeadJobDetai = ({ job, company }) => {
  const title = job;
  return (
    <>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="robots" content="noindex,nofollow" />
      <title>{title}</title>
      <meta
        name="description"
        content={`${job} đang tuyển dụng tại ${company} mới nhất trên timviec365.vn"`}
      />
      <meta name="Keywords" content="việc làm theo giờ" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content={` ${job} đang tuyển dụng tại ${company} mới nhất trên timviec365.vn`}
      />
      <meta name="twitter:title" content={job} />
      <meta
        property="og:image:url"
        content="https://timviec365.vn/images/bg_fb_2.jpg"
      />
      <meta property="og:image:width" content="476" />
      <meta property="og:image:height" content="249" />
      <meta
        property="og:title"
        itemprop="headline"
        content="chạy bàn nhà hàng"
      />
      <meta
        property="og:description"
        itemprop="description"
        content={` ${job} đang tuyển dụng tại ${company} mới nhất trên timviec365.vn`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />

      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/lato-v17-latin-regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link rel="preload" as="style" href="../css/bootstrap.min.css" />
      <link
        rel="stylesheet"
        href="../css/bootstrap.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697768990" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697768990"
        onload="if (media != 'all')media='all'"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};
export const HeadCompanyDetail = (company) => {
  return (
    <>
      {" "}
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{company}</title>
      <meta name="robots" content="noindex,nofollow" />
      <meta
        name="description"
        content={` ${company} đang có nhu cầu tuyển dụng nhân viên`}
      />
      <meta name="Keywords" content="việc làm theo giờ" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content={` ${company} đang có nhu cầu tuyển dụng nhân viên`}
      />
      <meta name="twitter:title" content={company} />
      <meta
        property="og:image:url"
        content="https://timviec365.vn/images/bg_fb_2.jpg"
      />
      <meta property="og:image:width" content="476" />
      <meta property="og:image:height" content="249" />
      <meta property="og:title" itemprop="headline" content={company} />
      <meta
        property="og:description"
        itemprop="description"
        content={` ${company} đang có nhu cầu tuyển dụng nhân viên`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />
      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/lato-v17-latin-regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697769039" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697769039"
        onload="if (media != 'all')media='all'"
      />
      <link
        rel="preload"
        as="image"
        type="image/jpg"
        href="/images/bg-search_mb.jpg"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};
export const HeadSearchByProfession = ({ profession, pathUrl }) => {
  const title = `Tìm việc ${profession?.toLowerCase()} mới nhất - T${month}/${year}`;
  return (
    <>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="robots" content="noindex,nofollow" />
      <title>{title}</title>
      <meta
        name="description"
        content={` Tìm việc làm ${profession?.toLowerCase()}  mới nhất. Danh sách việc làm ${profession?.toLowerCase()}   lương cao được cập nhật liên tục tại Timviec365.vn. Tham khảo ngay`}
      />
      <meta name="Keywords" content={`việc làm ${profession.toLowerCase()}`} />

      <meta
        name="twitter:description"
        content={` Tìm việc làm ${profession?.toLowerCase()}  mới nhất. Danh sách việc làm ${profession?.toLowerCase()}   lương cao được cập nhật liên tục tại Timviec365.vn. Tham khảo ngay`}
      />
      <meta
        name="twitter:title"
        content={`Tìm việc làm ${profession.toLowerCase()}  mới nhất - T${month}/${year}`}
      />

      <meta
        property="og:image:url"
        content="https://timviec365.vn/images/bg_fb_2.jpg"
      />
      <meta property="og:image:width" content="476" />
      <meta property="og:image:height" content="249" />
      <meta
        property="og:title"
        itemprop="headline"
        content={`Tìm việc làm ${profession.toLowerCase()}  mới nhất - T${month}/${year}`}
      />
      <meta
        property="og:description"
        itemprop="description"
        content={` Tìm việc làm ${profession?.toLowerCase()}  mới nhất. Danh sách việc làm ${profession?.toLowerCase()}   lương cao được cập nhật liên tục tại Timviec365.vn. Tham khảo ngay`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />
      <link rel="canonical" href={basePath +"/"+ pathUrl} />
      <link rel="amphtml" href={basePath +"/"+ pathUrl} />

      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/lato-v17-latin-regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697769076" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697769076"
        onload="if (media != 'all')media='all'"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};
export const HeadSearchByAdress = ({ city, district }) => {
  const title = `Tìm việc làm theo giờ tại ${
    district ? district : ""
  } ${city} mới nhất - T
  ${month}/${year}`;
  return (
    <>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />

      <meta name="robots" content="noindex,nofollow" />

      <title>{title}</title>
      <meta
        name="description"
        content={` Tìm việc làm theo giờ tại ${
          district ? district : ""
        } ${city} mới nhất. Danh sách tuyển dụng việc làm theo giờ tại ${
          district ? district : ""
        } ${city} được cập nhật thường xuyên và liên tục`}
      />
      {district && (
        <meta name="Keywords" content="việc làm theo giờ tại Quận Hà Đông" />
      )}

      <meta
        name="twitter:description"
        content={` Tìm việc làm theo giờ tại ${
          district ? district : ""
        } ${city} mới nhất. Danh sách tuyển dụng việc làm theo giờ tại ${
          district ? district : ""
        } ${city} được cập nhật thường xuyên và liên tục`}
      />
      <meta
        name="twitter:title"
        content={`Tìm việc làm theo giờ tại ${
          district ? district : ""
        } ${city} mới nhất - T${month}/${year}`}
      />

      <meta
        property="og:image:url"
        content="https://timviec365.vn/images/bg_fb_2.jpg"
      />
      <meta property="og:image:width" content="476" />
      <meta property="og:image:height" content="249" />
      <meta
        property="og:title"
        itemprop="headline"
        content={`Tìm việc làm theo giờ tại ${district} ${city} mới nhất - T${month}/${year}`}
      />
      <meta
        property="og:description"
        itemprop="description"
        content={` Tìm việc làm theo giờ tại ${district} ${city} mới nhất. Danh sách tuyển dụng việc làm theo giờ tại ${district} ${city} được cập nhật thường xuyên và liên tục`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />

      <link
        rel="canonical"
        href="https://vieclamtheogio.timviec365.vn/viec-lam-theo-gio-tai-quan-ha-dong-ha-noi-x82q1.html"
      />
      <link
        rel="amphtml"
        href="https://vieclamtheogio.timviec365.vn/amp-viec-lam-theo-gio-tai-quan-ha-dong-ha-noi-x82q1.html"
      />

      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/lato-v17-latin-regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697770608" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697770608"
        onload="if (media != 'all')media='all'"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};
export const HeadSearchByProfessionAndAdress = (profession, city) => {
  const title = ` Việc làm ${profession.toLowerCase()} tại ${city} - Timviec365.vn `;
  return (
    <>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />

      <title>{title}</title>
      <meta name="robots" content="noindex,nofollow" />
      <meta
        name="description"
        content={` Danh sách việc ${profession.toLowerCase()} tại ${city}. Tham khảo ngay danh sách tin tuyển dụng ${profession.toLowerCase()} tại ${city} trên timviec365.vn`}
      />
      <meta name="Keywords" content="việc làm trông trẻ theo giờ tại Hà Nội" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content={` Danh sách việc ${profession.toLowerCase()} tại ${city}. Tham khảo ngay danh sách tin tuyển dụng ${profession.toLowerCase()} tại ${city} trên timviec365.vn`}
      />
      <meta
        name="twitter:title"
        content={`Việc làm ${profession.toLowerCase()} tại ${city} - Timviec365.vn`}
      />
      <meta
        property="og:image:url"
        content="https://timviec365.vn/images/bg_fb_2.jpg"
      />
      <meta property="og:image:width" content="476" />
      <meta property="og:image:height" content="249" />
      <meta
        property="og:title"
        itemprop="headline"
        content={`Việc làm ${profession.toLowerCase()} tại ${city} - Timviec365.vn`}
      />
      <meta
        property="og:description"
        itemprop="description"
        content={` Danh sách việc ${profession.toLowerCase()} tại ${city}. Tham khảo ngay danh sách tin tuyển dụng ${profession.toLowerCase()} tại ${city} trên timviec365.vn`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />

      <link
        rel="preload"
        href="/fonts/Roboto-Regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/lato-v17-latin-regular.woff2"
        as="font"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
      <link rel="preload" as="style" href="../css/select2.min.css" />
      <link
        rel="stylesheet"
        href="../css/select2.min.css"
        media="all"
        onload="if (media != 'all')media='all'"
      />
      <link rel="preload" as="style" href="../css/style.css?v=1697770848" />
      <link
        rel="stylesheet"
        media="all"
        href="../css/style.css?v=1697770848"
        onload="if (media != 'all')media='all'"
      />
      <script async src="/js/tagsManager.js"></script>
    </>
  );
};

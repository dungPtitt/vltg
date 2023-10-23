/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.timviec365.vn"],
  },
  moment: {
    locale: "vi",
  },
  async rewrites() {
    return [
      {
        source: "/viec-lam-:slug([^/]+)-:id([0-9]+).html",
        //danh sách ngành nghề
        destination: "/danh-sach-nganh-nghe/:slug/:id",
      },
      {
        source: "/viec-lam-:slug([^/]+)-:id([0-9]+)nn.html",
        //danh sách ngành nghề theo tag
        destination: "/danh-sach-nganh-nghe/:slug/:id",
      },
      {
        source: "/:slug([^/]+)-:id([0-9]+).html",
        //chi tiết việc làm theo Id
        destination: "/chi-tiet-viec-lam/:id",
      },
      {
        source: "/viec-lam-theo-gio.html",
        //việc làm mới nhất
        destination: "/viec-lam-theo-gio-moi-nhat",
      },
      {
        source:
          "/viec-lam-:slugJob([^/]+)-tai-:slugDistrict([^/]+)-:slugCity([^/]+)-z:idJob([0-9]+)k:idDistrict([0-9]+)t:idCity([0-9]+).html",
        //tìm kiếm theo key, city,district
        destination: "/tim-kiem-viec-lam/:idJob/:idCity/:idDistrict",
      },
      {
        source:
          "/viec-lam-theo-gio-tai-:slugDistrict([^/]+)-:slugCity([^/]+)-x:idDistrict([0-9]+)q:idCity([0-9]+).html",
        //tìm kiếm theo city,district
        destination: "/tim-kiem-viec-lam/0/:idCity/:idDistrict",
      },
      {
        source:
          "/viec-lam-:slugKey([^/]+)-tai-:slugCity([^/]+)-n:idJob([0-9]+)t:idCity([0-9]+)",
        //việc làm mới nhất
        destination: "/tim-kiem-viec-lam/:idJob/:idCity/0",
      },
      {
        source: "/ung-vien-:slugKey([^/]+)-:id([0-9]+).html",
        //việc làm mới nhất
        destination: "/ung-vien/:id",
      },
      {
        //Thông tin ntd
        source: "/:slug-co:id([0-9]+).html",
        destination: "/ntd/thong-tin/:id",
      },
      {
        //Danh sách ứng viên
        source: "/ung-vien-tim-viec-lam-theo-gio.html",
        destination: "/danh-sach-ung-vien",
      },
      {
        //dành cho doanh nghiệp
        source: "/danh-cho-doanh-nghiep.html",
        destination: "/danh-cho-doanh-nghiep",
      },
      {
        //tìm kiếm ứng viên theo tag
        source: "/ung-vien-:slug([^/]+)-:id([0-9]+)nn.html",
        destination: "/danh-sach-ung-vien/:slug/:id",
      },
      {
        //tìm kiếm ứng viên theo hình thức làm việc
        source: "/ung-vien-:slug([^/]+)-theo-gio-i:id([0-9]+).html",
        destination: "/danh-sach-ung-vien/:slug/:id",
      },
      {
        //tìm kiếm ứng viên theo Ngành nghề - bảng bên phải
        source: "/ung-vien-:slug([^/]+)-theo-gio-u:id([0-9]+)t0.html",
        destination: "/danh-sach-ung-vien/:slug/:id",
      },
      {
        //tìm kiếm ứng viên theo Thành phố
        source: "/ung-vien-theo-gio-tai-:slug([^/]+)-u0c:id([0-9]+).html",
        destination: "/tim-kiem-ung-vien/0/:id",
      },
      {
        //tìm kiếm ứng viên theo Tag và Thành Phố
        source:
          "/ung-vien-:slug1([^/]+)-tai-:slug2([^/]+)-v:id1([0-9]+)t:id2([0-9]+).html",
        destination: "/tim-kiem-ung-vien/:id1/:id2",
      },
      {
        //profie Ứng viên
        source: "/ung-vien.html",
        destination: "/ung-vien",
      },
      {
        //update Ứng viên
        source: "/hoan-thien-ho-so-ung-vien.html",
        destination: "/ung-vien/edit",
      },
      {
        //chi tiết ứng viên
        source: "/ung-vien-:slug([^/]+)-ca:id([0-9]+).html",
        destination: "/ung-vien/:id",
      },
    ];
  },
};

module.exports = nextConfig;

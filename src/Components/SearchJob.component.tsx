"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/Css/boxSearch.module.css";
import { Input, Popover } from "antd";
import { cityOption, quan_huyen, tinh_thanh } from "@/utils/vi_tri";
import { useRouter } from "next/navigation";
import {
  convertNameToSlug,
  toLowerCaseNonAccentVietnamese,
  convertNameToQuery,
} from "@/utils/generalFunction";
import Image from "next/image";
import { LIST_PROPOSE } from "@/constants/forNtd.constant";
import {
  profession,
  renderProfession,
  tagCv,
} from "@/constants/EditProfile.constant";
import Link from "next/link";
import { basePath } from "@/constants/Head.constant";

function SearchJob() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const buttonRef: any = useRef(null);
  const [showChoiceCity, setShowChoiceCity] = useState(false);
  const [choiceCity, setChoiceCity] = useState<string>("Chọn tỉnh thành");
  const [codeCity, setCodeCity] = useState<number>(0);
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchOption, setSearchOption] = useState<any>({
    key: "",
    // idKey:0,
  });
  /* useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [visible]);
  const handleDocumentClick = (event: MouseEvent) => {
    if (
      visible &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  }; */
  const contentCity = (
    <div className={styles.box_choice_city}>
      <div className={styles.nd_box_key}>
        <div className={`${styles.box_district}`}>
          <div className="nd_box_left col-7 col-lg-8 ">
            <p className="text-lg ">Địa điểm phổ biến</p>
          </div>
          {choiceCity != "Chọn tỉnh thành" ? (
            <div className={styles.box_key_district}>
              {/* Show district */}
              {quan_huyen
                .filter((codeDistrict) => codeDistrict.cit_parent == codeCity)
                .map((district) => (
                  <div
                    onClick={() =>
                      setSearchOption({
                        ...searchOption,
                        district: district.cit_id,
                        districtName: district.cit_name,
                      })
                    }
                    key={district.cit_id}
                    className={`${styles.list_district} ${
                      searchOption?.district === district.cit_id &&
                      " bg-blue-400"
                    } cursor-pointer`}
                  >
                    {district.cit_name}
                  </div>
                ))}
            </div>
          ) : (
            <div>{/* Show đề xuất */}</div>
          )}
        </div>
        <div className="box_key_city_right ml-10" id="city_lq">
          <p className={styles.text}>Danh sách địa điểm</p>
          <input
            type="text"
            // className={styles.inp_search_city}
            className="border-2 border-gray-300 my-3"
            onChange={(e) => setSearchCity(e.target.value)}
            value={searchCity}
          />
          {/* Show city */}
          {searchCity ? (
            <div className={styles.box_key_city}>
              {cityOption
                .filter((city) =>
                  city.label.toLowerCase().includes(searchCity.toLowerCase())
                )
                .map((e) => (
                  <div
                    key={e.value}
                    className={styles.list_city + " cursor-pointer"}
                    onClick={() => {
                      setSearchOption({
                        ...searchOption,
                        city: e.value,
                        cityName: e.label,
                        district: 0,
                      });
                      setChoiceCity(e.label);
                      setCodeCity(e.value);
                    }}
                  >
                    {e.label}
                  </div>
                ))}
            </div>
          ) : (
            <div className={styles.box_key_city}>
              {tinh_thanh.map((city) => (
                <div
                  key={city.cit_id}
                  className={styles.list_city + " cursor-pointer"}
                  onClick={() => {
                    setSearchOption({
                      ...searchOption,
                      cityName: city.cit_name,
                      city: city.cit_id,
                      district: 0,
                    });
                    setChoiceCity(city.cit_name);
                    setCodeCity(city.cit_id);
                  }}
                >
                  {city.cit_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  const handleRouterSearch = async () => {
    //Chỉ search theo tag
    if (
      searchOption.key &&
      profession.some(
        (pf) =>
          convertNameToSlug(pf.label) == convertNameToSlug(searchOption.key)
      ) &&
      !searchOption.city &&
      !searchOption.district
    ) {
      router.push(
        `/viec-lam-${convertNameToSlug(searchOption.key)}${
          searchOption.idKey < 10 ? `-theo-gio` : ""
        }-${searchOption.idKey}nn.html`
      );
      return;
    }
    //search theo tag và city
    if (
      profession.some(
        (pf) =>
          convertNameToSlug(pf.label) == convertNameToSlug(searchOption.key)
      ) &&
      searchOption.city &&
      !searchOption.district
    ) {
      router.push(
        `/viec-lam-${convertNameToSlug(searchOption.key)}${
          searchOption.idKey < 10 ? "-theo-gio" : ""
        }-tai-${convertNameToSlug(searchOption.cityName)}-n${
          searchOption.idKey
        }t${searchOption.city}`
      );
      return;
    }
    //search theo City
    if (searchOption.city && !searchOption.key && !searchOption.district) {
      router.push(
        `/viec-lam-theo-gio-tai-${convertNameToSlug(searchOption.cityName)}-${
          searchOption.city
        }.html`
      );
      return;
    }
    //search theo tag,city,district
    if (
      searchOption.key &&
      profession.some(
        (pf) =>
          convertNameToSlug(pf.label) == convertNameToSlug(searchOption.key)
      ) &&
      searchOption.city &&
      searchOption.district
    ) {
      router.push(
        `/viec-lam-${convertNameToSlug(searchOption.key)}${
          searchOption.idKey < 10 ? "-theo-gio" : ""
        }-tai-${convertNameToSlug(
          searchOption.districtName
        )}-${convertNameToSlug(searchOption.cityName)}-z${searchOption.idKey}k${
          searchOption.district
        }t${searchOption.city}.html`
      );

      return;
    }
    //Tìm kiếm theo city và district
    if (!searchOption.key && searchOption.city && searchOption.district) {
      router.push(
        `/viec-lam-theo-gio-tai-${convertNameToSlug(
          searchOption.districtName
        )}-${convertNameToSlug(searchOption.cityName)}-x${
          searchOption.district
        }q${searchOption.city}.html`
      );

      return;
    }
    if (!searchOption.key && !searchOption.city && !searchOption.district) {
      router.push("/viec-lam-theo-gio.html");
    } else {
      router.push(
        `/viec-lam-theo-gio.html?${
          searchOption.key && `key=${convertNameToQuery(searchOption.key)}`
        }${
          searchOption.city
            ? searchOption.key
              ? `&city=${searchOption.city}`
              : `city=${searchOption.city}`
            : ""
        }${
          searchOption.district
            ? searchOption.key || searchOption.city
              ? `&district=${searchOption.district}`
              : `district=${searchOption.district}`
            : ""
        }`
      );
    }
  };
  const contentKey = (
    <div className="flex justify-between" style={{ maxWidth: "1000px" }}>
      <div className=" mr-5 pr-5 w-1/3">
        <p className="text-gray-300 text-xs">Tìm kiếm phổ biến</p>
        <div className="grid grid-cols-2">
          {searchOption.key &&
            profession
              .filter((pf) =>
                toLowerCaseNonAccentVietnamese(pf.label).includes(
                  toLowerCaseNonAccentVietnamese(searchOption.key)
                )
              )
              .map((nn) => (
                <div
                  onClick={() => {
                    setSearchOption({
                      ...searchOption,
                      key: nn.label,
                      idKey: nn.value,
                    });
                  }}
                  className="cursor-pointer "
                  key={nn.value}
                >
                  {nn.label}
                </div>
              ))}
        </div>
      </div>
      <div>
        <p className="text-gray-300 text-xs">Từ khóa phổ biến</p>
        <div className="grid grid-cols-3 ">
          {tagCv.map((tag) => (
            <button
              className="m-3"
              onClick={() => {
                setSearchOption({
                  ...searchOption,
                  key: tag.label,
                  idKey: tag.value,
                });
              }}
              key={tag.value}
            >
              {" "}
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles.inc_search}>
      <div className={styles.box_search}>
        <Link href={basePath} className="logo-search cursor-pointer">
          <img
            className="hidden lg:block"
            src="/images/logovltg.svg"
            alt="logo"
          />
        </Link>
        <div className={styles.new_search}>
          <Popover
            trigger="click"
            placement="bottomLeft"
            content={contentKey}
            overlayStyle={{
              width: "60%",
            }}
          >
            <Input
              className="w-full h-14 lg:rounded-l-full mr-0.5"
              value={searchOption.key}
              placeholder="Nhập tên công việc"
              onChange={(e) =>
                setSearchOption({
                  ...searchOption,
                  key: e.target.value,
                  idKey: profession.some(
                    (pf) =>
                      pf.label.toLowerCase() == e.target.value.toLowerCase()
                  )
                    ? profession.find(
                        (pf) =>
                          pf.label.toLowerCase() == e.target.value.toLowerCase()
                      )?.value
                    : "",
                })
              }
            />
          </Popover>
          <Popover
            className="w-full"
            placement="bottomRight"
            content={contentCity}
            trigger="click"
            overlayStyle={{
              width: "60%",
              position: "relative",
              left: "20%",
            }}
          >
            <div
              // ref={buttonRef}
              className={styles.choice_city}
              onClick={() => {
                setVisible(true);
                setShowChoiceCity(!showChoiceCity);
              }}
            >
              <span>{choiceCity}</span>
            </div>
          </Popover>

          <div className={styles.search_plus}>
            <button onClick={handleRouterSearch} className={styles.btn_search}>
              Tìm kiếm
            </button>

            <img className="lg:hidden ml-4" src="/images/search-plus-tl.svg" />
          </div>
        </div>
        <div>
          <div className="text-white my-5">Tìm kiếm phổ biến</div>
          <div className="flex justify-center">
            {LIST_PROPOSE.map((item) => (
              <Link
                href={`${basePath}/viec-lam-${convertNameToSlug(
                  renderProfession[item.link]
                )}${
                  item.link < 10 ? `-theo-gio-${item.link}` : `-${item.link}nn`
                }.html`}
                className="cursor-pointer flex flex-col items-center justify-center mx-4"
                key={item.img}
              >
                <Image
                  className="w-11 h-11"
                  height={43}
                  width={43}
                  alt="/"
                  src={item.img}
                />
                <p className="text-sm text-white mt-3">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchJob;

"use client";
import React, { useState } from "react";

import styles from "@/Css/boxSearch.module.css";
import { Input, Popover, Select, Space } from "antd";
import { cityOption, quan_huyen, tinh_thanh } from "@/utils/vi_tri";
import { useRouter } from "next/navigation";
import { profession, tagCv } from "@/constants/EditProfile.constant";
import {
  convertNameToQuery,
  convertNameToSlug,
  toLowerCaseNonAccentVietnamese,
} from "@/utils/generalFunction";

function SearchUV() {
  const router = useRouter();

  const [showChoiceCity, setShowChoiceCity] = useState(false);
  const [choiceCity, setChoiceCity] = useState<string>("Chọn tỉnh thành");
  const [codeCity, setCodeCity] = useState<number>(0);
  const [searchCity, setSearchCity] = useState<string>("");
  const [showBoxChoiceCity, setShowBoxChoiceCity] = useState(false);
  const [searchOption, setSearchOption] = useState<any>({
    key: "",
    city: 0,
  });
  const contentCity = (
    <div className={styles.box_choice_city}>
      <div className={styles.nd_box_key}>
        <div className="box_key_city_right" id="city_lq">
          <p className={styles.text}>Danh sách địa điểm</p>
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            onChange={(e) => setSearchOption({ ...searchOption, city: e })}
            defaultValue={"Chọn tỉnh thành"}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            style={{ width: 200 }}
            options={cityOption}
          />
        </div>
      </div>
    </div>
  );
  const contentKey = (
    <div className="flex justify-between" style={{ maxWidth: "1000px" }}>
      <div className="border-r border-gray-400 mr-5 pr-5">
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
                  onClick={() =>
                    setSearchOption({
                      ...searchOption,
                      key: nn.label,
                      idKey: nn.value,
                    })
                  }
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
              onClick={() =>
                setSearchOption({
                  ...searchOption,
                  key: tag.label,
                  idKey: tag.value,
                })
              }
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
  const handleRouterSearch = async () => {
    //Chỉ search theo tag
    if (searchOption.idKey && !searchOption.city) {
  
      router.push(
        `/ung-vien-${convertNameToSlug(searchOption.key)}${
          searchOption.idKey < 10 ? `-theo-gio` : ""
        }-${searchOption.idKey}nn.html`
      );
      
      return;
    }
    //search theo tag và city
    if (searchOption.idKey && searchOption.city) {

      router.push(
        `/ung-vien-${convertNameToSlug(searchOption.key)}${
          searchOption.idKey < 10 ? "-theo-gio" : ""
        }-tai-${convertNameToSlug(
          cityOption[Number(searchOption.city) - 1]?.label
        )}-v${searchOption.idKey}t${searchOption.city}.html`
      );
  
      return;
    }
    //search theo City
    if (searchOption.city && !searchOption.key) {
    
      router.push(
        `/ung-vien-theo-gio-tai-${convertNameToSlug(
          cityOption[Number(searchOption.city) - 1]?.label
        )}-u0c${searchOption.city}.html`
      );
      return;
    }
  
    if (!searchOption.key && !searchOption.city && !searchOption.district) {
      router.push("/ung-vien-tim-viec-lam-theo-gio.html");
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
        }`
      );
    }
  };

  return (
    <div className={styles.inc_search}>
      <div className={styles.box_search}>
        <div className="logo-search">
          <img
            className="hidden lg:block"
            src="/images/logovltg.svg"
            alt="logo"
          />
        </div>
        <div className={styles.new_search}>
          <Popover trigger="click" placement="bottomLeft" content={contentKey}>
            <Input
              className={styles.job_search}
              placeholder="Nhập nội dung tìm kiếm"
              type="text"
              value={searchOption.key}
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
              /*  className={styles.job_search}
              placeholder="Nhập tên công việc"
              type="text"
              onChange={(e) =>
                setSearchOption({
                  ...searchOption,
                  key: e.target
                    .value
                })
              } */
            />
          </Popover>

          <Popover
            className="w-full"
            placement="bottomRight"
            content={contentCity}
            trigger="click"
          >
            <div
              className={styles.choice_city}
              onClick={() => {
                // setShowBoxChoiceCity(!showBoxChoiceCity);
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

        {showBoxChoiceCity && (
          <div className={styles.box_choice_city}>
            <div className={styles.nd_box_key}>
              <div className={styles.box_district}>
                <div className="nd_box_left col-7 col-lg-8 ">
                  <p className={styles.text}>Địa điểm phổ biến</p>
                </div>
                {choiceCity != "Chọn tỉnh thành" ? (
                  <div className={styles.box_key_district}>
                    {/* Show district */}
                    {quan_huyen
                      .filter(
                        (codeDistrict) => codeDistrict.cit_parent == codeCity
                      )
                      .map((district) => (
                        <div
                          onClick={() =>
                            setSearchOption({
                              ...searchOption,
                              district: district.cit_id,
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
              <div className="box_key_city_right" id="city_lq">
                <p className={styles.text}>Danh sách địa điểm</p>
                <input
                  type="text"
                  className={styles.inp_search_city}
                  onChange={(e) => setSearchCity(e.target.value)}
                  value={searchCity}
                />
                {/* Show city */}
                {searchCity ? (
                  <div className={styles.box_key_city}>
                    {tinh_thanh
                      .filter((city) =>
                        city.cit_name
                          .toLowerCase()
                          .includes(searchCity.toLowerCase())
                      )
                      .map((e) => (
                        <div
                          key={e.cit_id}
                          className={styles.list_city + " cursor-pointer"}
                          onClick={() => {
                            setSearchOption({
                              ...searchOption,
                              city: e.cit_id,
                            });
                            setChoiceCity(e.cit_name);
                            setCodeCity(e.cit_id);
                          }}
                        >
                          {e.cit_name}
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
                            city: city.cit_id,
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
            <button
              className={styles.close_box_key}
              onClick={() => setShowBoxChoiceCity(false)}
            >
              x
            </button>
          </div>
        )}
      </div>

      {/* show box */}
    </div>
  );
}

export default SearchUV;

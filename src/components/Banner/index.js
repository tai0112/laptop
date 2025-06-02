import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Col, Row } from "antd";
import "swiper/css/scrollbar";
import "swiper/css";
import "./Banner.scss";
import man_hinh_thang_04_banner_web_slider_800x400 from "../../assets/images/man_hinh_thang_04_banner_web_slider_800x400.webp";
import thang_04_laptop_rtx_50series_800x400 from "../../assets/images/thang_04_laptop_rtx_50series_800x400.webp";
import laptop_msi_week_banner_800x400 from "../../assets/images/laptop_msi_week_banner_800x400.webp";
import thang_04_layout_web_01 from "../../assets/images/thang_04_layout_web_01.webp";
import thang_04_layout_web_02 from "../../assets/images/thang_04_layout_web_02.webp";
import thang_04_layout_web_03 from "../../assets/images/thang_04_layout_web_03.webp";
import thang_04_layout_web_04 from "../../assets/images/thang_04_layout_web_04.webp";
function Banner() {
  return (
    <>
      <div className="banner">
        <Row gutter={5}>
          <Col span={16}>
            <Swiper
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src={man_hinh_thang_04_banner_web_slider_800x400}
                  alt="banner"
                  className="banner__img"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={laptop_msi_week_banner_800x400}
                  alt="banner"
                  className="banner__img"
                />
              </SwiperSlide>
            </Swiper>
          </Col>
          <Col span={8}>
            <img
              src={thang_04_laptop_rtx_50series_800x400}
              className="banner__img"
            />
            <img
              src={thang_04_layout_web_01}
              className="banner__img"
            />
          </Col>
          <Col span={8}>
              <img
              src={thang_04_layout_web_02}
              className="banner__img"
            />
          </Col>
          <Col span={8}>
              <img
              src={thang_04_layout_web_03}
              className="banner__img"
            />
          </Col>
          <Col span={8}>
              <img
              src={thang_04_layout_web_04}
              className="banner__img"
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Banner;

"use client";

import "./SlideShowMobile.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";

interface SlideShowProps {
  images: string[];
  title: string;
}

const SlideShowMobile = ({ images, title }: SlideShowProps) => {
  return (
    <div className="container_swiper_mobile">
      <Swiper
        pagination
        autoplay={{
          delay: 5000,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              className="image_product_mobile"
              width={600}
              height={500}
              alt={title}
              src={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideShowMobile;

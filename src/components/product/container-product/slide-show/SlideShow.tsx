"use client";

import "./SlideShow.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper as SwiperObject } from "swiper";

import React, { CSSProperties, useState } from "react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";

interface SlideShowProps {
  images: string[];
  title: string;
}

const SlideShow = ({ images, title }: SlideShowProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject | null>(null);

  return (
    <div className="container_swiper">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#949494",
            "--swiper-pagination-color": "#949494",
          } as CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 5000,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              className="image_product"
              width={1024}
              height={800}
              alt={title}
              src={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              className="image_product"
              width={300}
              height={300}
              alt={title}
              src={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideShow;

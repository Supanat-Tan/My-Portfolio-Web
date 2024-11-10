import React, { useEffect, useState } from "react";
import "../../../css/imageSlider.css";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval }) => {
  const [selectImages, setSelectImages] = useState(0);

  const nextImage = () => {
    setSelectImages((img) => (img === images.length - 1 ? 0 : img + 1));
  };

  const prevImage = () => {
    setSelectImages((img) => (img === 0 ? images.length - 1 : img - 1));
  };

  let thirdImage: number = 2;

  switch (selectImages) {
    case 0:
      thirdImage = 2;
      break;
    case 1:
      thirdImage = 0;
      break;
    case 2:
      thirdImage = 1;
      break;
  }

  useEffect(() => {
    const slideInterval = setInterval(nextImage, interval);

    return () => clearInterval(slideInterval);
  });

  return (
    <div className="main-all-container">
      <button onClick={prevImage}>Prev</button>
      <div className="image-container">
        <Image
          src={images[0]}
          alt={"Mech1"}
          width={512}
          height={768}
          className={`image${selectImages}`}
        />
        <Image
          src={images[1]}
          alt={"Mech2"}
          width={512}
          height={768}
          className={`image${selectImages + 1 === 3 ? 0 : selectImages + 1}`}
        />
        <Image
          src={images[2]}
          alt={"Mech3"}
          width={512}
          height={768}
          className={`image${thirdImage}`}
        />
      </div>
      <button onClick={nextImage}>Next</button>
    </div>
  );
};

export default ImageSlider;

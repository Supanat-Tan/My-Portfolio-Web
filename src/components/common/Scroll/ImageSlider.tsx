import React, { useState } from "react";
import "../../../css/imageSlider.css";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [selectimages, setSelectImages] = useState(0);

  const nextImage = () => {
    setSelectImages((img) => (img === images.length - 1 ? 0 : img + 1));
  };

  const prevImage = () => {
    setSelectImages((img) => (img === 0 ? images.length - 1 : img - 1));
  };

  let thirdImage: number = 2;

  switch (selectimages) {
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

  return (
    <div className="main-all-container">
      <button onClick={prevImage}>Previous</button>
      <div className="image-container">
        <Image
          src={images[0]}
          alt={"Mech1"}
          width={512}
          height={768}
          className={`image${selectimages}`}
        />
        <Image
          src={images[1]}
          alt={"Mech2"}
          width={512}
          height={768}
          className={`image${selectimages + 1 === 3 ? 0 : selectimages + 1}`}
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

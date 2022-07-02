import { useState, useEffect } from 'react';
const ProgressiveImage = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  useEffect(() => {
    // update the image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc
      ? 'loading w-full h-full object-center object-cover lg:w-full lg:h-full'
      : 'loaded w-full h-full object-center object-cover lg:w-full lg:h-full';

  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ''}
      className={`${customClass}`}
    />
  );
};

export default ProgressiveImage;

//

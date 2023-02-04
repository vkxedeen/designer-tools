import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

type Props = {
  src: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

function URLImage({
  src,
  x = 0,
  y = 0,
  width,
  height,
}: Props) {
  const [img] = useImage(src);

  return (
    <Image
      width={width}
      height={height}
      image={img}
      x={x}
      y={y}
    />
  );
}

export default URLImage;

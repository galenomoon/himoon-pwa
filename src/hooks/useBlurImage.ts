import { useState, useEffect } from "react";
import { dynamicBlurDataUrl } from "@/utils/dynamicBlurDataURL";
import { StaticImageData } from "next/image";

export function useBlurImage({
  images,
}: {
  images: StaticImageData[] | string[];
}) {
  const [imagesSet, setImagesSet] = useState(
    [] as { imgUrl: string; blurHash: string }[]
  );

  const isStaticImage = (
    image: StaticImageData | string
  ): image is StaticImageData => {
    return (image as StaticImageData).src !== undefined;
  };

  if (images.some(isStaticImage)) {
    return images.map((image) => {
      if (isStaticImage(image)) {
        return { imgUrl: image.src, blurHash: image.blurDataURL };
      }
      return { imgUrl: image, blurHash: "" };
    });
  }

  useEffect(() => {
    const modifyData = async () => {
      const dataWithBlurHash = await getResources(images as string[]);
      setImagesSet(dataWithBlurHash as { imgUrl: string; blurHash: string }[]);
    };

    modifyData();
  }, [images]);

  const getResources = async (data: string[]) => {
    const resources = await Promise.all(
      data.map(async (photoURL) => ({
        imgUrl: photoURL,
        blurHash: await dynamicBlurDataUrl(photoURL),
      }))
    );

    return resources;
  };

  return imagesSet;
}

import { useState, useEffect } from "react";
import { dynamicBlurDataUrl } from "@/utils/dynamicBlurDataURL";
import { StaticImageData } from "next/image";

export function useBlurImage({
  images = [],
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

  useEffect(() => {
    const modifyData = async () => {
      const dataWithBlurHash = await getResources(images as string[]);
      setImagesSet(dataWithBlurHash as { imgUrl: string; blurHash: string }[]);
    };

    modifyData();
  }, [images]);

  const getResources = async (data: string[]) => {
    if (data.some(isStaticImage)) {
      return data.map((image: any) => {
        return { imgUrl: image.src, blurHash: image.blurDataURL };
      });
    }

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

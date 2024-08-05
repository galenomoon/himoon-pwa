import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

//styles
import Skeleton from "../Skeleton";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

//hooks
import { useBlurImage } from "@/hooks/useBlurImage";

export function Carousel({
  images,
  isLoading,
  squareSize,
}: {
  images: StaticImageData[] | string[];
  isLoading?: boolean;
  squareSize?: boolean;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const imageSizeProp = squareSize
    ? { width: 400, height: 400 }
    : {
        width: 800,
        height: 400,
      };
  const ref = useRef<HTMLDivElement>(null);
  const bluredImages = useBlurImage({ images });

  const controlledScroll = () => {
    if (ref.current) {
      const index = Math.round(
        ref.current.scrollLeft / ref.current.clientWidth
      );
      setCurrentImage(index);
    }
  };

  const scrollTo = (index: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.clientWidth * index,
        behavior: "smooth",
      });
      setCurrentImage(index);
    }
  };

  return (
    <section className="flex items-center !h-fit max-w-screen-desktop justify-center relative w-full">
      {!!currentImage && (
        <button
          onClick={() => scrollTo(currentImage - 1)}
          className="z-30 absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
        >
          <RxCaretLeft className="text-3xl text-typography-primary" />
        </button>
      )}
      <figure
        ref={ref}
        onScroll={controlledScroll}
        className="z-20 scrollbar-hide overflow-auto h-fit items-center flex gap-2 snap-x snap-mandatory"
      >
        <Skeleton
          length={4}
          conditional={!isLoading || !images.length}
          className={`
            ${squareSize ? "w-full h-[400px] bg-white" : "w-[95%] first:pl-3"}
            object-cover 
            desktop:first:pl-0 last:mr-12 desktop:w-[100%] rounded-3xl w-[90%] overflow-hidden snap-always snap-center flex-shrink-0`}
        >
          {bluredImages?.map((banner, index) => (
            <Image
              key={index}
              alt="product"
              src={banner.imgUrl as any}
              blurDataURL={(banner.blurHash as string) || ""}
              placeholder="blur"
              {...imageSizeProp}
              className={`
                ${
                  squareSize
                    ? "w-full h-[400px] bg-white"
                    : "w-[95%] first:pl-3"
                }
                object-cover 
                desktop:first:pl-0 last:mr-12 desktop:w-[100%] rounded-3xl w-[90%] overflow-hidden snap-always snap-center flex-shrink-0`}
            />
          ))}
        </Skeleton>
      </figure>
      {!!(images.length > 1 && currentImage < images.length - 1) && (
        <button
          onClick={() => scrollTo(currentImage + 1)}
          className="z-30 absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
        >
          <RxCaretRight className="text-3xl text-typography-primary" />
        </button>
      )}
    </section>
  );
}

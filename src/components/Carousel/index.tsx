import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Skeleton from "../Skeleton";

export function Carousel({
  images,
  isLoading,
}: {
  images: StaticImageData[] | string[];
  isLoading?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollTo = (direction: "left" | "right") => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth / 2;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex items-center  max-w-screen-desktop justify-center relative w-full">
      <button
        onClick={() => scrollTo("left")}
        className="z-30 absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
      >
        <RxCaretLeft className="text-3xl text-typography-primary" />
      </button>
      <figure
        ref={ref}
        className="z-20 scrollbar-hide overflow-auto flex gap-2 snap-x snap-mandatory"
      >
        <Skeleton
          length={4}
          conditional={!isLoading || !images.length}
          className="desktop:first:pl-0 first:pl-3 last:mr-12 desktop:w-[100%] h-[400px] desktop:rounded-3xl rounded-[42px] w-[90%] overflow-hidden snap-always snap-center flex-shrink-0 object-cover"
        >
          {images?.map((banner, index) => (
            <Image
              key={index}
              alt="product"
              src={banner as any}
              width={800}
              height={800}
              className="desktop:first:pl-0 first:pl-3 last:mr-12 desktop:w-[100%] desktop:rounded-3xl rounded-[42px] w-[90%] overflow-hidden snap-always snap-center flex-shrink-0 object-cover"
            />
          ))}
        </Skeleton>
      </figure>
      <button
        onClick={() => scrollTo("right")}
        className="z-30 absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
      >
        <RxCaretRight className="text-3xl text-typography-primary" />
      </button>
    </section>
  );
}

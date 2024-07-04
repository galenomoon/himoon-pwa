// react-icons
import { BsTiktok } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

//next
import Image from "next/image";

//components
import Button from "@/components/Global/Button";

//assets
import header from "@/assets/landing-page-products-header.png";
import footer from "@/assets/landing-page-products-footer.png";

export default function SocialMediaSection() {
  return (
    <section className="flex flex-col justify-between items-center gap-8 h-[98vh] bg-background-purple relative">
      <Image
        src={header}
        alt="header"
        objectFit="fill"
      />
      <div className="flex flex-col px-4 items-center w-full justify-center gap-4">
        <div className="flex gap-6 items-center">
          <FaInstagram size={70} className="myshadow" />
          <BsTiktok size={60} className="myshadow" />
        </div>
        <article className="flex flex-col text-center items-center justify-center gap-1">
          <p className="text-2xl font-light">Tudo para sua criatividade</p>
          <h1 className="text-3xl font-bold">
            Nos acompanhe no Instagram e no TikTok e veja mais de perto todas as
            nossas novidades!
          </h1>
        </article>
        <Button className="font-bold w-full">NOS SIGA!</Button>
      </div>
      <Image
        src={footer}
        alt="footer"
        objectFit="fill"
      />
    </section>
  );
}

//next
import Image from "next/image";

//assets
import moon from "@/assets/512x512.png";

//components
import Logo from "@/components/Global/Logo";
import Button from "@/components/Global/Button";

export default function FirstSection() {
  return (
    <section className="px-4 pt-6 pb-12 flex flex-col justify-between gap-8 h-[90vh] bg-background-purple relative">
      <div className="flex flex-col gap-8 mt-12">
        <figure className="flex flex-col items-center text-center justify-center">
          <Image
            src={moon}
            alt="Moon"
            width={108}
            height={108}
            objectFit="cover"
          />
          <Logo />
          <p className="text-md tracking-[8px]">PAPELARIA CRIATIVA</p>
        </figure>
        <article className="flex flex-col text-center items-center justify-center gap-2">
          <p className="text-2xl font-light">Tudo para sua criatividade</p>
          <h1 className="text-3xl font-bold">
            Encontre os itens de papelaria mais inspiradores! Juntamos
            praticidade e fofura para você.
          </h1>
        </article>
      </div>
      <Button className="font-bold">EXPLORAR</Button>
    </section>
  );
}
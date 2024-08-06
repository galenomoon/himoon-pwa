import React, { useContext, useEffect, useState } from "react";

//next
import Link from "next/link";
import { useRouter } from "next/router";

//styles
import toast from "react-hot-toast";
import { RxCaretLeft } from "react-icons/rx";
import { PiBagSimple } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";

//components
import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";

//contexts
import { AuthContext } from "@/contexts/authContext";

//requests
import { createAddress } from "@/requests/address/createAddress";

//utils
import { states } from "@/constants/states";
import { formatCEP } from "@/utils/formatCEP";

//interfaces
import { IAddress } from "@/interfaces/address";

export default function AddressCreatePage() {
  const { push } = useRouter();
  const { currentUser, updateCurrentUser = () => {} } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(true);
  const [address, setAddress] = useState<IAddress>({
    name: "",
    recipientName: [currentUser?.firstName, currentUser?.lastName].join(" "),
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    zip: "",
    number: "",
    contact: currentUser?.phone || "",
    additionalInformation: "",
    default: false,
  });

  useEffect(() => {
    handleCep(address.zip);
  }, [address.zip]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoaded(false);
    try {
      await createAddress(address);
      await updateCurrentUser();
      toast.success("Endereço criado com sucesso!");
      push("/perfil/enderecos");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar endereço");
    } finally {
      setIsLoaded(true);
    }
  };

  const handleCep = async (cep: string) => {
    if (cep.length < 9) return;

    try {
      const param = cep.replaceAll("-", "");
      const response = await fetch(`https://viacep.com.br/ws/${param}/json/`);

      const data = await response.json();

      if (data?.erro) {
        setAddress({
          ...address,
          street: "",
          neighborhood: "",
          city: "",
          state: "",
        });
        return console.error("CEP não encontrado");
      }

      setAddress({
        ...address,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: states[data.uf],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <section className="max-w-screen-desktop w-full flex gap-6 flex-col items-center p-3">
        <form
          onSubmit={submit}
          className="max-w-screen-desktop w-full flex gap-6 flex-col items-center pb-16 p-3"
        >
          <header className="w-full flex justify-between items-center">
            <div className="w-full flex items-center justify-start">
              <Link
                href={"/perfil/enderecos"}
                className="flex items-center w-[22px] justify-center flex-shrink-0"
              >
                <RxCaretLeft size={45} className="flex-shrink-0" />
              </Link>
            </div>
            <div className=" whitespace-nowrap w-full flex items-center justify-center font-medium text-xl">
              <p>Adicionar Endereço</p>
            </div>
            <div className="w-full flex items-center justify-end"></div>
            <div />
          </header>
          <div className="flex flex-col gap-2 w-full">
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">
                Nome Completo
              </label>
              <Input
                required
                placeholder="Digite seu nome"
                value={address.recipientName}
                onChange={(e) =>
                  setAddress({ ...address, recipientName: e.target.value })
                }
              />
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">CEP</label>
              <Input
                required
                placeholder="Digite seu CEP"
                maxLength={9}
                value={address.zip}
                onChange={(e) =>
                  setAddress({ ...address, zip: formatCEP(e.target.value) })
                }
              />
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">Estado</label>
              <Input
                required
                disabled
                placeholder="Digite o nome do estado"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">Cidade</label>
              <Input
                required
                disabled
                placeholder="Digite o nome da cidade"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">Bairro</label>
              <Input
                required
                disabled
                placeholder="Digite o nome do bairro"
                value={address.neighborhood}
                onChange={(e) =>
                  setAddress({ ...address, neighborhood: e.target.value })
                }
              />
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">Rua/Avenida</label>
              <Input
                required
                placeholder="Digite o nome da rua ou avenida"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <span className="text-sm font-light text-typography-primary/40">
                Informe somente o nome da rua ou avenida
              </span>
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">Número</label>
              <Input
                required
                placeholder="Digite o número"
                value={address.number}
                onChange={(e) =>
                  setAddress({ ...address, number: e.target.value })
                }
              />
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">
                Complemento (Opcional)
              </label>
              <Input
                placeholder="Digite o complemento (Opcional)"
                value={address.complement}
                onChange={(e) =>
                  setAddress({ ...address, complement: e.target.value })
                }
              />
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">
                Telefone de Contato
              </label>
              <Input
                required
                placeholder="Digite seu telefone"
                value={address.contact}
                onChange={(e) =>
                  setAddress({ ...address, contact: e.target.value })
                }
              />
              <span className="text-sm font-light text-typography-primary/40">
                Se houve algum problema no envio, você será contatado por este
                número
              </span>
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">
                Informações Adicionais (Opcional)
              </label>
              <Input
                placeholder="Digite informações adicionais (Opcional)"
                value={address.additionalInformation}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    additionalInformation: e.target.value,
                  })
                }
              />
              <span className="text-sm font-light text-typography-primary/40">
                Descriao da faixada, ponto de referência, informações de
                segurança, etc.
              </span>
            </data>
            <data className="w-full flex flex-col">
              <label className="text-typography-primary/80">
                Salvar endereço como:
              </label>
              <div className="w-full flex gap-2">
                <button
                  type="button"
                  onClick={(e) =>
                    setAddress({
                      ...address,
                      name: address.name === "Casa" ? "" : "Casa",
                    })
                  }
                  className={`flex gap-2 items-center w-full h-fit p-3 border-2 border-typography-primary/10 rounded-2xl
                  ${
                    address.name === "Casa"
                      ? "border-typography-purpleDark/60 bg-background-purple/40 text-typography-purpleDark"
                      : ""
                  }
                  `}
                >
                  <AiOutlineHome size={24} />
                  <p>Casa</p>
                </button>
                <button
                  type="button"
                  onClick={(e) =>
                    setAddress({
                      ...address,
                      name: address.name === "Trabalho" ? "" : "Trabalho",
                    })
                  }
                  className={`flex gap-2 items-center w-full h-fit p-3 border-2 border-typography-primary/10 rounded-2xl
                  ${
                    address.name === "Trabalho"
                      ? "border-typography-purpleDark/60 bg-background-purple/40 text-typography-purpleDark"
                      : ""
                  }
                  `}
                >
                  <PiBagSimple size={24} />
                  <p>Trabalho</p>
                </button>
              </div>
            </data>
            <data className="w-full flex items-center">
              <Checkbox
                checked={address.default}
                onChange={() =>
                  setAddress({ ...address, default: !address.default })
                }
              >
                Marcar como endereço padrão
              </Checkbox>
            </data>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button isLoading={!isLoaded} type="submit" className="w-full">
              Salvar
            </Button>
            <Button
              href="/perfil/endereco"
              className="bg-white !text-black border-black border-2 font-medium w-full"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

import React, { useContext, useEffect, useState } from "react";

//next
import Link from "next/link";
import { useRouter } from "next/router";

//styles
import toast from "react-hot-toast";
import { PiBagSimple } from "react-icons/pi";
import { RxCaretLeft } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";

//component
import Button from "../Button";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";

//context
import { AuthContext } from "@/contexts/authContext";

//requests
import { getAddresses } from "@/requests/address/getAddresses";

//constants
import { states } from "@/constants/states";

//interfaces
import { IAddress } from "@/interfaces/address";

export default function AddressForm({
  onSubmit,
}: {
  onSubmit: (param: any) => void;
}) {
  const { query, push } = useRouter();
  const { addressId } = query;
  const { currentUser, updateCurrentUser = () => {} } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(true);
  const [address, setAddress] = useState<IAddress>({
    recipientName: [currentUser?.firstName, currentUser?.lastName].join(" "),
    zip: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
    contact: currentUser?.phone || "",
    additionalInformation: "",
    name: "Casa",
    default: false,
  });

  useEffect(() => {
    setAddress(state => ({
      ...state,
      recipientName: [currentUser?.firstName, currentUser?.lastName].join(" "),
      contact: currentUser?.phone || "",
    }));
  }, [currentUser]);

  useEffect(() => {
    fetchData();
  }, [addressId]);

  useEffect(() => {
    handleCep(address.zip);
  }, [address.zip]);

  const fetchData = async () => {
    if (!addressId) return;
    try {
      const [currentAddress] = (await getAddresses(addressId as string)) || [];
      setAddress(currentAddress);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  };

  async function handleCep(cep: string) {
    if (cep.length < 9 || !isLoaded) return;

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
  }

  function formatCEP(cep: string) {
    return cep.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.name) {
      toast.error("Selecione o como deseja salvar o endereço");
      return;
    }

    setIsLoaded(false);
    try {
      await onSubmit(address);
      await updateCurrentUser();
      toast.success("Endereço salvo com sucesso!");
      push("/perfil/enderecos");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar endereço");
    } finally {
      setIsLoaded(true);
    }
  };

  return (
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
          <label className="text-typography-primary/80">Nome Completo</label>
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
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </data>
        <data className="w-full flex flex-col">
          <label className="text-typography-primary/80">Cidade</label>
          <Input
            required
            disabled
            placeholder="Digite o nome da cidade"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </data>
        <data className="w-full flex flex-col">
          <label className="text-typography-primary/80">Bairro</label>
          <Input
            required
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
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
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
            onChange={(e) => setAddress({ ...address, number: e.target.value })}
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
            Descriao da faixada, ponto de referência, informações de segurança,
            etc.
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
                  name: "Casa",
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
                  name: "Trabalho",
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
          href="/perfil/enderecos"
          className="bg-white !text-black border-black border-2 font-medium w-full"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

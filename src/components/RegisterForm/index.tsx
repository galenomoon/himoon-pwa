import { useContext, useEffect, useState } from "react";

//next
import Image from "next/image";

//components
import Button from "../Button";
import { Input } from "../Input";

//styles
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { PiEnvelope, PiLock, PiUser } from "react-icons/pi";

//assets
import completeLogo from "@/assets/complete-logo.png";

//utils
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

//context
import { AuthContext } from "@/contexts/authContext";
import { IUser } from "@/interfaces/user";

export function RegisterForm({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) {
  const { isOpened, submit } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    if (isOpened) {
      setStep(1);
    }
  }, [isOpened]);

  const steps = {
    1: [
      {
        label: "E-mail",
        type: "email",
        Icon: PiEnvelope,
        placeholder: "E-mail",
        value: form.email,
        onChange: (e: any) => setForm({ ...form, email: e.target.value }),
      },
      {
        label: "Senha",
        type: "password",
        Icon: PiLock,
        placeholder: "Senha",
        value: form.password,
        onChange: (e: any) => setForm({ ...form, password: e.target.value }),
      },
    ],
    2: [
      {
        label: "Nome",
        type: "text",
        Icon: PiUser,
        placeholder: "Nome",
        value: form.firstName,
        onChange: (e: any) => setForm({ ...form, firstName: e.target.value }),
      },
      {
        label: "Sobrenome",
        type: "text",
        Icon: PiUser,
        placeholder: "Sobrenome",
        value: form.lastName,
        onChange: (e: any) => setForm({ ...form, lastName: e.target.value }),
      },
      {
        label: "Telefone",
        type: "tel",
        Icon: MdOutlinePhoneAndroid,
        placeholder: "Telefone",
        value: form.phone,
        maxLength: 15,
        onChange: (e: any) =>
          setForm({ ...form, phone: formatPhoneNumber(e.target.value) }),
      },
    ],
  } as {
    [key: number]: {
      label: string;
      type: string;
      Icon: any;
      placeholder: string;
      value: string;
      onChange: (e: any) => void;
      maxLength?: number;
    }[];
  };

  async function handleSteps(e: any) {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    await submit!("create", form as IUser);
  }

  return (
    <form
      onSubmit={handleSteps}
      className="flex gap-4 h-full w-full max-w-[400px] flex-col items-center"
    >
      <Image src={completeLogo} alt="logo" className="w-[264px] mt-6" />
      <p className="text-4xl font-thin mb-2 mt-4">Crie sua conta</p>
      {steps[step as number].map((step, index) => (
        <Input
          required
          key={index}
          type={step.type}
          Icon={step.Icon}
          placeholder={step.placeholder}
          className="w-full mt-4"
          value={step.value}
          maxLength={step.maxLength}
          onChange={step.onChange}
        />
      ))}
      <Button type={"submit"} className="w-full mt-4">
        {step === 1 ? "Próximo" : "Cadastrar"}
      </Button>
      {step === 1 ? (
        <p>
          Já tem uma conta?{" "}
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="underline"
          >
            Entrar
          </button>
        </p>
      ) : (
        <button type="button" onClick={() => setStep(1)} className="underline">
          Voltar
        </button>
      )}
    </form>
  );
}

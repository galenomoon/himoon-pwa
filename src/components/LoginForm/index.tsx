//next
import Image from "next/image";

//components
import Button from "../Button";
import { Input } from "../Input";

//styles
import { PiEnvelope, PiLock } from "react-icons/pi";

//assets
import completeLogo from "@/assets/complete-logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import { IUser } from "@/interfaces/user";

export function LoginForm({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { submit, isLoading } = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await submit!("login", user as IUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 h-full max-w-[400px] w-full flex-col items-center"
    >
      <Image src={completeLogo} alt="logo" className="w-[264px] mt-6" />
      <p className="text-4xl font-thin mb-2 mt-4">Bem-vindo de volta!</p>
      <div className="flex flex-col w-full">
        <label className="text-typography-primary/80">E-mail</label>
        <Input
          required
          type="email"
          Icon={PiEnvelope}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="E-mail"
          className="w-full mt-4"
        />
      </div>
      <div className="flex flex-col gap-1 justify-end w-full">
        <div className="flex flex-col w-full">
          <label className="text-typography-primary/80">Senha</label>
          <Input
            required
            Icon={PiLock}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Senha"
            className="w-full mt-4"
          />
        </div>

        <button
          type="button"
          className="text-right underline text-typography-primary/40"
        >
          Esqueceu sua senha?
        </button>
      </div>
      <Button isLoading={isLoading} type="submit" className="w-full mt-4">
        Entrar
      </Button>
      <p>
        Não tem conta?{" "}
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className="underline"
        >
          Crie uma conta
        </button>
      </p>
    </form>
  );
}

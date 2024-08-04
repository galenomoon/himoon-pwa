import React, { useContext, useState } from "react";

//components
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

//styles
import { motion } from "framer-motion";
import { fade } from "@/animations/fade";
import { slide } from "@/animations/slide";
import { IoMdClose } from "react-icons/io";

//contexts
import { AuthContext } from "@/contexts/authContext";

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const { isOpened, closeModal } = useContext(AuthContext);

  const Form = isLogin ? LoginForm : RegisterForm;

  return (
    <motion.div
      animate={fade(isOpened as boolean)}
      initial={{ display: "none" }}
      onClick={closeModal}
      className="max-w-screen fixed left-0 top-0 z-50 flex h-screen max-h-screen w-screen items-center justify-center overflow-hidden bg-black bg-opacity-20 backdrop-blur-md"
    >
      <motion.nav
        animate={slide(isOpened as boolean)}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center z-50  overflow-y-auto bg-white py-6 px-3 shadow-lg transition-all duration-300 ease-out h-[100dvh] max-h-[100dvh] w-[100dvw] self-start rounded-none"
      >
        <header className="flex w-full items-center pb-3 justify-between">
          <br />
          <button onClick={closeModal} className="rounded-lg bg-gray-200 p-0.5">
            <IoMdClose size={28} className="opacity-80" />
          </button>
        </header>
        <Form setIsLogin={setIsLogin} />
      </motion.nav>
    </motion.div>
  );
}

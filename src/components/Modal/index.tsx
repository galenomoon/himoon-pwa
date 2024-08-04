import React from "react"

//styles
import { IoMdClose } from "react-icons/io"

//animations
import { motion } from "framer-motion"
import { fade } from "@/animations/fade"
import { slide } from "@/animations/slide"

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
  title: string
  isOpen: boolean
  className?: string
}

export default function Modal({
  onClose,
  children,
  isOpen,
  title,
  className,
}: ModalProps) {
  return (
    <motion.div
      animate={fade(isOpen)}
      initial={{ display: "none" }}
      onClick={onClose}
      className="max-w-screen  fixed left-0 top-0 z-[901] flex h-screen max-h-screen w-screen items-center justify-center overflow-hidden bg-black bg-opacity-20 backdrop-blur-md"
    >
      <motion.nav
        animate={slide(isOpen)}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col max-w-screen-desktop items-center gap-8 overflow-y-auto bg-white p-6 shadow-lg transition-all duration-300 ease-out h-[100dvh] max-h-[100dvh] desktop:w-[600px] w-[100dvw] self-start rounded-none ${
          className ? className : ""
        }`}
      >
        <header className="flex w-full items-center justify-between">
          <h1 className="font-satoshi-medium text-2xl">{title}</h1>
          <button onClick={onClose} className="rounded-lg bg-gray-200 p-0.5">
            <IoMdClose size={28} className="opacity-80" />
          </button>
        </header>
        <section className="flex w-full flex-col">{children}</section>
      </motion.nav>
    </motion.div>
  )
}

import { destroyCookie } from "nookies";

export default function destroySession() {
  destroyCookie(null, "token");
}
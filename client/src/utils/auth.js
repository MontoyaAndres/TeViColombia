import redirect from "./redirect";
import { me } from "../api/user";

async function isLoggedIn(context) {
  const response = await me();
  console.log(response.ok);
  if (response.ok) {
    redirect(context, "/");
  }
  return {};
}

async function isNotLoggedIn(context) {
  const response = await me();
  if (response.ok) {
    return {};
  }
  redirect(context, "/login");
}

export { isLoggedIn, isNotLoggedIn };

import Cookies from "js-cookie";

const AuthToken = () => {
  const TOKEN = Boolean(Cookies.get("token"));
  if (!TOKEN) {
    window.location.assign("/");
  }
};

export { AuthToken };

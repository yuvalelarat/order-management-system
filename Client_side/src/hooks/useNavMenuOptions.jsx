import { useNavigate } from "react-router-dom";
import { useUserContext } from "./useUserContext";
import { adminNavMenuOption, userNavMenuOption } from "../config";

export function useNavMenuOptions() {
  const navigate = useNavigate();
  const { user, clearUserDetails } = useUserContext();
  if (!user) return {};
  let options = [];
  switch (user.role) {
    case "User":
      options.push({
        value: userNavMenuOption[0].value,
        label: userNavMenuOption[0].label,
        handleClick: () => navigate(userNavMenuOption[0].navigateTO),
      });
      break;
    case "Admin":
      options.push({
        value: adminNavMenuOption[0].value,
        label: adminNavMenuOption[0].label,
        handleClick: () => navigate(adminNavMenuOption[0].navigateTO),
      });
      break;
    default:
      options = [];
  }
  options.push({
    value: "logout",
    label: "התנתק",
    handleClick: () => {
      clearUserDetails();
      navigate("/");
    },
  });
  return options;
}

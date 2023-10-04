import { useAppSelector } from "../redux/hooks";
import { selectToken } from "../redux/features/auth/authSlice";

export const useAuth = () => {
  const user = useAppSelector(selectToken);
  if (user) {
    return true;
  } else {
    return false;
  }
};

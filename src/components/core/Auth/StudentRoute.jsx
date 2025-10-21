import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constants";

export default function StudentRoute({ children }) {
  const { user } = useSelector((state) => state.profile);

  if (!user) {
    return (
      <p className="text-center mt-20 text-xl text-gray-300">
        Loading...
      </p>
    );
  }

  if (user.ACCOUNT_TYPE !== ACCOUNT_TYPE.STUDENT) {
    return (
      <p className="text-center mt-20 text-xl text-gray-300">
        You don’t have access to this page.
      </p>
    );
  }

  return children;
}

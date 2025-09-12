import { toast } from "react-hot-toast";

const Notify = (type, message) => {
  toast[type](message, {
    duration: 5000,
    position: "top-center",
  });
};
export default Notify;
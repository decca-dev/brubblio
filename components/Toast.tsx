import { useEffect } from "react";

interface ToastOptions {
  title: string;
  description: string;
  type: ToastType;
}

type ToastType = "error" | "success";

const Toast = ({ title, description, type }: ToastOptions) => {
  useEffect(() => {
    const toast = document.querySelector("#toast") as HTMLDivElement;
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2805);
  }, []);

  return (
    <div id="toast" className={"toast show toast-" + type}>
      <h6 className="inline-block align-middle">
        <img
          src={
            type === "success"
              ? "https://cdn.discordapp.com/emojis/763060759835705345.png"
              : "https://cdn.discordapp.com/emojis/763060555052220417.png"
          }
          alt=""
          width="25"
          height="25"
          className="inline-block align-middle mr-2"
        />
        {title}
      </h6>
      <p>{description}</p>
    </div>
  );
};

export default Toast;

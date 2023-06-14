import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useRef, useState } from "react";

interface Props {
  password: string;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  changehandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  id: string;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
}

function PasswordField({
  password,
  setPassword,
  changehandler,
  placeholder,
  name,
  id,
  handleBlur,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword((show) => !show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setPassword) {
      setPassword(e.target.value);
    } else if (changehandler) {
      changehandler(e);
    }
  };
  return (
    <div className="relative">
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        name={name}
        value={password}
        id={id}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        className="w-full text-white text-base font-semibold p-2 rounded-md outline-none border-none appearance-none  bg-[#121212] hover:outline-1 hover:outline-teal-50 shadow-slate-300/40 focus:border-5 focus:border-white"
      />
      <div className="h-full w-fit flex items-center absolute top-0 bottom-0 right-0  pe-5">
        <button
          onClick={togglePassword}
          type="button"
          className="bg-transparent text-white
                  border-none hover:scale-110"
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;

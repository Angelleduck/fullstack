import { LucideIcon } from "lucide-react";

interface InputProps {
  name: string;
  type: string;
  id: string;
  placeholder: string;
  icon: LucideIcon;
}

export default function Input({
  name,
  type,
  id,
  icon: Icon,
  placeholder,
}: InputProps) {
  return (
    <div className="flex items-center  relative">
      <Icon className="absolute left-1" />
      <input
        className="w-full py-2 pl-8 border rounded-md outline-none"
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

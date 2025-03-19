import { Lock, Mail } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { login } = useLogin();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login({ email, password });
  }
  return (
    <div className="pt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[400px] border mx-auto rounded-md p-2"
      >
        <h1 className="text-xl font-bold text-center">LOGIN</h1>

        <div className="mb-6">
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            type="email"
            id="email"
            icon={Mail}
            placeholder="Enter email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            type="password"
            id="password"
            icon={Lock}
            placeholder="Enter password"
          />
        </div>
        <button className="bg-blue-400 py-2 rounded-md">Login In</button>
        <hr />
        <p>
          You don't have an account ?
          <Link to="/register" className="text-blue-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

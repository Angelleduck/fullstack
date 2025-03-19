import { Link } from "react-router-dom";
import Input from "../components/Input";
import { Lock, Mail, User } from "lucide-react";
import { signUp } from "../services/apiAuth";

export default function Register() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    await signUp({ name, email, password, confirmPassword });
  }
  return (
    <div className="pt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[400px] border mx-auto rounded-md p-2"
      >
        <h1 className="text-xl font-bold text-center">LOGIN</h1>

        <div className="mb-6">
          <label htmlFor="name">Name</label>
          <Input
            name="name"
            type="name"
            id="name"
            icon={User}
            placeholder="Enter your name"
          />
        </div>
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
        <div className="mb-6">
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <Input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            icon={Lock}
            placeholder="Confirm password"
          />
        </div>
        <button className="bg-blue-400 py-2 rounded-md">Sign Up</button>
        <hr />
        <p>
          You already have an account ?
          <Link to="/login" className="text-blue-400">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

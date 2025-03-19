import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AppLayout() {
  const { data } = useAuth();

  return (
    <>
      <div className="mb-12">
        <header className=" bg-blue-400 p-3 fixed w-full top-0">
          <div className="flex justify-between max-w-[1300px] mx-auto">
            <Link to="/">My App</Link>
            <nav>
              <ul className="flex gap-2">
                <Link to="/login">Login</Link>
                <Link to="posts">Posts</Link>
                {data && <li>Alex</li>}
              </ul>
            </nav>
          </div>
        </header>
      </div>
      {<Outlet />}
    </>
  );
}

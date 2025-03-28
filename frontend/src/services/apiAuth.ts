import ky from "ky";

interface signInProps {
  email: string;
  password: string;
}

interface signUpProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface Res {
  statusCode: number;
  message: string;
}

const api = ky.create({
  prefixUrl: import.meta.env.VITE_CLIENT_URL,
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const res = await (<Promise<Res>>response.json());
        if (
          response.status === 401 &&
          res["message"] == "Invalid access token"
        ) {
          await ky
            .get(`${import.meta.env.VITE_CLIENT_URL}/auth/refreshToken`, {
              credentials: "include",
            })
            .json();

          return ky(_request);
        }
      },
    ],
  },
});
export async function signIn({ email, password }: signInProps) {
  const res = await api.post<User>("auth/login", {
    json: { email, password },
    credentials: "include",
  });
  console.log(res);

  const data = await res.json();
  return data;
}

export async function signUp({
  email,
  name,
  password,
  confirmPassword,
}: signUpProps) {
  const res = api.post("auth/register", {
    json: { email, name, password, confirmPassword },
    credentials: "include",
  });

  const data = await res.json();
  return data;
}

export async function getUser() {
  const res = await api.get<User>("user", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

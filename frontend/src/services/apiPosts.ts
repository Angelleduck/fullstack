import ky from "ky";

interface Posts {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface Res {
  statusCode: number;
  message: string;
}

const api = ky.create({
  prefixUrl: `${import.meta.env.VITE_CLIENT_URL}/posts`,
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

export async function getPosts() {
  const res = await api.get<Posts[]>("posts", { credentials: "include" });
  const data = await res.json();

  return data;
}

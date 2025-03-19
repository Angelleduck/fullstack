import Loader from "../components/Loader";
import usePosts from "../hooks/usePosts";

export default function Posts() {
  const { data } = usePosts();

  if (data) {
    return data.map((el, idx: number) => <h1 key={idx}>{el.title}</h1>);
  }

  return <Loader />;
}

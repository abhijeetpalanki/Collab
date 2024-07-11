import BoardPage from "../../page";

type PageProps = {
  params: { boardId: string; cardId: string };
};

export default function CardPage({ params }: PageProps) {
  return <BoardPage params={params} />;
}

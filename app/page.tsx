export const dynamic = "force-dynamic";
import { getBoards } from "@/app/actions";
import BoardsGrid from "@/app/components/BoardsGrid";

export default async function Home() {
  const boardsInitial = await getBoards();
  return (
    <div className="flex justify-center font-mono">
      <BoardsGrid boardsInitial={boardsInitial} />
    </div>
  );
}

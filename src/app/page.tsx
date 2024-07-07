import Board from "@/components/Board";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginView />;
  }

  return (
    <div>
      <h1 className="text-4xl">Your Boards</h1>
      <Board />
    </div>
  );
};

export default HomePage;

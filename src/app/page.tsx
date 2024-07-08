import Boards from "@/components/Boards";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginView />;
  }

  return (
    <div>
      <h1 className="text-4xl mb-4">Your Boards</h1>

      <Boards />
      <div className="mt-4">
        <Link href="/new-board" className="btn primary inline-flex gap-2">
          Create New Board
          <FontAwesomeIcon className="h-6" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

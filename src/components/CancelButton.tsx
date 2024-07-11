import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="btn flex justify-center gap-2 w-full mt-2 items-center"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCancel} />
      Cancel Edit
    </button>
  );
}

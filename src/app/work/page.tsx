import { permanentRedirect } from "next/navigation";

/** /work has no index of its own — the home work list is the index. */
export default function WorkIndex() {
  permanentRedirect("/#work");
}


import { getServerSession } from "next-auth";
import auth from "../../auth";
import { SessionProvider } from "./../../context/SessionContext";
import Index from "./Index";


export default async function IndexPage() {
  const session = await getServerSession(auth);
 return (
   <SessionProvider session={session}>
      <Index session={session} />
    </SessionProvider>)
}

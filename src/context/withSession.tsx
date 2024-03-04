import { createContext, useContext } from "react";
import { Session } from "next-auth";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { getServerSession } from "next-auth";
import authOptions from "../auth";

const SessionContext = createContext<Session | null>(null);
export const SessionProvider = SessionContext.Provider;
export const useSessionContext = () => useContext(SessionContext);

export function withSession<P extends {}>(
  PageComponent: NextPage<P>,
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext,
    session: Session | null
  ) => Promise<GetServerSidePropsResult<P>>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    let propsResult: GetServerSidePropsResult<P> = { props: {} as P };
    if (getServerSidePropsFunc) {
      propsResult = await getServerSidePropsFunc(context, session);
    }
    if ("props" in propsResult) {
      const WithSessionProvider = (props: P) => (
        <SessionProvider value={session}>
          <PageComponent {...props} />
        </SessionProvider>
      );
      return { ...propsResult, props: { ...propsResult.props } };
    }
    return propsResult;
  };
}

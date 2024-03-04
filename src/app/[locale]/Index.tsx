"use client";

import { Session } from "next-auth";
import LocaleSwitcher from "../../components/LocaleSwitcher";

type Props = {
  session: Session | null;
};

export default function Index({ session }: Props) {

  return (
    <>
      <LocaleSwitcher />
    </>
  );
}

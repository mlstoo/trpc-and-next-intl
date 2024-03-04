import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({children, title}: Props) {
  return (
    <>
      <main className="max-w-8-xl container mx-auto flex-grow p-3 pb-3 pt-3">
        {children}
      </main>
    </>
  );
}

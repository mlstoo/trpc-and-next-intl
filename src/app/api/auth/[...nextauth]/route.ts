import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import auth from '../../../../auth';

const handler = (req: NextRequest, res: NextResponse) => NextAuth(req as any, res as any, auth);
export { handler as GET, handler as POST };


'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getUserBalance(): Promise<{
  pt?: number[];
  balance?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });
    const pt = transactions.map(
      (transaction) => transaction.amount, 0
    );
    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return { balance, pt };
  } catch (error) {
    return { error: 'Database error' };
  }
}

export default getUserBalance;

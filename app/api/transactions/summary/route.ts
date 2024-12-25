import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: Request) {

    const user = await currentUser();

    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        });
    }

    try {

        const transactions = await db.transaction.findMany({
            where: {
                userId: user.id,
            },
            select: {
                amount: true,
            },
        });

        let income = 0;
        let expense = 0;


        transactions.forEach((transaction) => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            } else {
                expense += Math.abs(transaction.amount);
            }
        });


        return new Response(
            JSON.stringify({ income, expense }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Something went wrong' }),
            {
                status: 500,
            }
        );
    }
}

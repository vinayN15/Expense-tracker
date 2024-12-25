import { currentUser } from '@clerk/nextjs/server';
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';
import IncomeExpense from '@/components/IncomeExpense';
import TransactionList from '@/components/TransactionList';
import PieChart from '@/components/PieChart';


const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }


  return (
    <main>
      <div className="content-container">
        <div className="chart-container">
          <PieChart />
        </div>
        <div className="container">
          <h2>Welcome, {user.firstName}</h2>
          <Balance />
          <AddTransaction />

        </div>
      </div>
      <div className="main-content">
        <TransactionList />
      </div>
    </main>
  );
};

export default HomePage;

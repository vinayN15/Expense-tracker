import { SignInButton, SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';
// import ProfileRedirectButton from './ProfileRedirectButton';

const Header = async () => {
  const user = await checkUser();

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <h2>Expense Tracker</h2>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
            {/* <ProfileRedirectButton /> */}
            {/* <UserButton /> */}
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Header;

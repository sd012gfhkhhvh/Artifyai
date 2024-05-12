import { SignIn } from '@clerk/nextjs';

export default function SigninPage() {
  return <SignIn path='/sign-in' />;
}

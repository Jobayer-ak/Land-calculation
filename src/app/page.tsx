import { SignInForm } from '../components/SignInFrom';
export const metadata = {
  title: 'আনা-গন্ডা-ক্যালকুলেটর',
};

export default function Home() {
  return (
    <div className="w-full bg-gray-100 px-8 py-2">
      <SignInForm />
    </div>
  );
}

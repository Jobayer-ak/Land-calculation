import { SignInForm } from '../components/SignInFrom';
export const metadata = {
  title: 'আনা-গন্ডা-ক্যালকুলেটর',
};

export default function Home() {
  return (
    <div className="w-full bg-[#2c2638] min-h-screen flex justify-end overflow-y-auto no-scrollbar">
      <div className="flex-1"></div>
      <SignInForm />
    </div>
  );
}

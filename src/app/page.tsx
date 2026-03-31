import { SignInForm } from '../components/SignInFrom';

export const metadata = {
  title: 'ভূমি হিসেব ক্যালকুলেটর',
};

export default function Home() {
  return (
    <div
      className="w-full min-h-screen overflow-y-auto no-scrollbar bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/la.avif')" }}
    >
      {/* Optional: Add overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="flex-1"></div>

      <div className="w-full max-w-md mx-auto mt-10 p-6">
        <SignInForm />
      </div>
    </div>
  );
}

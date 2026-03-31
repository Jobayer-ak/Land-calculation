import { SignInForm } from '../../../components/SignInFrom';

const page = () => {
  return (
    <div
      className="w-full min-h-screen overflow-y-auto no-scrollbar bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/la.avif')" }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="flex-1"></div>
      <div className="w-full max-w-md mx-auto mt-10 p-6">
        <SignInForm />
      </div>
    </div>
  );
};

export default page;

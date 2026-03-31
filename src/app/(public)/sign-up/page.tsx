import { RegisterForm } from '../../../components/RegisterForm';

const registeration = () => {
  return (
    <div
      className="w-full min-h-screen overflow-y-auto no-scrollbar bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/la.avif')" }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="flex-1"></div>
      <div className="w-full max-w-md mx-auto mt-6">
        <RegisterForm />
      </div>
    </div>
  );
};

export default registeration;

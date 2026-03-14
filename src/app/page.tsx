import { DynamicOwner } from '../components/form/DynamicOwner';
import { Form } from '../components/form/Form';

export default function Home() {
  return (
    <div className="">
      <h1 className="text-2xl ">Calculator</h1>

      <div>
        <Form />
        <div className="my-6"></div>
        <DynamicOwner />
      </div>
    </div>
  );
}

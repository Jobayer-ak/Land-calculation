import { DynamicOwner } from '../components/form/DynamicOwner';
import { Form } from '../components/form/Form';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="">
      <div>
        <Button>আনা-গন্ডা পরিচিতি </Button>
        <Form />
        <div className="my-6"></div>
        <DynamicOwner />
      </div>
    </div>
  );
}

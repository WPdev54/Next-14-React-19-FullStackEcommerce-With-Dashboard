import { SignIn } from "@clerk/nextjs";
import {neobrutalism} from "@clerk/themes";

 
export default function Page() {
    return (
    <div className="flex justify-center justify-items-center items-center h-screen w-screen">
      {/* @ts-ignore */}
      <SignIn appearance={neobrutalism} />
    </div>
    );
}
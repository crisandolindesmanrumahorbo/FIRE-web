import Image from "next/image";
import Navbar from "../../theme/Navbar";
import FormLogin from "./components/FormLogin";
import { withLinguiPage } from "@/app/hoc/useLingui";

async function Login() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex xl:flex-row flex-col items-center gap-10 border border-gray-700 p-12 mx-4 rounded-lg h-full">
          <div className="w-full items-center justify-center flex mb-6">
            <div className="relative sm:w-[400px] sm:h-[400px] w-[200px] h-[200px]">
              <Image
                src="/fire.png"
                alt="Apiiiii"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="h-full">
            <FormLogin />
          </div>
        </div>
      </div>
    </>
  );
}

export default withLinguiPage(Login);

import Image from "next/image";
import LoginNavbar from "../../theme/LoginNavbar";
import FormLogin from "./components/FormLogin";
import { withLinguiPage } from "@/app/hoc/useLingui";

type Params = Promise<{ lang: string; symbol: string }>;

//need to add params because used on withLinguiPage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Login = (_props: { params: Params }) => {
  return (
    <>
      <LoginNavbar />
      <div className="w-full min-h-screen flex justify-center items-center">
        <div
          className="flex xl:flex-row flex-col items-center sm:gap-10 gap-2 border 
          dark:border-gray-600 border-gray-400 p-12 mx-4 rounded-2xl h-full shadow-xl"
        >
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

          <div className="h-full w-full">
            <FormLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default withLinguiPage(Login);

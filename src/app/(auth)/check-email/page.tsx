import Image from "next/image";
import { CheckEmail } from "./_components/check.email";

export default function CheckEmailPage() {
  return (
    <div className="bg-muted auth-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Image
        src="/background/tokyo-tower-wallpaper.jpg"
        alt="background"
        width={1080}
        height={1080}
        className="absolute inset-0 h-full w-full scale-100 object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="w-full max-w-sm md:max-w-4xl">
        <CheckEmail />
      </div>
    </div>
  );
}

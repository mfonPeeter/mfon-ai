import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full px-2 bg-black text-white">
      <Link
        href="/"
        className="flex items-center space-x-2 px-2 py-4 text-lg font-bold bg-transparent rounded-lg transition-colors hover:text-white/80 focus:outline-none focus:border-white"
      >
        <span>
          <Image
            src="/lucra-logo.png"
            width={30}
            height={30}
            style={{ width: "auto", height: "auto" }}
            alt="Mfon.ai Logo"
          />
        </span>
        <span>Mfon.ai</span>
      </Link>
      <div className="text-2xl flex justify-center items-center space-x-2 h-full w-full sm:text-3xl">
        <span>404</span>
        <span>|</span>
        <span>Page Not Found</span>
      </div>
    </div>
  );
}

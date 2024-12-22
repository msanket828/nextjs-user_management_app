import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Server actions</h2>
      <Link href={"/user-management"}>Explore User management</Link>
    </div>
  );
}

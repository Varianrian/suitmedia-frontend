import Image from "next/image";
import Banner from "@/app/components/Banner";
import IdeasList from "@/app/components/IdeasList";

export default function Home() {
  return (
    <>
      <Banner />
      <IdeasList />
    </>
  );
}

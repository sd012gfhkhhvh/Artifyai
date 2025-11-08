import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.action";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

import { LandingPage } from "@/components/landing-page/LandingPage";

const Home = async ({ searchParams }: SearchParamProps) => {
  const user = await currentUser();
  if (!user) {
    return <LandingPage />;
  }

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  console.log("getting images ...");
  console.log(`searchparams: ${JSON.stringify(searchParams)}`);

  const images = await getAllImages({ page, searchQuery });
  // await new Promise((resolve, reject) => {
  //   reject;
  // });

  console.log("got images");

  return (
    <div className="min-w-full min-h-screen">
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Artify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <h1 className="text-h1">Recent Edits</h1>
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </div>
  );
};

export default Home;

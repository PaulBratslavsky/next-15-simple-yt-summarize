import { auth } from "@/auth";
import { Hero } from "@/components/blocks";

export default async function HomeRoute() {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  console.log(isAuthenticated );

  return <Hero isAuthenticated={isAuthenticated} />;
}

import SignInPageContent from "./content";

export interface SignInPageData {}

async function getData() {
  return {} as SignInPageData;
}

export default async function SignInPage() {
  return <SignInPageContent {...await getData()} />;
}

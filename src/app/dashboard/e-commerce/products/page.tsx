import { api } from "~/trpc/server";
import type { ECommerceProduct } from "~/types/e-commerce/product";
import ECommerceProductsPageContent from "./content";

export interface ECommerceProductsPageData {
  sentence: ECommerceProduct[];
}

async function getData() {
  const sentence = await api.memorizeSentence.getMany({ categoryId: 1 });
  return { sentence } as ECommerceProductsPageData;
}

export default async function UsersListPage() {
  return <ECommerceProductsPageContent {...await getData()} />;
}

import { getCategories } from "@/actions/category/getCategories";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { ROUTES } from "@/common/routes";
import FormProduct from "@/components/admin/form-product/FormProduct";
import Title from "@/components/ui/basics/Title/Title";
import { redirect } from "next/navigation";

interface AdminProductProps {
  params: {
    slug: string;
  };
}

export default async function AdminProductPage({
  params: { slug },
}: AdminProductProps) {
  const [product, { categories }] = await Promise.all([
    await getProductBySlug(slug),
    await getCategories(),
  ]);
  if (!categories) redirect(ROUTES.ADMIN_PRODUCTS);

  const title = slug == "new" ? "New product" : "Update product";

  return (
    <div>
      <Title title={title} />
      <FormProduct product={product ?? {}} categories={categories} />
    </div>
  );
}

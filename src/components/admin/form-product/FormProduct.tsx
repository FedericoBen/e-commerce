"use client";
import Input from "@/components/ui/basics/Input/Input";
import styles from "./FormProduct.module.scss";
import TextArea from "@/components/ui/basics/TextArea/TextArea";
import Button from "@/components/ui/basics/Button/Button";
import Select from "@/components/ui/basics/Select/Select";

import {
  Product,
  ProductImage as ProductImageInterface,
} from "@/interfaces/products.interface";
import { useForm } from "react-hook-form";
import { Category } from "@/interfaces/category.interface";
import { createUpdateProduct } from "@/actions/products/create-update-product";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/common/routes";
import { useState } from "react";
import { deleteImage } from "@/actions/products/delete-product-image";
import { useAlertMessage } from "@/providers/alert-message-provider/AlertMessageProvider";

interface FormProduct {
  product: Partial<Product> & { ProductImage?: ProductImageInterface[] };
  categories: Category[];
}

interface FormInput {
  title: string;
  description: string;
  slug: string;
  price: number;
  tags: string;
  inStock: number;
  sizes: string[];
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images?: FileList;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const gender = ["men", "women", "kid", "unisex"];

const FormProduct = ({ categories, product }: FormProduct) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setMessage } = useAlertMessage();
  // const [alertMessage, setAlertMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInput>({
    defaultValues: {
      ...product,
      sizes: product?.sizes?.map(String) ?? [],
      tags: product?.tags?.join(", ") ?? "",
      images: undefined,
    },
  });

  watch("sizes");

  const onSizeChange = (size: string) => {
    const currentSizes = getValues().sizes;
    const newSize = !currentSizes.includes(size)
      ? [...currentSizes, size]
      : currentSizes.filter((cz) => cz != size);
    setValue("sizes", newSize);
  };

  const onSubmit = async (data: FormInput) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product.id) formData.append("id", product.id ?? "");
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", String(productToSave.price));
    formData.append("inStock", String(productToSave.inStock));
    formData.append("sizes", String(productToSave.sizes));
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    setLoading(true);

    const resp = await createUpdateProduct(formData);

    setLoading(false);

    if (!resp.ok) return setMessage(resp.message, "error");
    router.replace(ROUTES.ADMIN_PRODUCT + resp.product?.slug);
    setMessage(resp.message);
  };

  const onDeleteImage = async (imageId: string, imageUrl: string) => {
    setLoading(true);
    await deleteImage(imageId, imageUrl);
    setLoading(false);
  };

  // const imagesToShow = useMemo(() => {
  //   const imagesWithoutRepeating = new Set([
  //     ...(product?.ProductImage ?? []),
  //     ...(getValues().images ?? []),
  //   ]);
  // }, [getValues, product?.ProductImage]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_product}>
      <div className={styles.container_column}>
        <div className={styles.column}>
          <Input label="Title" {...register("title", { required: true })} />
          <Input label="Slug" {...register("slug", { required: true })} />
          <TextArea
            label="Description"
            {...register("description", { required: true })}
          />
          <Input
            type="number"
            label="Price"
            {...register("price", { required: true, min: 0 })}
          />
          <Input label="Tags" {...register("tags", { required: true })} />

          <Select
            {...register("gender", { required: true })}
            label="Gender"
            optionsList={gender.map((g) => ({
              name: g,
              id: `${product.id}-${g}`,
              value: g,
            }))}
          />

          <Select
            {...register("categoryId", { required: true })}
            label="Category"
            optionsList={
              categories.map((category) => ({
                name: category.name,
                id: category.id,
                value: category.id,
              })) ?? []
            }
          />
        </div>
        <div className={styles.column}>
          <Input
            label="Inventory"
            type="number"
            {...register("inStock", { required: true })}
          />
          <div className={styles.select_sizes}>
            <span>Sizes</span>
            <div className={styles.container_sizes}>
              {sizes.map((size) => (
                <span
                  key={size}
                  className={`${styles.size} ${
                    getValues().sizes.includes(size) && styles.selected
                  }`}
                  onClick={() => onSizeChange(size)}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <Input
            {...register("images")}
            label="Photos"
            type="file"
            multiple
            accept="image/png, image/jpg, image/avif"
          />
          <div className={styles.container_images}>
            {product?.ProductImage?.map((pi) => (
              <div key={pi.id} className={styles.container_image}>
                <ProductImage
                  alt={product?.title ?? ""}
                  height={300}
                  width={300}
                  src={pi.url}
                />
                <Button
                  type="button"
                  style={{
                    backgroundColor: "red",
                    borderRadius: "0 0 20px 20px",
                    fontSize: "20px",
                  }}
                  disabled={loading}
                  onClick={() => onDeleteImage(pi.id, pi.url)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.container_button}>
        <Button
          disabled={loading || !isValid || getValues().sizes.length == 0}
          className={styles.button}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormProduct;

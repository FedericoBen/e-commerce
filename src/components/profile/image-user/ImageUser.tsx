"use client";
import Button from "@/components/ui/basics/Button/Button";
import styles from "./ImageUser.module.scss";
import Image from "next/image";
import { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { updateImageUser } from "@/actions/users/update-image-user";
import { useSession } from "next-auth/react";
import { ROUTES } from "@/common/routes";

interface ImageUserProps {
  image: string | null | undefined;
}

interface ImagesState {
  imageSelected: string | ArrayBuffer | null;
  imageToLoad: FormData | null;
}

const ImageUser = ({ image }: ImageUserProps) => {
  const { update } = useSession();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageToLoad, setImageToLoad] = useState<FormData | null>(null);
  const [imagToShow, setImageToShow] = useState<string | ArrayBuffer | null>(
    null
  );

  const clickInput = () => {
    inputRef.current?.click();
  };
  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImageToShow(event?.target.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append("image", file);
    setImageToLoad(formData);
  };

  const handlerUploadAvatar = async () => {
    setLoading(true);
    const resp = await updateImageUser(imageToLoad!);
    if (!resp?.user) return;
    await update({ user: resp.user, token: resp.user });
    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      {open && (
        <div className={styles.container_modal}>
          <div
            className={styles.back_ground_modal}
            onClick={() => setOpen(false)}
          />
          <div className={styles.modal}>
            <section
              className={styles.container_image_user}
              onClick={clickInput}
            >
              <input
                type="file"
                ref={inputRef}
                hidden
                onChange={onChangeImage}
              />
              <div className={styles.container_image}>
                <Image
                  src={
                    (imagToShow as string) ?? image ?? "/imgs/user-default.webp"
                  }
                  alt="images of user"
                  height={200}
                  width={200}
                />
              </div>
              <div className={styles.container_icon_edit_image}>
                <CiEdit size={30} />
              </div>
            </section>

            <Button
              disabled={!imageToLoad || !imagToShow || loading}
              onClick={handlerUploadAvatar}
            >
              upload
            </Button>
          </div>
        </div>
      )}
      <section
        className={styles.container_image_user}
        onClick={() => setOpen(true)}
      >
        <div className={styles.container_image}>
          <Image
            src={image ?? "/imgs/user-default.webp"}
            alt="images of user"
            height={200}
            width={200}
          />
        </div>
      </section>
    </>
  );
};

export default ImageUser;

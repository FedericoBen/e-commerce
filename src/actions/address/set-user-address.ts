"use server";

import type { InterfaceAddress } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

export const setUserAddress = async (
  address: InterfaceAddress,
  userId: string
) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Can´t to save address",
      address: null,
      ok: false,
    };
  }
};

export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: { userId },
    });

    return {
      ok: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Can´t to save address",
      ok: false,
    };
  }
};

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
    });

    return {
      ok: true,
      address,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Can´t to save address",
      address: null,
      ok: false,
    };
  }
};

const createOrReplaceAddress = async (
  address: InterfaceAddress,
  userId: string
) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const { country, ...addressRest } = address;

    const addressToSave = {
      ...addressRest,
      countryId: country,
      userId,
    };

    let newAddress = null;
    if (storedAddress) {
      newAddress = await prisma.userAddress.update({
        where: { userId },
        data: addressToSave,
      });
    } else {
      newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
    }

    return newAddress;
  } catch (error) {
    console.log(error);
    throw new Error("Can´t to save address");
  }
};

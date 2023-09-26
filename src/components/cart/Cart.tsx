"use client"
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartItems from "./CartItems";

const Cart = () => {
    const {cart} = useCartContext()
  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">{cart.items.length || 0} {cart.items.length === 1 ? 'Item' : 'Items'} in Cart</h2>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <main className="md:w-3/4">
                    <CartItems products = {cart.items}/>
            </main>
            <aside className="md:w-1/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <ul className="mb-5">
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Total price:</span>
                    <span>$98</span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>Total Units:</span>
                    <span className="text-green-500">7 (Units)</span>
                  </li>
                  <li className="flex justify-between text-gray-600  mb-1">
                    <span>TAX:</span>
                    <span>$78</span>
                  </li>
                  <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                    <span>Total price:</span>
                    <span>$898</span>
                  </li>
                </ul>

                <a className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
                  Continue
                </a>

                <Link
                  href="/"
                  className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                >
                  Back to shop
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
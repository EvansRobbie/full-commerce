import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumbs = ({ replacePath }: { replacePath?:string} ) => {
    const pathname = usePathname()
    const paths = pathname.split("/").filter((p: any) => p !== "");
    return (
        <section className="py-5 sm:py-7 bg-blue-100">
            <div className="container max-w-screen-xl mx-auto px-4">
                <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
                    <li className="flex text-primary  items-center h-full">
                        <Link href="/">Home</Link>
                    </li>
                    {
                        paths.map((path, idx) => (
                            <li className="flex text-primary  items-center h-full" key={path}>
                            <span>&nbsp;&nbsp; {"> "}&nbsp;&nbsp;</span>
                            <Link
                              href={`${idx !== 0 ? `/${paths[idx-1]}` : ""}`}
                              className={`${
                                idx === paths.length - 1 ? "text-blue-500 underline" : ""
                              }`}
                            >
                              {replacePath && idx === paths.length - 1 ? replacePath : path}
                            </Link>
                          </li>
                        ))
                    }
                </ol>
            </div>
        </section>
    );
};

export default BreadCrumbs;
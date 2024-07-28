"use client";

import { useState } from "react";
import LOGO from "@/app/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { TABS } from "@/data/Navigation";
import { usePathname } from "next/navigation";
import data from "@/data/Config";
import { BsBoxArrowInRight, BsGlobe2 } from "react-icons/bs";
import { SiDevpost } from "react-icons/si";
import { MdFeedback } from "react-icons/md";
import { signOut } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navigation = () => {
  const [expand, setExpand] = useState(false);
  const pathName = usePathname();
  const [tabs] = useState(TABS[pathName.split("/")[1]]);

  const global = [
    {
      name: "feedback",
      link: "/form/feedback",
      icon: <MdFeedback />,
    },
    {
      name: "devpost",
      link: data.devpost,
      icon: <SiDevpost />,
    },
    {
      name: "website",
      link: "/",
      icon: <BsGlobe2 />,
    },
  ];

  return (
    <>
      <div className="fixed z-20 flex h-12 w-full items-center bg-hackathon-blue-200 lg:hidden">
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => setExpand(!expand)}
        >
          <Image
            src={LOGO}
            className="mx-2 h-10 w-10"
            alt={`${data.name} Logo`}
          />
          <div className="text-xl font-semibold text-white">
            {pathName.split("/")[2]}
          </div>
        </div>
      </div>
      <div
        className={`z-10 overflow-y-scroll lg:flex lg:w-[12%] ${
          expand ? "fixed left-0 h-screen w-1/2 pt-5" : `hidden`
        }`}
      >
        <div className="grid h-full w-full grid-cols-1 grid-rows-10 flex-col place-items-center overflow-y-scroll bg-hackathon-blue-200">
          <div className="row-start-1 row-end-2 my-3 items-center lg:flex">
            <Image
              src={LOGO}
              className="mx-2 h-10 w-10"
              alt={`${data.name} Logo`}
            />
          </div>
          <Accordion
            defaultValue={["Dashboards", "Services"]}
            type="multiple"
            className="row-start-2 row-end-10 w-full place-self-start overflow-y-scroll"
          >
            {Object.entries(tabs)
              .filter(([title]) => title !== " " && title !== "dropdown")
              .map(([title, subTabs], index) => (
                <AccordionItem key={index} value={title}>
                  <AccordionTrigger
                    className={`font-poppin flex items-center justify-between pl-3 text-left text-xl font-bold text-white opacity-100 transition-opacity hover:cursor-pointer hover:opacity-40`}
                  >
                    {title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {subTabs.tabs &&
                      subTabs.tabs.map((tab, index) => (
                        <Link
                          key={index}
                          href={tab.link}
                          className="w-full p-0 no-underline"
                        >
                          <div
                            onClick={() => setExpand(false)}
                            className={`flex w-full items-center justify-start py-1 pl-[15%] [&>*]:text-white ${
                              pathName.endsWith(tab.link)
                                ? "bg-hackathon-blue-100"
                                : "[&>*]:hover:text-hackathon-blue-100"
                            }`}
                          >
                            {tab.icon}
                            <p className="m-0 text-lg">{tab.name}</p>
                          </div>
                        </Link>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
          <div className="row-start-10 mb-3 flex w-full flex-row items-center justify-center place-self-end">
            {global.map((tab, index) => (
              <Link
                key={index}
                href={tab.link}
                target="_blank"
                className="bg-red- w-full no-underline"
              >
                <div
                  className={`flex w-full items-center justify-center py-1 [&>*]:text-white ${
                    pathName.endsWith(tab.link)
                      ? "bg-hackathon-blue-100"
                      : "[&>*]:hover:text-hackathon-blue-100"
                  }`}
                >
                  {tab.icon}
                </div>
              </Link>
            ))}
            <div
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              className={`flex w-full items-center justify-center py-1 text-white hover:cursor-pointer hover:text-hackathon-blue-100`}
            >
              <BsBoxArrowInRight className="mr-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

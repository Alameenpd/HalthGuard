import React, { useState, useEffect } from "react";
import LandingContainer from "./landingContainer";
import { useSession } from "next-auth/react";
import Button from "../elements/button";
import CustomLink from "../elements/customLink";

export default function LandingHeader() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true);
    }
  }, [status]);

  return (
    <>
      <header>
        <nav className="z-10 w-full absolute">
          <LandingContainer>
            <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
              <input
                aria-hidden="true"
                type="checkbox"
                name="toggle_nav"
                id="toggle_nav"
                className="hidden peer"
              />
              <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
                <a
                  href="/"
                  aria-label="logo"
                  className="flex space-x-2 items-center"
                >
                  <div aria-hidden="true" className="flex space-x-1"></div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    NextJs - Boilercode
                  </span>
                </a>

                <div className="relative flex items-center lg:hidden max-h-10">
                  <label
                    role="button"
                    htmlFor="toggle_nav"
                    aria-label="humburger"
                    id="hamburger"
                    className="relative  p-6 -mr-6"
                  >
                    <div
                      aria-hidden="true"
                      id="line"
                      className="m-auto h-0.5 w-5 rounded bg-gray-300 transition duration-300"
                    ></div>
                    <div
                      aria-hidden="true"
                      id="line2"
                      className="m-auto mt-2 h-0.5 w-5 rounded bg-gray-300 transition duration-300"
                    ></div>
                  </label>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="fixed z-10 inset-0 h-screen w-screen backdrop-blur-2xl origin-bottom 
              scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 
              lg:hidden bg-gray-900/70"
              ></div>
              <div
                className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                            lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                            peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none 
                            dark:shadow-none"
              >
                <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                  {isAuthenticated ? (
                    <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                      <li>
                        <CustomLink link="#" text={userEmail} />
                      </li>
                    </ul>
                  ) : (
                    <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                      <li>
                        <CustomLink link="#" text="Link 1" />
                      </li>
                      <li>
                        <CustomLink link="#" text="Link 2" />
                      </li>
                      <li>
                        <CustomLink link="#" text="Link 3" />
                      </li>
                      <li>
                        <CustomLink link="#" text="Link 4" />
                      </li>
                    </ul>
                  )}
                </div>

                <>
                  <div className="flex justify-end">
                    {isAuthenticated ? (
                      <>
                        <div className="mt-12 lg:mt-0">
                          <Button link="/dashboard" text="Go to Dashboard" />
                        </div>
                        <div className="mt-12 lg:mt-0 ml-2">
                          <Button link="/api/auth/signout" text="Sign Out" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mt-12 lg:mt-0">
                          <Button link="/api/auth/signin" text="Login" />
                        </div>
                        <div className="mt-12 lg:mt-0 ml-2">
                          <Button link="/api/auth/signin" text="Get Started" />
                        </div>
                      </>
                    )}
                  </div>
                </>
              </div>
            </div>
          </LandingContainer>
        </nav>
      </header>
    </>
  );
}

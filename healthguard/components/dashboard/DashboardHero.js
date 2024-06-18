import LandingContainer from "../landingPage/landingContainer";
import { React, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function DashboardHero() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const words = ["Magic", "Website", "Blog"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTyping, setCurrentTyping] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true);
    }
  }, [status]);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setCurrentTyping(words[currentWordIndex].substr(0, charIndex + 1));
      setCharIndex(charIndex + 1);

      if (charIndex >= words[currentWordIndex].length) {
        setCharIndex(0);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentWordIndex, charIndex, words]);

  return (
    <>
      <div className="relative" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
        </div>
        <LandingContainer>
          <div className="relative pt-40 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-700 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                Your Dashboard is Here
              </h1>
            </div>
          </div>
        </LandingContainer>
      </div>
    </>
  );
}

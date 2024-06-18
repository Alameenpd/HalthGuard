import LandingContainer from "./landingContainer";
import { React, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import CustomDialog from "../elements/customDialog";

export default function LandingHero() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const words = ["NextJs", "AI"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTyping, setCurrentTyping] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const [showDialog, setShowDialog] = useState(false);

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
    }, 200);

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
          <div className="relative pt-32 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-900 dark:text-white font-bold text-3xl md:text-6xl xl:text-7xl">
                HealthGuard Ai  <br />
              
                <span className="text-primary">Your First Aid Companion</span>
              </h1>
              <p className="mt-8 text-gray-700 dark:text-gray-300 text-lg">
               <span className="text-primary font-bold">HealthGuard Ai</span>{" "}
                is your trusted first aid guide in emergencies
                <br />  Our Ai technology identifies injuries and provides clear ,step-by-step to help you administer care with confiddence
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-y-4 gap-x-4">
             
              </div>
           
            </div>
          </div>
        </LandingContainer>
      </div>
      <CustomDialog
        isOpen={showDialog}
        closeModal={() => setShowDialog(false)}
      />
    </>
  );
}

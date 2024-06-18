import LandingContainer from "./landingContainer";

const LandingFooter = () => {
  return (
    <footer className="py-10">
      <LandingContainer>
        <div className="m-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center text-gray-300">
            <div className="text-gray-600 dark:text-gray-300">
              &copy; HealthGuard AI
            </div>
            <div className="text-gray-600 dark:text-gray-300 underline">
              <a
                href="https://github.com/Tailus-UI/astro-theme"
                target="_blank"
              >
                A Product of Alex Team 
              </a>
            </div>
            <div className="text-gray-600 dark:text-gray-300 underline">
            </div>
          </div>
        </div>
      </LandingContainer>
    </footer>
  );
};

export default LandingFooter;

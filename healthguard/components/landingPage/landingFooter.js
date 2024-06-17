import LandingContainer from "./landingContainer";

const LandingFooter = () => {
  return (
    <footer className="py-10">
      <LandingContainer>
        <div className="m-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center text-gray-300">
            <div className="text-gray-600 dark:text-gray-300">
              &copy; BoilerCode.co
            </div>
            <div className="text-gray-600 dark:text-gray-300 underline">
              <a
                href="https://github.com/Tailus-UI/astro-theme"
                target="_blank"
              >
                This landing page is using inspirations from astro-theme
              </a>
            </div>
            <div className="text-gray-600 dark:text-gray-300 underline">
              <a
                href="https://tailus.lemonsqueezy.com?aff=X2K0G"
                target="_blank"
              >
                You can also get their premium templates from Advanced
                Tempalates and Themes
              </a>
            </div>
          </div>
        </div>
      </LandingContainer>
    </footer>
  );
};

export default LandingFooter;

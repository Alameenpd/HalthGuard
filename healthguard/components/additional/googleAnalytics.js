import Script from "next/script";
import GOOGLE_ANALYTICS_CODE from "@/config/googleAnalytics";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_CODE}`}
      />

      <Script strategy="lazyOnload">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_ANALYTICS_CODE}', {
      page_path: window.location.pathname,
      });
  `}
      </Script>
    </>
  );
}

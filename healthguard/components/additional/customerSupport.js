import CRISP_WEBSITE_ID from "@/config/crispSupport";

export default function CustomerSupport() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.$crisp=[];
            window.CRISP_WEBSITE_ID='${CRISP_WEBSITE_ID}';
            (function(){
              d=document;
              s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `,
        }}
      />
    </>
  );
}

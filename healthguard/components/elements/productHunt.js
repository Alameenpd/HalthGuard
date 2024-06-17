export default function ProductHunt() {
  //replace your product hunt link
  return (
    <div className="flex justify-center mb-8">
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <a href="https://www.producthunt.com/posts/boilercode?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-boilercode" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=415507&theme=light" alt="BoilerCode - Ship&#0032;your&#0032;SaaS&#0032;super&#0032;fast | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
`,
        }}
      />
    </div>
  );
}
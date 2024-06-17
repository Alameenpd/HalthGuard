export default function Video() {
  return (
    <>
      <video
        className=" divide-gray-700 overflow-hidden rounded-3xl border text-gray-600 border-gray-700 lg:divide-y-0"
        controls
        style={{ width: "90%", height: "80%" }}
      >
        <source src="/product-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

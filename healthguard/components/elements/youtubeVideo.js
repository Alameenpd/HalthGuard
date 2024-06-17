export default function YoutubeVideo({ videoId }) {
  // Construct the YouTube video URL
  //for example: https://www.youtube.com/watch?v=lRjdW8He-54
  //videoId is /watch?v={videoId}
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      width="900"
      height="560"
      src={youtubeUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      allowfullscreen
    ></iframe>
  );
}

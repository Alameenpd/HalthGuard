export default function CustomLink({ link, text }) {
  return (
    <a href={link} className="block md:px-4 transition hover:text-primary">
      <span>{text}</span>
    </a>
  );
}

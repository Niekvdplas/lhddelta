import ReactPlayer from "react-player";

export default function Video({ src }) {
  if (!src) return <div className="video video--empty">Nog geen film beschikbaar.</div>;
  return (
    <div className="video">
      <ReactPlayer src={src} controls width="100%" height="100%" volume={0.15} />
    </div>
  );
}

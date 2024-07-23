import dynamic from "next/dynamic";

interface VideoPlayerProps {
  url: string;
}

const DynamicReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="relative pt-[56.25%]">
      <DynamicReactPlayer
        className="absolute left-0 top-0"
        width="100%"
        height="100%"
        url={url}
        controls
      />
    </div>
  );
}

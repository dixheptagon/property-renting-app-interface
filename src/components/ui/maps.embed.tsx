"use client";

type MapEmbedProps = {
  src: string;
  width?: string;
  height?: string;
  className?: string;
};

export default function MapEmbed({
  src,
  width = "100%",
  height = "400px",
  className,
}: MapEmbedProps) {
  return (
    <div style={{ width, height }}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        className={className}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

import { useRef } from "react";

export default function ActivityViewer({
  title,
  src,
}: {
  title: string;
  src: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      win.focus();
      win.print();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="font-bold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg"
          >
            Imprimir
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener"
            className="px-3 py-2 bg-gray-900 text-white rounded-lg"
          >
            Nova aba
          </a>
        </div>
      </div>

      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-[70vh]"
        loading="lazy"
        // mesmo domínio -> conseguimos usar window.print
      />
    </div>
  );
}

import Image from "next/image";

export function PreviewLanding() {
  return (
    <div className="pb-6 sm:pb-16">
      <div className="w-full m-auto px-3  max-w-7xl">
        <div className="rounded-xl md:bg-muted/30 md:p-2 md:ring-1 md:ring-inset md:ring-border">
          <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
            <Image
              className="size-full object-cover object-center"
              src="/images/landing.png"
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

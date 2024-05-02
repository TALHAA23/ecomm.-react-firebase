export default function NoResult({ title, desc }) {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-2 items-center justify-center text-center capitalize">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg">{desc}</p>
    </div>
  );
}

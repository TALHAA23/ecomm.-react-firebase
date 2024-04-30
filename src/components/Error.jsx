export default function Error({ error }) {
  return (
    <div className="w-full h-[100vh-100px] flex items-center justify-center">
      <h1 className=" text-center font-bold text-3xl text-rose-600">
        {error.message}
      </h1>
    </div>
  );
}

export default function AccountInformation() {
  return (
    <section className="w-full flex items-center justify-center p-4">
      <div className=" relative w-[80%] bg-light p-5 rounded-md">
        <img
          src="/icons/profile-svgrepo-com.svg"
          alt="avatar"
          className="absolute bg-darker rounded-full p-4 left-1/2 -translate-x-1/2 -top-0"
        />
        <div className="mt-16 flex flex-col items-center gap-2">
          <h1 className=" font-orelega-one text-5xl my-2 text-center text-gray-700">
            Account Information
          </h1>
          <div className="relative px-10 py-3 bg-gray-100 rounded-lg">
            <p className=" absolute left-0 top-0 bg-black/85 text-white rounded px-3 ">
              username
            </p>
            <h1 className="text-xl font-bold pt-3">Someusername</h1>
          </div>
          <div className="relative px-10 py-3 bg-gray-100 rounded-lg">
            <p className=" absolute left-0 top-0 bg-black/85 text-white rounded px-3 ">
              username
            </p>
            <h1 className="text-xl font-bold pt-3">Someusername</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

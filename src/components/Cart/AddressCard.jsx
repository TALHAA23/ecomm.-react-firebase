export default function AddressCard({
  shippingDetails,
  selectedAddress,
  updateAddress,
}) {
  return (
    <div
      onClick={() => updateAddress(shippingDetails)}
      className={`relative w-full p-3 rounded ${
        selectedAddress == shippingDetails ? "bg-green-300" : "bg-lighter"
      }`}
    >
      {selectedAddress == shippingDetails && (
        <p className=" absolute right-1 top-1 px-2 py-1 rounded-full bg-green-900 text-white text-xs font-light">
          in use
        </p>
      )}
      <h1 className=" text-lg font-bold">{shippingDetails.fullName}</h1>
      <p className="text-sm font-light">{shippingDetails.phoneNo}</p>
      <div
        className={`p-2 rounded-md ${
          selectedAddress == shippingDetails ? "bg-green-500" : "bg-dark"
        }`}
      >
        <small className="text-xs font-light">Shipping address</small>
        <p className="text-lg text-center">{shippingDetails.shippingAddress}</p>
      </div>
    </div>
  );
}

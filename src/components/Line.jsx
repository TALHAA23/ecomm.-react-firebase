export default function Line({ lineWidth = "w-full", margin = "my-4" }) {
  return <div className={`bg-darker h-[2px] ${lineWidth} ${margin}`}></div>;
}

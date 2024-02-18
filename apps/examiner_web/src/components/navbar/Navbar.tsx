import scholarSvg from "../../assets/scholar.svg";
export default function Navbar() {
  return (
    <nav className="h-10 bg-gray-100 font-roboto flex items-center shadow">
      <h4 className="text-xl font-bold tracking-tight text-center flex-1 text-black flex justify-center items-center gap-x-3">
        <img src={scholarSvg} alt="" className="h-10" />e
        <span className="-m-3 text-2xl skew-x-6 hover:-skew-x-3 duration-300 text-blue-600">
          X
        </span>
        aminer
      </h4>
    </nav>
  );
}

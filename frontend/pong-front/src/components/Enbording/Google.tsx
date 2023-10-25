import google from "../../assets/google.png"

export default function Google () {
  return (
    <div className="border font-semibold bg-white text-black p-3 rounded-2xl w-72 h-14">
      <button
        type="button"
        className="flex gap-1 items-center justify-center w-full h-full"
      >
      <img src={google}></img>
        Sign in with google
      </button>
    </div>
  );
}
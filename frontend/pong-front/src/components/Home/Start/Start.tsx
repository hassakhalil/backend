import { StartGaming } from "./StartGaming";

export function Start () {
    return (
        <>
            <div className="pr-10 pl-10 lg:pl-0 lg:pt-4">
                <div className="path p-14 md:p-36 bg-cover bg-no-repeat bg-center rounded-custom w-full h-[400px] flex-col pt-40">
                    <div className="flex flex-col items-center text-white Montserrat text-3xl pb-10 md:text-4xl font-extrabold pt-10 sm:pt-0">
                        <h1>Welcome To</h1>
                        <h1>Cyberponk</h1>
                    </div>
                    <StartGaming/>
                </div>
            </div>
        </>
    )
}
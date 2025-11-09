import { Navbar } from "@/components/ui/navbar"
import Image from "next/image"

export default function NotFound() {

return (
    <div className="flex min-h-screen">
        <main className="flex flex-col min-h-screen w-full">
            <Navbar/>
            <div className="flex flex-col min-h-screen w-full">
                <div className="m-auto">
                    <div className="flex h-screen items-center justify-center space-y-4 flex-col">
                        <h1 className="text-2xl text-red-600 sm:text-1xl">
                            Error 404: Page not found.
                        </h1>
                        <Image
                            alt="X Icon"
                            src="/x-button.png"
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
            </div>
        </main>

    </div>
)

}
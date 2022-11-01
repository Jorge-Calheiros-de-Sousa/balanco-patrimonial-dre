import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
    const router = useRouter();
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="w-full text-center md:text-left">
                    <h1 className="uppercase font-bold text-slate-700 text-xl mb-3">Dashboard</h1>
                    <ul className="ml-2 border-t-2 py-5 flex justify-center flex-col items-center md:items-start">
                        <h1 className="uppercase font-bold text-slate-500 text-xs mb-5">Admin layout pages</h1>
                        <Link href={'/admin/dashboard'}>
                            <li className="font-bold text-xs text-center md:text-left text-slate-700 w-fit px-2 py-5 uppercase hover:text-slate-400 transition-all cursor-pointer"
                                style={{
                                    color: router.pathname.indexOf('/admin/dashboard') != -1 ? 'rgb(29 78 216 )' : ''
                                }}
                            >Dashboard</li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    )
}
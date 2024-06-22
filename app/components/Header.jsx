import Link from "next/link";


export const Header = () => {
    return (
        <header className="flex w-full bg-neutral-200 text-primary p-2 justify-between">
            <Link href="/current">
                <h1 className="font-bold">F1 STATS</h1>
            </Link>
            <nav>
                <ul className="text-neutral-900 flex space-x-2">
                    <li>Meeting</li>
                    <li>Drivers</li>
                    <li>Teams</li>
                </ul>
            </nav>
        </header>
    );
};
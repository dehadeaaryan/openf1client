import { Header } from "./components/Header";
import Home from "./components/Home";

export default function Page() {
    return (
        <div className="bg-black w-screen h-screen flex flex-col justify-center items-center">
            <Header />
            <Home />
        </div>
    );
}

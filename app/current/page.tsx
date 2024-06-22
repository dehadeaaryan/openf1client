import { Header } from "@/app/components/Header";
import { dateStringToDateString, dateStringToTimeString } from "../utils";
import Link from "next/link";

const getLatestMeeting = async () => {
    const response = await fetch("https://api.openf1.org/v2/meetings?meeting_key=latest", { next: { revalidate: 60 * 60 * 24 } })
    const meeting = await response.json();
    return meeting[0];
}

const getSessions = async (meeting_key: string) => {
    const response = await fetch(`https://api.openf1.org/v1/sessions?meeting_key=latest`, { next: { revalidate: 60 * 60 } })
    const sessions = await response.json();
    sessions.sort((a: any, b: any) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime());
    return sessions;
}

const Page = async () => {
    const meeting = await getLatestMeeting();
    const meeting_key = meeting.meeting_key;
    const meetingDate = new Date(meeting.date_start);
    const sessions = await getSessions(meeting_key);
    return (
        <div className="bg-background w-screen h-screen flex flex-col items-center">
            <Header />
            <div className="w-full p-12 flex flex-col gap-2 text-center font-bold">
                <h1 className="text-primary text-4xl md:text-6xl">{meeting.meeting_name}</h1>
                <p className="text-neutral-200 text-xs md:text-lg">{meeting.meeting_official_name}</p>
                <p className="text-neutral-200 text-xs">{meetingDate.toDateString()}</p>
            </div>
            <div className="w-full p-12 flex flex-col gap-4 text-center font-bold">
                <h1 className="text-neutral-200 text-xl md:text-3xl">Race Weekend</h1>
                {sessions.map((session: any) => (
                    <Link key={session.session_key} href={`/current/session/${session.session_key}`}>
                        <div className="w-full p-4 flex items-center border-4 border-primary rounded-xl hover:text-primary transition-all">
                            <div className="text-xs sm:text-lg flex flex-col w-1/2 sm:w-1/4 items-start">
                                <p>{dateStringToDateString(session.date_start)}</p>
                                <p>{dateStringToTimeString(session.date_start)}</p>
                            </div>
                            <p className="text-sm sm:text-2xl w-1/2 sm:w-3/4 text-start">{session.session_name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Page;
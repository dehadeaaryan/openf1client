"use client";

import { Header } from "@/app/components/Header";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { DriverInfo, DriverInfoWithPosition, Position, Session } from "@/app/types";
import { useEffect, useState } from "react";

const getSession = async (session_key: string): Promise<Session> => {
    const response = await fetch(`https://api.openf1.org/v2/sessions?session_key=${session_key}`, { next: { revalidate: 60 * 60 } })
    const session: Session[] = await response.json();
    return session[0];
}

const getDrivers = async (session_key: string): Promise<DriverInfo[]> => {
    const response = await fetch(`https://api.openf1.org/v2/drivers?session_key=${session_key}`, { next: { revalidate: 60 * 60 } })
    const drivers = await response.json();
    return drivers;
}

const getSessionAndDrivers = async (session_key: string): Promise<{ session: Session, drivers: DriverInfo[] }> => {
    const session = await getSession(session_key);
    const drivers = await getDrivers(session_key);
    return { session, drivers };
}

const getDriverPositions = async (session_key: string, drivers: DriverInfo[]): Promise<DriverInfoWithPosition[]> => {
    const response = await fetch(`https://api.openf1.org/v2/position?session_key=${session_key}`);
    const data = await response.json();
    const driverPositions: DriverInfoWithPosition[] = [];
    drivers.forEach((driver: DriverInfo) => {
        driverPositions.push({
            ...driver, position: data.filter((position: Position) => position.driver_number === driver.driver_number).reduce((latest: Position, current: Position) => {
                return new Date(current.date) > new Date(latest.date) ? current : latest;
            }).position
        });
    });
    driverPositions.sort((a: DriverInfoWithPosition, b: DriverInfoWithPosition) => a.position - b.position);
    return driverPositions;
}

// const getLaps = async (session_key: string, drivers: DriverInfo[]): Promise<DriverInfoWithPosition[]> => {
//     const response = await fetch(`https://api.openf1.org/v1/laps?session_key=${session_key}`);
//     const data = await response.json();
//     return data;
// }

const Page = ({ params }: { params: { key: string } }) => {
    const [data, setData] = useState<{ sessionName: string, positions: DriverInfoWithPosition[], loading: boolean }>({ sessionName: "", positions: [], loading: true })
    useEffect(() => {
        getSessionAndDrivers(params.key).then(({ session, drivers }) => {
            getDriverPositions(params.key, drivers).then((positions) => {
                setData({ sessionName: session.session_name, positions, loading: false })
            })
        }).catch(console.error);
    }, [params.key])
    if (data.loading) return (<LoadingScreen />);
    return (<div className="bg-background w-screen min-h-screen flex flex-col items-center">
        <Header />
        <div className="w-full p-12 flex flex-col gap-4 text-center font-bold">
            <h1 className="text-primary text-4xl md:text-6xl">
                {data.sessionName}
            </h1>
            <div className="w-full flex flex-col gap-4">
                {data.positions.map((driver: DriverInfoWithPosition) => (
                    <div key={driver.driver_number} className={`w-full p-4 flex gap-12 border-4 rounded-2xl items-center text-neutral-200`} style={{ borderColor: `#${driver.team_colour}` }}>
                        <p className="text-sm md:text-2xl w-8">{driver.position}</p>
                        <div className="text-xs md:text-lg flex flex-row gap-4 justify-between items-center w-full">
                            <p>{driver.broadcast_name}</p>
                            <p className="hidden md:flex">{driver.team_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>)
}

export default Page;
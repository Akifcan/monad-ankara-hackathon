import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const baseUrl = new URL(req.url).origin;

    const response = await axios.get<CronTypesProps[]>('https://dersx.net/stacks-istanbul-app/cron-oracle')
    console.log(response.data)

    const oneMins = response.data.filter(x => x.frequency === '1m')
    const second = response.data.filter(x => x.frequency === '30s')
    const tensecond = response.data.filter(x => x.frequency === '10s')

    setInterval(() => {
        oneMins.forEach(x => {
            axios.get(`${baseUrl}/api/oracle/${x.address}`)
        })
        console.log("ok! 1 min")
    }, 60000)


    setInterval(() => {
        tensecond.forEach(x => {
            axios.get(`${baseUrl}/api/oracle/${x.address}`)
        })
        console.log("ok! 10 sec")
    }, 10000)


    setInterval(() => {
        second.forEach(x => {
            axios.get(`${baseUrl}/api/oracle/${x.address}`)
        })

        console.log("ok! 30 sec")
    }, 30000)

    return NextResponse.json(
        { success: true, },
    );
}
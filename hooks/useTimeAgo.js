import { useEffect, useState } from "react"

const DATE_UNITS = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
]

const getDateDiffs = timestamp => {
    const now = Date.now()
    const elapsed = (timestamp - now) / 1000

    for (const [unit, secondsInUnit] of DATE_UNITS) {
        if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
            return {
                value: Math.floor(elapsed / secondsInUnit),
                unit
            }
        }
    }


}

export default function useTimeAgo(timestamp) {
    const [timeago, setTimeAgo] = useState(()=> getDateDiffs(timestamp)) 
    const rtf = new Intl.RelativeTimeFormat('es', {
        style:"short"
    })

    useEffect(()=>{
        const timeout = setInterval(()=>{
            const newTimeAgo = getDateDiffs(timestamp)
            setTimeAgo(newTimeAgo)
        },5000)

        return () => clearInterval(timeout)

    },[timestamp])

    const {value, unit} = timeago

    return   rtf.format(value,unit)
}
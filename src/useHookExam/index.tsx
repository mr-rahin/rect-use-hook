'use server'

import { use, Suspense, type JSX } from "react"

/**
 * Module-level promise that fetches a random Chuck Norris joke.
 *
 * NOTE: This is created once at module load time, so the same promise
 * instance is reused across renders. `use()` relies on a stable promise
 * reference, recreating it on every render would cause an infinite loop.
 *
 * If you are in Iran, use a VPN to reach the API and get the correct result.
 */
const dataPromise = fetch('https://api.chucknorris.io/jokes/random')
    .then(res => res.json())


function HomeItem(): JSX.Element {
    const todo = use(dataPromise)
    return (
        <div className="bg-blue-800 text-white text-center p-3 ">
            <p>{todo.value}</p>
        </div>
    )
}

export default function Home(): JSX.Element {
    return (
        <Suspense fallback={
            <h2 className="text-center  bg-red-100 text-red-800 p-2">Loading...</h2>
        }>
            <HomeItem />
        </Suspense>
    )
}

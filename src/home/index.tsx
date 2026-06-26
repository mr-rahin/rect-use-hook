
'use server'

import { use, Suspense } from "react"

// If you are in iran use Vpn to see the correct result.
const dataPromise = fetch('https://api.chucknorris.io/jokes/random')
    .then(res => res.json())

function HomeItem() {
    const Todo = use(dataPromise)

    return (
        <div>
            {Todo.value}
        </div>
    )
}
export default function Home() {

    return (
        <Suspense fallback={<h2 className="text-center bg-green-200 text-green-200">Loading...</h2>} >
            <HomeItem />
        </Suspense>
    )
}
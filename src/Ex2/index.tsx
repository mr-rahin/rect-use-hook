import { Suspense, use, useState, type JSX } from "react"

/**
 * Simulates fetching message content from an API
 * @returns {Promise<string>} A promise that resolves to the message content after 1 second
 */
const fetchMessageContent = (): Promise<string> => {
    return new Promise(resolve => setTimeout(resolve, 1000, 'Fetch with "use" hook in react'))
}

/**
 * Component that displays the fetched message content
 * Uses React's `use()` hook to unwrap the Promise inside a Suspense boundary
 * 
 * @param {Object} props - Component props
 * @param {Promise<string> | null} props.message - Promise containing the message content, or null if not fetched yet
 * @returns {JSX.Element | null} The rendered message or null if no message is provided
 */
const MessageOutput = ({ message }: { message: Promise<string> | null }): JSX.Element | null => {
    if (!message) return null
    const messageContent = use(message)
    return (
        <div className="text-center p-3">
            <p>message content is : {messageContent}</p>
        </div>
    )
}

/**
 * Example component demonstrating React's `use()` hook with Suspense
 * 
 * Shows a button that triggers an async data fetch. When clicked:
 * - Initiates the fetch operation
 * - Displays a loading fallback during the fetch
 * - Renders the fetched message once available
 * 
 * @returns {JSX.Element} The rendered component
 */
export default function Example(): JSX.Element {
    const [messageContainer, setMessageContainer] = useState<Promise<string> | null>(null)
    const [show, setShow] = useState<boolean>(false)

    /**
     * Handles the download button click
     * Initiates the message fetch and shows the message output component
     */
    function downloadHandler() {
        setMessageContainer(fetchMessageContent())
        setShow(true)
    }

    if (show) {
        return (
            <Suspense fallback={<h2 className="text-center">Message downloading...</h2>}>
                <MessageOutput message={messageContainer} />
            </Suspense>
        )
    }

    return (
        <div className="flex justify-center p-3">
            <button
                className="p-2 bg-blue-800 text-white active:scale-95 hover:bg-blue-900 cursor-pointer rounded-xl"
                onClick={downloadHandler}
            >
                Download
            </button>
        </div>
    )
}

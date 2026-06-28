import { useOptimistic, useState } from "react"

/**
 * Represents a single message in the conversation thread.
 */
interface MessageType {
    message: string
    sending: boolean
}

/**
 * Form component for sending messages with optimistic UI updates.
 *
 * Uses `useOptimistic` to immediately show the new message with a "Sending..."
 * indicator while the actual `sendMessage` async operation completes.
 *
 * @param messages    - Current list of messages (from parent state).
 * @param sendMessage - Async function to send a message to the server.
 */
function MessagesForm({
    messages,
    sendMessage
}: {
    messages: MessageType[]
    sendMessage: (formData: FormData) => Promise<void>
}) {
    /**
     * `optimisticMessages` holds the local view including pending messages.
     * `addOptimisticMessage` appends a new message with `sending: true`.
     */
    const [optimisticMessages, addOptimisticMessage] = useOptimistic<
        MessageType[],
        string
    >(messages, (state, newMessage) => [
        ...state,
        {
            message: newMessage,
            sending: true
        }
    ])

    /**
     * Form action handler:
     * 1. Adds the optimistic message immediately.
     * 2. Awaits the actual send operation.
     */
    async function formAction(formData: FormData) {
        const messageText = formData.get("message") as string
        addOptimisticMessage(messageText)
        await sendMessage(formData)
    }

    return (
        <div>
            <form className="flex items-center mb-5 p-5" action={formAction}>
                <input
                    type="text"
                    name="message"
                    placeholder="Enter your message"
                    className="border border-gray-300 rounded py-2 px-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 px-2 active:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:shadow"
                >
                    Send
                </button>
            </form>
            {optimisticMessages.map((item, index) => (
                <div className="flex items-center" key={index}>
                    <span>{item.message}</span>
                    {item.sending && <small> (Sending...)</small>}
                </div>
            ))}
        </div>
    )
}

/**
 * Simulates sending a message to a server with a 1-second delay.
 *
 * @param message - The message content to deliver.
 * @returns The same message after the delay.
 */
const deliverMessage = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return message
}

/**
 * Parent component managing the actual message list state.
 *
 * Passes the list and the `sendMessage` handler down to `MessagesForm`.
 */
export default function OptimisticExam() {
    const [messages, setMessages] = useState<MessageType[]>([])

    /**
     * Sends a message and updates the state once delivery completes.
     *
     * @param formData - FormData containing the 'message' field.
     */
    async function sendMessage(formData: FormData) {
        const messageText = formData.get("message") as string
        const sentMessage = await deliverMessage(messageText)
        setMessages(prev => [...prev, { message: sentMessage, sending: false }])
    }

    return <MessagesForm messages={messages} sendMessage={sendMessage} />
}

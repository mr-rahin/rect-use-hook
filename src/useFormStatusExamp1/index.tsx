import { useFormStatus } from "react-dom"
import type { JSX } from "react/jsx-runtime"

/**
 * Submit button component that uses React's useFormStatus hook
 * Automatically disables and shows loading state during form submission
 * Must be rendered inside a <form> element to access form status
 * 
 * @returns {JSX.Element} The submit button with pending state
 */
const Submit = (): JSX.Element => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="p-2 bg-blue-800 text-white active:scale-95 hover:bg-blue-900 disabled:cursor-not-allowed cursor-pointer rounded-xl"
            disabled={pending}
        >
            {pending ? 'Submitting...' : 'Submit'}
        </button>
    )
}

/**
 * Example component demonstrating React's useFormStatus hook
 * 
 * Shows a form with title and body fields that:
 * - Uses Server Actions for form handling
 * - Automatically tracks submission state via useFormStatus
 * - Disables the submit button during submission
 * - Displays loading state while processing
 * 
 * @returns {JSX.Element} The rendered form component
 */
export default function UseFormStatusExample(): JSX.Element {
    /**
     * Form action handler that processes the form data
     * Simulates an async operation with a 1-second delay
     * 
     * @param {FormData} formData - The form data submitted
     */
    async function formAction(formData: FormData): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(formData.get("title"))
        console.log(formData.get("bodyText"))
    }

    return (
        <div className="flex w-full justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5 w-1/2" action={formAction}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        id="title"
                        required
                        className="border w-full mb-5 rounded-md p-2 border-blue-500 outline-0"
                        placeholder="Enter title..."
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bodyText">
                        Body
                    </label>
                    <textarea
                        name="bodyText"
                        id="bodyText"
                        required
                        className="border w-full rounded-md p-2 border-blue-500 outline-0"
                        placeholder="Enter body..."
                    />
                </div>
                <Submit />
            </form>
        </div>
    )
}

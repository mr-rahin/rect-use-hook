import { useFormState } from "react-dom"

/**
 * A single cart item card with an "Add to Cart" form.
 *
 * Uses the `useFormState` hook to run a server-style action (`addToCart`)
 * and display the resulting message under the button.
 *
 * @param itemId    - Unique identifier of the item, sent via a hidden input.
 * @param itemTitle - Display title shown as the card heading.
 */
function AddTocartItem({ itemId, itemTitle }: { itemId: number; itemTitle: string }) {
    /**
     * Form action invoked on submit.
     *
     * @param prevState - Previous state returned by this action (message string).
     * @param queryData - FormData containing the submitted fields.
     * @returns The new state: a success or error message string.
     */
    function addToCart(prevState: string, queryData: FormData): string {
        const itemId = queryData.get("itemID")
        if (itemId === "1") return "Added To Cart"
        return "Error: Item sold out"
    }

    // `message` holds the latest string returned by `addToCart`.
    // `formAction` is wired to the form's `action` attribute.
    const [message, formAction] = useFormState<string, FormData>(addToCart, "")

    return (
        <form action={formAction} className="flex bg-white shadow-md p-2 flex-col gap-2">
            <h2>{itemTitle}</h2>
            {/* Carries the item id into FormData so the action can read it */}
            <input type="hidden" name="itemID" value={itemId} />
            <button
                type="submit"
                className="cursor-pointer bg-blue-400 text-white rounded-md w-fit p-2 px-3"
            >
                Add to Cart
            </button>
            <p className="text-sm">{message}</p>
        </form>
    )
}

/**
 * Demo screen rendering multiple `AddTocartItem` cards.
 *
 * Each card manages its own independent form state.
 */
export default function UseFormStateExample() {
    return (
        <div className="flex flex-col gap-2 p-3">
            <AddTocartItem itemId={1} itemTitle="JavaScript: The Definitive Guide" />
            <AddTocartItem itemId={2} itemTitle="JavaScript: The Good Parts" />
        </div>
    )
}

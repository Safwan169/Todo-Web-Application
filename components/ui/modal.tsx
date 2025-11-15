
import { useForm, Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";



interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<void> | void;
}

export default function AddTaskModal({
    isOpen,
    onClose,
    onSubmit,
}: AddTaskModalProps) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormData>({
        defaultValues: {
            title: "",
            date: "",
            priority: undefined,
            description: "",
        },
    });

    const onSubmitForm = async (data: TaskFormData) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (err) {
            console.error("Submit error:", err);
        }
    };

    const handleClear = () => reset();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 ml-[300px] z-40 flex items-center justify-center  p-4"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop Overlay */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[500px] mx-auto rounded-xl bg-white shadow-2xl max-h-[90vh] overflow-hidden">
                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-base font-semibold text-[16px] text-black">
                                Add New Task
                            </h2>
                            <span className='bg-primary h-0.5  w-16'></span>

                        </div>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-sm font-medium text-black underline underline-offset-3 decoration-gray-400 hover:text-gray-700"
                        >
                            Go Back
                        </button>

                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="px-6 py-3 space-y-4">
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="task-title"
                                    className="block text-sm font-semibold text-black mb-2"
                                >
                                    Title
                                </label>
                                <input
                                    id="task-title"
                                    type="text"
                                    {...register("title", {
                                        required: "Title is required",
                                        minLength: { value: 3, message: "At least 3 characters" },
                                    })}
                                    className={`w-full px-3 py-2 rounded-md border ${errors.title ? "border-red-500" : "border-gray-300"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black`}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Date */}
                            <div>
                                <label
                                    htmlFor="task-date"
                                    className="block text-sm font-semibold text-black mb-2"
                                >
                                    Date
                                </label>
                                <div className="relative">
                                    <input
                                        id="task-date"
                                        type="date"
                                        {...register("date", { required: "Date is required" })}
                                        className={`w-full px-3 py-2 pr-2 rounded-md border ${errors.date ? "border-red-500" : "border-gray-300"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black`}
                                    />
                                </div>
                                {errors.date && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.date.message}
                                    </p>
                                )}
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="block text-sm font-semibold text-black mb-2">
                                    Priority
                                </label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    rules={{ required: "Please select a priority" }}
                                    render={({ field }) => (
                                        <>
                                            <div className="flex items-center gap-5">
                                                {/* Extreme */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value="extreme"
                                                        checked={field.value === "extreme"}
                                                        onChange={() => field.onChange("extreme")}
                                                        className="sr-only"
                                                    />
                                                    <span
                                                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all ${field.value === "extreme"
                                                            ? "border-red-500 bg-red-500"
                                                            : "border-gray-300"
                                                            }`}
                                                    >

                                                    </span>
                                                    <span className="text-sm text-black">Extreme</span>
                                                </label>

                                                {/* Moderate */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value="moderate"
                                                        checked={field.value === "moderate"}
                                                        onChange={() => field.onChange("moderate")}
                                                        className="sr-only"
                                                    />
                                                    <span
                                                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all ${field.value === "moderate"
                                                            ? "border-green-500 bg-green-500"
                                                            : "border-gray-300"
                                                            }`}
                                                    >

                                                    </span>
                                                    <span className="text-sm text-black">Moderate</span>
                                                </label>

                                                {/* Low */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        value="low"
                                                        checked={field.value === "low"}
                                                        onChange={() => field.onChange("low")}
                                                        className="sr-only"
                                                    />
                                                    <span
                                                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all ${field.value === "low"
                                                            ? "border-yellow-500 bg-yellow-500"
                                                            : "border-gray-300"
                                                            }`}
                                                    >

                                                    </span>
                                                    <span className="text-sm text-black">Low</span>
                                                </label>
                                            </div>
                                            {errors.priority && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.priority.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            {/* Task Description */}
                            <div>
                                <label
                                    htmlFor="task-desc"
                                    className="block text-sm font-semibold text-black mb-2"
                                >
                                    Task Description
                                </label>
                                <textarea
                                    id="task-desc"
                                    {...register("description", {
                                        required: "Description is required",
                                        minLength: { value: 10, message: "At least 10 characters" },
                                    })}
                                    placeholder="Start writing here...."
                                    rows={5}
                                    className={`w-full px-3 py-2 rounded-md border ${errors.description ? "border-red-500" : "border-gray-300"
                                        } resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black placeholder-gray-400`}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-7 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Saving..." : "Done"}
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                                aria-label="Clear form"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
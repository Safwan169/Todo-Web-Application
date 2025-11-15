// modules/todo/types.ts - placeholder
interface TaskFormData {
    title: string;
    date: string;
    priority: "extreme" | "moderate" | "low";
    description: string;
}

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<void> | void;
}
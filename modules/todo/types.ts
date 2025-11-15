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

type Priority = 'extreme' | 'moderate' | 'low';

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
}

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    isDragging?: boolean;
}

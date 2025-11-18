export interface TaskFormData {
    title: string;
    date: string;
    priority: "extreme" | "moderate" | "low";
    description: string;
}

export interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<void> | void;
}

export type Priority = 'extreme' | 'moderate' | 'low';

export interface Task {
    id: string;
    title: string;
    description: string;
    todo_date: string;
    priority: Priority;
    is_completed: boolean;
    position: number;
}

export interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    isDragging?: boolean;
}

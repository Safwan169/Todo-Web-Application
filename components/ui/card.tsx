import { Edit2, GripVertical, MoreVertical, Trash2 } from "lucide-react";

import { TaskCardProps } from "@/modules/todo/types";

export default function TaskCard({ task, onEdit, onDelete ,isDragging}: TaskCardProps) {
const priorityConfig = {
    extreme: {
      label: 'Extreme',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-[#FEE2E2]',
      badgeColor: 'bg-[#FEE2E2]',
    },
    moderate: {
      label: 'Moderate',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      badgeColor: 'bg-green-100',
    },
    low: {
      label: 'Low',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      badgeColor: 'bg-yellow-100',
    },
  };

  const config = priorityConfig[task.priority];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`bg-white rounded-xl border-[1.5px] min-w-[280px] max-w-[348px] ${config.borderColor} p-5 hover:shadow-md transition-all cursor-move ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900 flex-1">
          {task.title}
        </h3>
        <div className="flex items-center gap-1">
          {/* Priority Badge */}
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium ${config.badgeColor} ${config.textColor}`}
          >
            {config.label}
          </span>
          {/* Menu Icon */}
          <button className="p-1 hover:bg-gray-100 rounded">
                      <GripVertical className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-placeholder font-normal mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Due Date */}
        <span className="text-sm text-placeholder">
          Due {formatDate(task.todo_date)}
        </span>

        {/* Action Buttons */}
        <div className="flex  items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-[#eef7ff] hover:bg-blue-50  rounded-lg transition-colors cursor-pointer group"
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 bg-[#eef7ff] hover:bg-red-50 rounded-lg transition-colors cursor-pointer group"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

    </div>
  );
}
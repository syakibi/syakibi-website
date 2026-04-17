import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Edit2 } from 'lucide-react';

const ScheduleCell = ({ day, timeSlot, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');

  const handleSave = () => {
    onChange(day, timeSlot, localValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setLocalValue(value || '');
      setIsEditing(false);
    }
  };

  return (
    <div className="relative group h-24 border border-border rounded-lg bg-card hover:bg-muted/50 transition-all duration-200">
      {isEditing ? (
        <Input
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          className="h-full text-sm border-2 border-primary"
          placeholder="Enter activity..."
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="h-full p-3 flex items-center justify-center cursor-pointer"
        >
          {value ? (
            <p className="text-sm font-medium text-center text-card-foreground">{value}</p>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit2 className="w-4 h-4" />
              <span className="text-xs">Click to edit</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCell;
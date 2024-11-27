interface UiTextareaProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const UiTextarea = ({ placeholder, value, onChange }: UiTextareaProps) => {
  return (
    <textarea
      className="ui-textarea ui-input bg-input w-full rounded-lg px-4 py-2 transition"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
    ></textarea>
  );
};

export default UiTextarea;

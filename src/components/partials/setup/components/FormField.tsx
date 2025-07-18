import cn from "@/utils/cn";

interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label className={cn("block text-sm font-medium text-foreground mb-2")}>
        {label} {required && "*"}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full px-3 py-2 border rounded-md",
          "bg-background text-foreground",
          "border-border focus:border-success-primary focus:outline-none focus:ring-1 focus:ring-success-primary",
          error && "border-destructive"
        )}
        placeholder={placeholder}
      />
      {error && (
        <p className={cn("text-sm text-destructive mt-1")}>{error}</p>
      )}
    </div>
  );
}
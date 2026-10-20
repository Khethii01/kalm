import { type ReactNode } from "react";

type BaseProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  full?: boolean;
};

function Label({
  id,
  label,
  required,
  optional,
}: Pick<BaseProps, "id" | "label" | "required" | "optional">) {
  return (
    <label htmlFor={id}>
      {label}
      {required && (
        <span className="req" aria-hidden="true">
          *
        </span>
      )}
      {optional && <span className="optional"> (optional)</span>}
    </label>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <span className="field__error" id={`${id}-error`} role="alert">
      {error}
    </span>
  );
}

export function TextField({
  id,
  label,
  required,
  optional,
  error,
  full,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
  inputMode,
}: BaseProps & {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}) {
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <Label id={id} label={label} required={required} optional={optional} />
      <input
        id={id}
        name={id}
        className="input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function TextArea({
  id,
  label,
  required,
  optional,
  error,
  full = true,
  value,
  onChange,
  placeholder,
  rows = 4,
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <Label id={id} label={label} required={required} optional={optional} />
      <textarea
        id={id}
        name={id}
        className="textarea"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  required,
  optional,
  error,
  full,
  value,
  onChange,
  options,
  placeholder = "Please select…",
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <Label id={id} label={label} required={required} optional={optional} />
      <select
        id={id}
        name={id}
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function ChoiceGroup({
  legend,
  name,
  required,
  error,
  options,
  value,
  onChange,
  hint,
  children,
}: {
  legend: string;
  name: string;
  required?: boolean;
  error?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  children?: ReactNode;
}) {
  return (
    <fieldset
      className="field field--full"
      style={{ border: 0, padding: 0, margin: 0 }}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend style={{ fontWeight: 600, fontSize: "0.92rem", padding: 0 }}>
        {legend}
        {required && (
          <span className="req" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {hint && (
        <span className="form__section-hint" style={{ marginBottom: 8 }}>
          {hint}
        </span>
      )}
      <div className="choices" style={{ marginTop: 8 }}>
        {options.map((o) => (
          <label key={o.value} className="choice">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            {o.label}
          </label>
        ))}
      </div>
      {children}
      <ErrorText id={name} error={error} />
    </fieldset>
  );
}

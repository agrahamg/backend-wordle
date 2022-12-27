import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { forwardRef, useId } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

const InputGroup = forwardRef<HTMLInputElement, Props>(
  ({ label, ...inputProps }, ref) => {
    const id = useId();
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            ref={ref}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...inputProps}
            id={id}
          />
        </div>
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";

export default InputGroup;

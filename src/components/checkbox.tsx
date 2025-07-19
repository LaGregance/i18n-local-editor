export type CheckboxProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => any;
};

export const Checkbox = (props: CheckboxProps) => {
  const { label, value, onChange } = props;

  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-solid border-[#cedbe8] p-[15px] hover:opacity-70">
      <input
        type="checkbox"
        className="h-5 w-5 border-2 border-[#cedbe8] bg-transparent text-transparent checked:border-[#0c7ff2] checked:bg-[image:--radio-dot-svg] focus:ring-0 focus:ring-offset-0 focus:outline-none checked:focus:border-[#0c7ff2]"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <div className="flex grow flex-col">
        <p className="text-sm leading-normal font-medium text-[#0d141c]">{label}</p>
      </div>
    </label>
  );
};

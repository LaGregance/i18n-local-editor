import { countOccurrences } from '@/shared/utils';

export type InputGroupProps = {
  title: string;
  value: string;
  onChange: (value: string) => any;
  multiline?: boolean;
};

export const InputGroup = (props: InputGroupProps) => {
  const { title, value, onChange, multiline } = props;

  return (
    <div className="flex flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex min-w-40 flex-1 flex-col">
        <p className="pb-1 text-base leading-normal font-medium text-[#101518]">{title}</p>
        {multiline ? (
          <textarea
            rows={Math.min(Math.max(countOccurrences(value, '\n') + 1, 3), 20)}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#d4dce2] bg-gray-50 px-2 py-1 text-base leading-normal font-normal text-[#101518] placeholder:text-[#5c748a] focus:border-[#d4dce2] focus:ring-0 focus:outline-0"
          />
        ) : (
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-[#d4dce2] bg-gray-50 px-2 py-1 text-base leading-normal font-normal text-[#101518] placeholder:text-[#5c748a] focus:border-[#d4dce2] focus:ring-0 focus:outline-0"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
      </label>
    </div>
  );
};

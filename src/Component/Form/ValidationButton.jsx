import clsx from 'clsx';

export default function ValidationButton({props, type}) {
  return (
    <button
        type="button"
        onClick={props.onClick}
        className={clsx(
          type === 'next' ? ' mt-3 rounded-5 w-75' : 'mt-3 py-2 px-4 rounded-5 w-75 h-100',
        )}
        id={clsx(
            type === 'next' ? 'nextStep' : 'validate',
        )}
        disabled={props.disabled}>
        {props.content}
    </button>
  );
}
export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center justify-center outline-none ${
        outline ? "border border-yellow-200 bg-transparent" : "bg-yellow-200"
      } gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-900 hover:bg-black hover:text-yellow-100 duration-300 ${customClasses}
      ${
        disabled &&
        "cursor-not-allowed hover:bg-yellow-200 hover:text-gray-900"
      }`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-100"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}

export const NotFoundMessege = ({ msg, classNames }: { [k: string]: string }) => {
  return (
    <div className={`NotFoundMessege w-full flex items-center justify-center ${classNames}`}>
      <span className="NotFoundMessege__text text-2xl font-bold text-gray-400">{msg}</span>
    </div>
  );
};

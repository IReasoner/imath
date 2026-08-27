import lockIcon from "../../assets/lockIcon.png";

export function CareerLockedLevel({ stageLevelInfo }) {
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-lg">
        <img src={lockIcon} alt="lock_icon" className="w-5" />
      </div>

      <h3 className="mt-3 text-lg font-bold">Level {stageLevelInfo.level}</h3>

      <p className="mx-auto mt-1 max-w-xs text-sm text-gray-500">
        {stageLevelInfo.message}.
      </p>
    </section>
  );
}

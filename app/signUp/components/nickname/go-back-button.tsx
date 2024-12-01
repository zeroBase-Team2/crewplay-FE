import BackButton from "@/public/svg/back-button.svg";

interface IGoBackButtonProps {
  readonly text: string;
  readonly onClick: () => void;
}

export default function GoBackButton({ text, onClick }: IGoBackButtonProps) {
  return (
    <div className="mb-[48px] flex w-full items-center">
      <button
        type="button"
        onClick={onClick}
        className="flex size-[36px] items-center justify-center"
      >
        <BackButton />
      </button>
      <p>{text}</p>
    </div>
  );
}
type RenderWhenProps = {
  children: React.ReactNode;
  renderIf: boolean;
};

export const RenderWhen = ({ renderIf, children }: RenderWhenProps) => {
  return renderIf ? children : <></>;
};

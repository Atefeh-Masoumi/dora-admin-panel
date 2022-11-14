import { FC, useState } from "react";
import { ForgetPassConfirmCode } from "../ForgetPassConfirmCode";
import { ForgetPass } from "../ForgetPass";
import { ForgetPasswordSetPass } from "../ForgetPassSetPass";

const Forget: FC = () => {
  const [level, setLevel] = useState(0);
  const [confirmCode, setConfirmCode] = useState<string>();

  if (level === 0) return <ForgetPass goNext={() => setLevel(1)} />;
  if (level === 1)
    return (
      <ForgetPassConfirmCode
        goNext={() => setLevel(2)}
        setCode={(code) => setConfirmCode(code)}
      />
    );
  return <ForgetPasswordSetPass code={confirmCode!} />;
};

export default Forget;

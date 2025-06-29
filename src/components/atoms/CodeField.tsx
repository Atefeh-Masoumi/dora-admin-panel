import { FC, KeyboardEvent, useRef } from "react";
import { Stack } from "@mui/material";
import { DorsaTextField } from "./DorsaTextField";

const BOX_SIZE = 50;

type CodeFieldPropsType = {
  characters: (string | null)[];
  setCharacters: (characters: (string | null)[]) => void;
};

export const CodeField: FC<CodeFieldPropsType> = ({
  characters = [],
  setCharacters,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(
    [...Array(characters.length)].map(() => null)
  );

  const backspaceHandler = (index: number) => {
    if (characters[index] !== null) {
      const newCharacters = [...characters];
      newCharacters[index] = null;
      setCharacters(newCharacters);
    } else if (index > 0) {
      inputsRef.current?.[index - 1]?.focus();
    }
  };

  const goToNextInput = (index: number) => {
    if (index >= characters.length - 1) return;
    inputsRef.current?.[index + 1]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number
  ): void => {
    if (event.key === "Backspace") {
      backspaceHandler(index);
      return;
    }
    if (!/^[0-9]$/i.test(event.key)) return;
    event.preventDefault();

    const newCharacters = [...characters];
    newCharacters[index] = event.key;
    setCharacters(newCharacters);

    goToNextInput(index);
  };

  return (
    <Stack
      direction="row-reverse"
      justifyContent="center"
      width="100%"
      alignItems="center"
      // sx={{ direction: "rtl" }}
      spacing={1}
    >
      {characters.map((character, index) => (
        <DorsaTextField
          inputRef={(el) => (inputsRef.current[index] = el)}
          key={index}
          type="number"
          autoComplete="off"
          value={character === null ? "" : character}
          onKeyDown={(e) => handleKeyDown(e, index)}
          autoFocus={index === 0 ? true : false}
          inputProps={{
            min: 0,
            max: 9,
            style: { textAlign: "center" },
          }}
          sx={{
            "& input": {
              p: 0,
              height: BOX_SIZE,
              width: BOX_SIZE,
              border: "2px solid transparent",
            },
            "& input[type=number]": { "-moz-appearance": "textfield" },
            "& input[type=number]::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
            },
            "& input:focus": {
              borderColor: "rgba(60, 138, 255, 0.7)",
              borderRadius: 1,
              color: "rgba(60, 110, 255, 1)",
            },
          }}
        />
      ))}
    </Stack>
  );
};

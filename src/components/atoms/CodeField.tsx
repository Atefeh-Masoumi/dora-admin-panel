import { FC, KeyboardEvent, useRef } from "react";
import { Stack } from "@mui/material";
import { DorsaTextField } from "./DorsaTextField";

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
      direction="row"
      justifyContent="center"
      width="100%"
      spacing={2}
      sx={{ direction: "rtl" }}
      py={1}
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
            ...(index === 0 && { ml: 2 }),
            ...(index === characters.length - 1 && { ml: 0 + "!important" }),
            "& input": { py: 1.5 },
            "& input[type=number]": { "-moz-appearance": "textfield" },
            "& input[type=number]::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
            },
            "& input:focus": {
              border: "2px solid rgba(60, 138, 255, 0.7)",
              borderRadius: 1,
              color: "rgba(60, 110, 255, 1)",
            },
          }}
        />
      ))}
    </Stack>
  );
};

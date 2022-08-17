import { TextFieldHelperText } from "./TextFieldHelperText";
import { TextFieldIcon } from "./TextFieldIcon";
import { TextFieldInput } from "./TextFieldInput";
import { TextFieldLabel } from "./TextFieldLabel";
import { TextFieldMain } from "./TextFieldMain";
import { TextFieldUnit } from "./TextFieldUnit";

export const TextField = Object.assign(TextFieldMain, {
  Label: TextFieldLabel,
  Input: TextFieldInput,
  HelperText: TextFieldHelperText,
  Unit: TextFieldUnit,
  Icon: TextFieldIcon
})
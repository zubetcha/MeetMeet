import { MultiSelectMain } from "./ui/MultiSelectMain";
import { MultiSelectOption } from "./ui/MultiSelectOption";
import { MultiSelectTriggerButton } from "./ui/MultiSelectTriggerButton";
import { MultiSelectSearchField } from "./ui/MultiSelectSearchField";
import { MultiSelectOptionList } from "./ui/MultiSelectOptionList";
import { MultiSelectTriggerIcon } from "./ui/MultiSelectTriggerIcon";

export const MultiSelect = Object.assign(MultiSelectMain, {
  Option: MultiSelectOption,
  Trigger: MultiSelectTriggerButton,
  TriggerIcon: MultiSelectTriggerIcon,
  Search: MultiSelectSearchField,
  List: MultiSelectOptionList,
});

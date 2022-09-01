import { MultiSelectMain } from "./ui/MultiSelectMain";
import { SelectOption } from "./ui/SelectOption";
import { SelectTriggerButton } from "./ui/SelectTriggerButton";
import { SelectSearchField } from "./ui/SelectSearchField";
import { SelectOptionList } from "./ui/SelectOptionList";

export const MultiSelect = Object.assign(MultiSelectMain, {
  Option: SelectOption,
  Trigger: SelectTriggerButton,
  Search: SelectSearchField,
  List: SelectOptionList,
});

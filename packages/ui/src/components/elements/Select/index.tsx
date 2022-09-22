import { SelectMain } from "./ui/SelectMain";
import { SelectOption } from "./ui/SelectOption";
import { SelectTriggerButton } from "./ui/SelectTriggerButton";
import { SelectSearchField } from "./ui/SelectSearchField";
import { SelectOptionList } from "./ui/SelectOptionList";

export const Select = Object.assign(SelectMain, {
  Option: SelectOption,
  Trigger: SelectTriggerButton,
  Search: SelectSearchField,
  List: SelectOptionList,
});      

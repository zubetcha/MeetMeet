import { SelectMain } from "./ui/SelectMain";
import { Option } from "./ui/Option";
import { TriggerButton } from "./ui/TriggerButton";
import { SearchField } from "./ui/SearchField";
import { OptionList } from "./ui/OptionList";

export const Select = Object.assign(SelectMain, {
  Option: Option,
  Trigger: TriggerButton,
  Search: SearchField,
  List: OptionList,
});

import { BottomSheetRoot } from "./bottom-sheet-root";
import { BottomSheetTrigger } from "./bottom-sheet-trigger";
import { BottomSheetContent } from "./bottom-sheet-content";
import { BottomSheetClose, BottomSheetTitle } from "./bottom-sheet-close";

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BottomSheetTrigger,
  Content: BottomSheetContent,
  Close: BottomSheetClose,
  Title: BottomSheetTitle,
});

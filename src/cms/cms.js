import CMS from "netlify-cms";

import { AgendaControl, AgendaPreview } from "./widgets/agenda";
import { TimePickerControl, TimePickerPreview } from "./widgets/timePicker";
import { MonthPickerControl, MonthPickerPreview } from "./widgets/monthPicker";
import { MultipleSelectControl, MultipleSelectPreview } from "./widgets/multipleSelect";
import { YoutubeControl, YoutubePreview } from "./widgets/youtube";
import { CustomPathImageControl, CustomPathImagePreview } from "./widgets/customPathImage";
import { DatetimePickerControl, DatetimePickerPreview } from "./widgets/datetimePicker";

import { SpectaclesPreview } from "./previews/spectaclesPreview/spectaclesPreview";


CMS.registerWidget("agenda", AgendaControl, AgendaPreview);
CMS.registerWidget("timepicker", TimePickerControl, TimePickerPreview);
CMS.registerWidget("monthpicker", MonthPickerControl, MonthPickerPreview);
CMS.registerWidget("multipleselect", MultipleSelectControl, MultipleSelectPreview);
CMS.registerWidget("youtube", YoutubeControl, YoutubePreview);
CMS.registerWidget("custompathimage", CustomPathImageControl, CustomPathImagePreview);
CMS.registerWidget("datetimepicker", DatetimePickerControl, DatetimePickerPreview);

CMS.registerPreviewStyle("./previews.css");
CMS.registerPreviewTemplate("spectacles", SpectaclesPreview);

import { ColorProperty } from "../widgetproperties/ColorProperty";
import { FontProperty } from "../widgetproperties/FontProperty";
import { NumberProperty } from "../widgetproperties/NumberProperty";
import { WidgetProperty } from "../widgetproperties/WidgetProperty";
import { AbstractWidgetSettings } from "./AbstractWidgetSettings";

export class PlayerInfoWidgetSettings extends AbstractWidgetSettings {

  constructor(widgetId: string, properties: WidgetProperty[]) {
    super(
      widgetId,
      properties,
      [
        new FontProperty(widgetId, "font", "fontselect", "Roboto", "Шрифт"),
        new NumberProperty(widgetId, "fontSize", "number", 24, "Размер шрифта"),
        new ColorProperty(widgetId, "color", "color", "#ffffff", "Цвет"),
      ],
      new Map(),
    );
  }

  copy() {
    return new PlayerInfoWidgetSettings(this.widgetId, this.properties);
  }
}

import { Layouts } from 'react-grid-layout';
import { Property } from '../../../../types/circle';

export default function generateDefaultGridLayouts(
  properties: Property[] | undefined,
) {
  let layouts: Layouts = {
    xl: [],
    lg: [],
    md: [],
    sm: [],
    xs: [],
  };

  if (properties) {
    properties.forEach((property: string) => {
      layouts.xl.push({
        h: 6,
        i: property,
        moved: false,
        static: false,
        w: 6,
        x: 6,
        y: 0,
      });
      layouts.lg.push({
        h: 6,
        i: property,
        moved: false,
        static: false,
        w: 6,
        x: 6,
        y: 0,
      });
      layouts.md.push({
        h: 6,
        i: property,
        moved: false,
        static: false,
        w: 6,
        x: 0,
        y: 0,
      });
      layouts.sm.push({
        h: 6,
        i: property,
        moved: false,
        static: false,
        w: 12,
        x: 0,
        y: 0,
      });
      layouts.xs.push({
        h: 6,
        i: property,
        moved: false,
        static: false,
        w: 12,
        x: 0,
        y: 0,
      });
    });
  }

  return layouts;
}

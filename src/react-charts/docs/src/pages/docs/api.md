---
id: api
title: API
---

> Complete documentation is **coming soon**. For now, please refer to the examples for any missing documentation.

React Charts exposes these top-level exports:

- `Chart` - The Chart component used to render charts
- Series Type Components
  - `Line`
  - `Bar`
  - `Bubble`
  - `Area`
- Curve Functions
  - `curveBasisClosed`
  - `curveBasisOpen`
  - `curveBasis`
  - `curveBundle`
  - `curveCardinalClosed`
  - `curveCardinalOpen`
  - `curveCardinal`
  - `curveCatmullRomClosed`
  - `curveCatmullRomOpen`
  - `curveCatmullRom`
  - `curveLinearClosed`
  - `curveLinear`
  - `curveMonotoneX`
  - `curveMonotoneY`
  - `curveNatural`
  - `curveStep`
  - `curveStepAfter`
  - `curveStepBefore`
- Position Constants
  - `positionTop`
  - `positionRight`
  - `positionBottom`
  - `positionLeft`
- Grouping Constants
  - `groupingSingle`
  - `groupingSeries`
  - `groupingPrimary`
  - `groupingSecondary`
- Tooltip Alignment Constants
  - `alignAuto`
  - `alignRight`
  - `alignTopRight`
  - `alignBottomRight`
  - `alignLeft`
  - `alignTopLeft`
  - `alignBottomLeft`
  - `alignTop`
  - `alignBottom`
- Axis Type Constants
  - `axisTypeOrdinal`
  - `axisTypeTime`
  - `axisTypeUtc`
  - `axisTypeLinear`
  - `axisTypeLog`
- Tooltip Anchor Constants
  - `anchorPointer`
  - `anchorClosest`
  - `anchorCenter`
  - `anchorTop`
  - `anchorBottom`
  - `anchorLeft`
  - `anchorRight`
  - `anchorGridTop`
  - `anchorGridBottom`
  - `anchorGridLeft`
  - `anchorGridRight`
- Focus Mode Constants
  - `focusAuto`
  - `focusClosest`
  - `focusElement`

## Memoize your Props!

As you'll see in every example, the React Charts `<Chart>` component expects all props and options to be memoized using either `React.useMemo` or `React.useCallback`. While passing an unmemoized option/prop to the `<Chart>` component won't severly break any visible functionality, your charts will be severly non-performant. Internally, React Charts uses the immutable nature of thes options/props to detect changes to the configuration and update accordingly.

While this may feel heavy at first, it gives you, the dev, full control over when you want to update your charts. To trigger and update, simply trigger one of your `React.useMemo` or `React.useCallback` hooks on the part of the config that you would like to update!

## Data Model

React Charts uses a common and very flexible data model based on arrays of **series** and arrays of **datums**. You can either use the model defaults directly, or use **data accessors** to materialize this structure.

Typical visualization data can come in practically any shape and size. The following examples show data structures that are all reasonably equivalent **at some level** since they each contain an array of **series[]** and **datums[]**. They also show how to parse that data.

In the following example, there is no need to use any accessors. The **default** accessors are able to easily understand this format:

```javascript
function MyChart() {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 10 },
          { x: 3, y: 10 },
        ],
      },
      {
        label: 'Series 2',
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 10 },
          { x: 3, y: 10 },
        ],
      },
      {
        label: 'Series 3',
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 10 },
          { x: 3, y: 10 },
        ],
      },
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )
}
```

In the following example, there is no need to use any accessors. The **default** accessors are able to easily understand this format, but **please note** that this format limits you from passing any **meta data** about your series and datums.

```javascript
function MyChart() {
  const data = React.useMemo(
    () => [
      [
        [1, 10],
        [2, 10],
        [3, 10],
      ],
      [
        [1, 10],
        [2, 10],
        [3, 10],
      ],
      [
        [1, 10],
        [2, 10],
        [3, 10],
      ],
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )
}
```

#### Data Accessors

When data isn't in a convenient format for React Charts, **your first instinct will be to transform your data into the above formats**. Don't do that! There is an easier way 🎉 We can use the `Chart` components' **accessor props** to point things in the right direction. **Accessor props** pass the original data and the series/datums you return down the line to form a new data model. See the [`<Chart>` component](#chart) for all available accessors.

In the following example, the data is in a very funky format, but at it's core is the same as the previous examples.

```javascript
function MyChart() {
  // Use any data object you want
  const originalData = React.useMemo(
    () => ({
      axis: [1, 2, 3],
      lines: [
        { data: [{ value: 10 }, { value: 10 }, { value: 10 }] },
        { data: [{ value: 10 }, { value: 10 }, { value: 10 }] },
        { data: [{ value: 10 }, { value: 10 }, { value: 10 }] },
      ],
    }),
    []
  )

  // Make data.lines represent the different series
  const data = React.useMemo(data => originalData.lines, [originalData])

  // Use data.lines[n].data to represent the different datums for each series
  const getDatums = React.useCallback(series => series.data, [])

  // Use the original data object and the datum index to reference the datum's primary value.
  const getPrimary = React.useCallback(
    (datum, i, series, seriesIndex, data) => originalData.axis[i],
    []
  )

  // Use data.lines[n].data[n].value as each datums secondary value
  const getSecondary = React.useCallback(datum => datum.value, [])

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart
        data={data}
        getSeries={getSeries}
        getDatums={getDatums}
        getPrimary={getPrimary}
        getSecondary={getSecondary}
      />
    </div>
  )
}
```

#### Series Labels

Multiple series are often useless without labels. By default, React Charts looks for the `label` value on the series object you pass it. If not found, it will simply label your series as `Series [n]`, where `[n]` is the zero-based `index` of the series, plus `1`.

If the default label accessor doesn't suit your needs, then you can use the `<Chart>` component's `getLabel` accessor prop:

```javascript
function MyChart() {
  const data = React.useMemo(
    () => [
      {
        specialLabel: 'Hello World!',
        data: [
          //...
        ],
      },
    ],
    []
  )

  const getLabel = React.useCallback(series => series.specialLabel, [])

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart data={data} getLabel={getLabel} />
    </div>
  )
}
```

## Axes & Scales

React Charts supports an `axes` prop that handles both the underlying scale and visual rendering. These axes can be combined and configured to plot data in many ways. To date, we have the following scale types available:

- Cartesian
  - `linear` - A continuous axis used for plotting numerical data on an evenly distributed scale. Works well both as a **primary and secondary** axis.
  - `ordinal` - A banded axis commonly used to plot categories or ordinal information. Works well as the **primary** axis for bar charts.
  - `time` - A continuous axis used for plotting localized times and dates on an evenly distributed scale. Works well as a **primary** axis.
  - `utc` - Similar to the `time` scale, but supports UTC datetimes instead of localized datetimes. Works well as a **primary** axis.
  - `log` - A continuous axis used for plotting numerical data on a logarithmically distributed scale. Works well as a **secondary** axis

Axes are a required component of a React Chart and can used like so:

```javascript
import { Chart } from 'react-charts'

function MyChart() {
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart axes={axes} />
    </div>
  )
}
```

For more information on usage and API, see the [`axes` prop](#axes)

## Series Types

- Cartesian
  - `line`
  - `area`
  - `bar`
  - `bubble`
- Radial
  - `pie`

Example

```javascript
function MyChart() {
  const series = React.useMemo(() => ({ curve: 'cardinal' }), [])

  return <Chart series={series} />
}
```

# API

**`<Chart />` Props**

- `getLabel` - A `memoized` function that returns the series label
- `getSeriesId` - A `memoized` function that returns the series ID
- `getDatums` - A `memoized` function that returns the series' datums array
- `getPrimary` - A `memoized` function that returns the datum's primary value
- `getSecondary` - A `memoized` function that returns the datum's secondary value
- `getR` - A `memoized` function that returns the datum's radius value (where applicable)
- `series({} or function)` - A `memoized` object (or function that returns an object) of series options that correspond to all or each of the series in the dataset.
  `type` - **string** - The series type (Line, Bar, Bubble, Area, etc)
  `showPoints` - **bool** - If true, will show points for datums where applicable
  `showOrphans` - **bool** - If true, will show orphan datums where applicable
  `curve` - **func** - The curve function to use for this series where applicable (see [Curve Types](#curve-types))
- `axes[]` - An array of `memoized` axes
  - `axis{}` - An axis object
    - `primary` **bool** - Denotes whether this axis is the primary axis
    - `type` **oneOf, required** - The type of scale for this axis
      - `axisTypeOrdinal`
      - `axisTypeTime`
      - `axisTypeUtc`
      - `axisTypeLinear`
      - `axisTypeLog`
    - `position` **oneOf, required** - The cartesian position of this axis
      - `positionTop`
      - `positionRight`
      - `positionBottom`
      - `positionLeft`
    - `invert` **bool** - Whether this axis's scale should be inverted
    - `primaryAxisID` **string** - If multiple secondary axes are used, which primary axis ID does this axis refer to?
    - `min` **number** - The suggested minimum for this axis
    - `max` **number** - The suggested maximum for this axis
    - `hardMin` **number** - The hard/forced minimum for this axis
    - `hardMax` **number** - The hard/forced maximum for this axis
    - `base` **number** - The base value for this axis. Defaults to `0`
    - `ticks` **function** - The function used to generate ticks for the axis
    - `format` **func** - The function used to format values on this axis for display
    - `tickValues` **any** - The optional override for the tick values of the axis
    - `tickSizeInner` **number** - The size of inner tick lines for the axis
    - `tickSizeOuter` **number** - The size of the outer tick lines for the axis
    - `tickPadding` **number** - The padding amount between tick labels
    - `maxLabelRotation` **number** - The max label rotation angle in degrees. Defaults to 50
    - `innerPadding` **number** - The inner padding for the axis
    - `outerPadding` **number** - The outer padding for the axis
    - `showGrid` **bool** - Whether or not the axis grid lines should be visible
    - `showTicks` **bool** - Whether or not the tick and tick labels should be visible
    - `show` **bool** - Whether or not the axis and scale are visible
    - `stacked` **bool** - If true, will use stacked mode
    - `id` **any** - An optional ID to identify this axis
- `primaryCursor{}` - An object of options for the primary cursor. If falsey, the cursor is disabled
  - `render` - **func** - The render function for this cursor. Returns JSX
  - `snap` - **bool** - If true, the cursor will snap to nearest values on the axis
  - `showLine` - **bool** - If true, will show the grid line for this cursor
  - `showLabel` - **bool** - If true, will show the label for this cursor
  - `axisID` - **any** - The ID of the axis that this cursor corresponds to
  - `onChange` - **func** - When the cursor is updated, this function will be called with relevant information
- `tooltip{}`
  `align` - **
  `alignPriority**`- **arrayOf**(alignPropType),`padding`- **number**,`tooltipArrowPadding`- **number**,`anchor`- **oneOf**([`anchorPointer`,`anchorClosest`,`anchorCenter`,`anchorTop`,`anchorBottom`,`anchorLeft`,`anchorRight`,`anchorGridTop`,`anchorGridBottom`,`anchorGridLeft`,`anchorGridRight`]),`render`- **func**.required,`onChange` - **func**

### Curve Types

All series types that support lines or curves can be configured to use any [curve function from `d3-shape`](https://github.com/d3/d3-shape#curves) by passing one of the following strings as the `curve` prop to a series component. You may also pass your own curve function directly from d3 or if you're feeling powerful, even create your own!

Note the following string correspond to their respective d3 curve functions but with the `curve` prefix removed.

- `basisClosed`
- `basisOpen`
- `basis`
- `bundle`
- `cardinalClosed`
- `cardinalOpen`
- `cardinal`
- `catmullRomClosed`
- `catmullRomOpen`
- `catmullRom`
- `linearClosed`
- `linear`
- `monotoneX` (default)
- `monotoneY`
- `natural`
- `step`
- `stepAfter`
- `stepBefore`

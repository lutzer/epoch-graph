type BaseStyleData = { [key: string]: unknown }

type FigureStyle = BaseStyleData & {
  title: {
    font: FontStyle
    translate: [string, string]
  }
  background: FillStyle
  margins: [number, number, number, number]
  canvas: {
    stroke: StrokeStyle
    fill: FillStyle
    axis: {
      xLabel: {
        font: FontStyle
        translate: [string, string]
      }
      yLabel: {
        font: FontStyle
        translate: [string, string]
      }
      ticks: {
        font: FontStyle
        spacing: number
      }
      grid: StrokeStyle
      line: StrokeStyle
    }
  }
  logo: {
    src: string
    size: [number, number]
    anchor: [number, number]
    offset: [number, number]
  }
}

type FontStyle = BaseStyleData & {
  fontFamily: string
  fontSize: string
  color: string
  fontWeight: number
  textAnchor: 'start' | 'middle' | 'end'
}

type StrokeStyle = BaseStyleData & {
  width: number
  color: string
}

type FillStyle = BaseStyleData & {
  color: string
}

const defaultFontStyle: FontStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  color: 'black',
  fontWeight: 400,
  textAnchor: 'start'
}

const defaultFigureStyle: FigureStyle = {
  title: {
    font: { ...defaultFontStyle, fontSize: '32px', fontWeight: 400 },
    translate: ['10px', '10px']
  },
  background: { color: 'cyan' },
  margins: [30, 0, 0, 0],

  canvas: {
    stroke: {
      color: '#c7d1d4',
      width: 2
    },
    fill: { color: 'transparent' },
    axis: {
      xLabel: {
        font: {
          ...defaultFontStyle,
          fontSize: '16px',
          textAnchor: 'middle',
          fontWeight: 600
        },
        translate: ['50%', '50px']
      },
      yLabel: {
        font: {
          ...defaultFontStyle,
          fontSize: '16px',
          textAnchor: 'start',
          fontWeight: 600
        },
        translate: ['-55px', '-15px']
      },
      ticks: {
        font: { ...defaultFontStyle, fontSize: '15px' },
        spacing: 5
      },
      grid: {
        color: '#e3efef',
        width: 1
      },
      line: {
        color: '#e3efef',
        width: 1
      }
    }
  },
  logo: {
    src: '/assets/epoch-logo.svg',
    size: [180, 35],
    anchor: [1, 0],
    offset: [-210, 10]
  }
}
export { defaultFigureStyle }
export type { FigureStyle, FontStyle, StrokeStyle, FillStyle }

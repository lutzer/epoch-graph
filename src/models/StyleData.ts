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
      labels: {
        font: FontStyle
      }
      ticks: {
        font: FontStyle
        spacing: number
      }
      grid: StrokeStyle
      line: StrokeStyle
    }
  }
  annotationText: FontStyle
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
  fontWeight: 'normal' | 'bold'
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
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px',
  color: '#171717',
  fontWeight: 'normal',
  textAnchor: 'start'
}

const defaultFigureStyle: FigureStyle = {
  title: {
    font: { ...defaultFontStyle, fontSize: '30px' },
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
      labels: {
        font: { ...defaultFontStyle, fontSize: '20px' }
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
  annotationText: defaultFontStyle,
  logo: {
    src: '/assets/epoch-logo.svg',
    size: [150, 23],
    anchor: [1, 0],
    offset: [-170, 10]
  }
}
export { defaultFigureStyle }
export type { FigureStyle, FontStyle, StrokeStyle, FillStyle }

type vec2 = [number, number]

class vectors {
  static add(v1: vec2, v2: vec2): vec2 {
    return [v1[0] + v2[0], v1[1] + v2[1]]
  }

  static sub(v1: vec2, v2: vec2): vec2 {
    return [v1[0] - v2[0], v1[1] - v2[1]]
  }
}

export { vectors }

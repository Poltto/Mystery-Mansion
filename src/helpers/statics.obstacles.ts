const OBSTACLE_CREATOR_TYPES = {
  Point: 'point',
  Line: 'line',
  Plane: 'plane',
  Polygon: 'polygon'
}

const OBSTACLE_TEXTURES = {
  WOOD_FLOOR_1: '/images/wood_floor_1.png',
  WALL_1: '/images/wall_1.png'
}

module.exports = {
  TEXTURES: OBSTACLE_TEXTURES,
  TYPES: OBSTACLE_CREATOR_TYPES
}

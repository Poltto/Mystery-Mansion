const OBSTACLE_CREATOR_TYPES = {
  Point: 'point',
  Line: 'line',
  Plane: 'plane',
  Polygon: 'polygon'
}

const OBSTACLE_TEXTURES = {
  WOOD_FLOOR_1: '/images/wood_floor_1.png',
  WALL_1: '/images/wall_1.png',
  GRASS_1: '/images/grass_1.png',
  GRASS_2: '/images/grass_2.png',
  GRASS_3: '/images/grass_3.png',
  GRASS_4: '/images/grass_4.png',
  GRASS_5: '/images/grass_5.png',
  GRASS_6: '/images/grass_6.png',
  GRASS_7: '/images/grass_7.png',
  GRASS_8: '/images/grass_8.png',
  GRASS_9: '/images/grass_9.png',
  GRASS_10: '/images/grass_10.png',
  STONE_PATH_1: '/images/stone_path_1.png'
}

module.exports = {
  TEXTURES: OBSTACLE_TEXTURES,
  TYPES: OBSTACLE_CREATOR_TYPES
}

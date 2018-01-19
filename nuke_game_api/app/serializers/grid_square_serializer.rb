class GridSquareSerializer < ActiveModel::Serializer
  attributes :id, :pop, :shot, :land, :country, :x_coord, :y_coord, :has_player
end

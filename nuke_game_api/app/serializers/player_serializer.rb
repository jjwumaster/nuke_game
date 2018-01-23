class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :x_coord, :y_coord, :player_number

  has_many :weapons
end

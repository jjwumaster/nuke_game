class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :x_coord, :y_coord

  has_many :weapons
end

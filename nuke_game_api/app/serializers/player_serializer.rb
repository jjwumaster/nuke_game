class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :x_coord, :y_coord

  has_many :weapons
end

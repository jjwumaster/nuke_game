class WeaponSerializer < ActiveModel::Serializer
  attributes :id, :x_dim, :y_dim, :name, :shots_remaining

  belongs_to :player
end

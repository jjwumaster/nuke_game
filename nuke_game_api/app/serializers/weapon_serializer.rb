class WeaponSerializer < ActiveModel::Serializer
  attributes :id, :x_dim, :y_dim, :name, :description, :shots, :success_rate

  belongs_to :player
end

class WeaponSerializer < ActiveModel::Serializer
  attributes :id, :blast_radius, :name, :description, :shots, :success_rate

  belongs_to :player
end

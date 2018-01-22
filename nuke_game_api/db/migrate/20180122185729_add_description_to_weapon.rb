class AddDescriptionToWeapon < ActiveRecord::Migration[5.1]
  def change
    add_column :weapons, :description, :string
  end
end

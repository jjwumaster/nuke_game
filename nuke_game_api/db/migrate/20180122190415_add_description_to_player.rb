class AddDescriptionToPlayer < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :description, :string
  end
end

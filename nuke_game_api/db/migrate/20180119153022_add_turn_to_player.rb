class AddTurnToPlayer < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :turn, :boolean, :default => false
  end
end

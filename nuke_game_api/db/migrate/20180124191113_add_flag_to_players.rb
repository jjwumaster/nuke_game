class AddFlagToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :flag, :string
  end
end

class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.string :name, :default => nil
      t.integer :x_coord
      t.integer :y_coord
      
      t.timestamps
    end
  end
end

class CreateGridSquares < ActiveRecord::Migration[5.1]
  def change
    create_table :grid_squares do |t|
      t.integer :x_coord
      t.integer :y_coord
      t.integer :pop
      t.boolean :shot
      t.boolean :land
      t.string :country

      t.timestamps
    end
  end
end

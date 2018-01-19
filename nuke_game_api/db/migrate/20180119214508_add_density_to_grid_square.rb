class AddDensityToGridSquare < ActiveRecord::Migration[5.1]
  def change
    add_column :grid_squares, :density, :string
  end
end
